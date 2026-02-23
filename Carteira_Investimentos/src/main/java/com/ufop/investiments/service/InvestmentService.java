package com.ufop.investiments.service;

import com.ufop.investiments.dto.InvestmentRequestDTO;
import com.ufop.investiments.dto.InvestmentResponseDTO;
import com.ufop.investiments.enums.AssetType;
import com.ufop.investiments.model.Investment;
import com.ufop.investiments.repository.InvestmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InvestmentService {

    private final InvestmentRepository repository;

    /* ---------- Helpers ---------- */

    private InvestmentResponseDTO mapToResponse(Investment inv) {
        var qty = BigDecimal.valueOf(inv.getQuantity());
        var invested = inv.getPurchasePrice().multiply(qty);

        BigDecimal curPrice = inv.getCurrentPrice();
        BigDecimal current = (curPrice != null) ? curPrice.multiply(qty) : BigDecimal.ZERO;
        BigDecimal pnl = (curPrice != null) ? current.subtract(invested) : BigDecimal.ZERO;
        BigDecimal pnlPct = (curPrice != null && invested.compareTo(BigDecimal.ZERO) > 0)
                ? pnl.multiply(BigDecimal.valueOf(100)).divide(invested, 4, RoundingMode.HALF_UP)
                : BigDecimal.ZERO;

        return InvestmentResponseDTO.builder()
                .id(inv.getId())
                .type(inv.getType())
                .symbol(inv.getSymbol())
                .quantity(inv.getQuantity())
                .purchasePrice(inv.getPurchasePrice())
                .purchaseDate(inv.getPurchaseDate())
                .currentPrice(inv.getCurrentPrice())
                .investedAmount(invested)
                .currentValue(current)
                .pnlAmount(pnl)
                .pnlPercent(pnlPct)
                .build();
    }

    /* ---------- CRUD / Queries ---------- */

    public List<InvestmentResponseDTO> findAll(Optional<AssetType> type) {
        var list = type.map(repository::findByType).orElseGet(repository::findAll);
        return list.stream().map(this::mapToResponse).toList();
    }

    public InvestmentResponseDTO save(InvestmentRequestDTO dto) {
        Investment investment = Investment.builder()
                .type(dto.getType())
                .symbol(dto.getSymbol())
                .quantity(dto.getQuantity())
                .purchasePrice(dto.getPurchasePrice())
                .purchaseDate(dto.getPurchaseDate())
                // currentPrice pode iniciar null (será atualizado via PATCH)
                .build();

        return mapToResponse(repository.save(investment));
    }

    public InvestmentResponseDTO update(String id, InvestmentRequestDTO dto) {
        Investment existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ativo não encontrado"));

        existing.setType(dto.getType());
        existing.setSymbol(dto.getSymbol());
        existing.setQuantity(dto.getQuantity());
        existing.setPurchasePrice(dto.getPurchasePrice());
        existing.setPurchaseDate(dto.getPurchaseDate());

        return mapToResponse(repository.save(existing));
    }

    public void delete(String id) {
        repository.deleteById(id);
    }

    /* ---------- Summary ---------- */

    public Map<String, Object> getSummary() {
        List<Investment> all = repository.findAll();

        BigDecimal totalInvested = all.stream()
                .map(inv -> inv.getPurchasePrice().multiply(BigDecimal.valueOf(inv.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Map<AssetType, BigDecimal> totalByType = all.stream()
                .collect(Collectors.groupingBy(
                        Investment::getType,
                        Collectors.reducing(
                                BigDecimal.ZERO,
                                inv -> inv.getPurchasePrice().multiply(BigDecimal.valueOf(inv.getQuantity())),
                                BigDecimal::add
                        )
                ));

        Map<String, Object> result = new HashMap<>();
        result.put("totalInvested", totalInvested);
        result.put("totalByType", totalByType);
        result.put("assetCount", all.size());
        return result;
    }

    /* ---------- PATCH: Atualizar preço de mercado ---------- */

    public InvestmentResponseDTO updateMarketPrice(String id, BigDecimal currentPrice) {
        Investment inv = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ativo não encontrado"));

        inv.setCurrentPrice(currentPrice);
        return mapToResponse(repository.save(inv));
    }
}
