package com.ufop.investiments.controller;

import com.ufop.investiments.dto.InvestmentRequestDTO;
import com.ufop.investiments.dto.InvestmentResponseDTO;
import com.ufop.investiments.dto.MarketPriceUpdateDTO;
import com.ufop.investiments.enums.AssetType;
import com.ufop.investiments.service.InvestmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/investments")
@RequiredArgsConstructor
public class InvestmentController {

    private final InvestmentService service;

    @PostMapping
    public ResponseEntity<InvestmentResponseDTO> create(@RequestBody InvestmentRequestDTO dto) {
        return ResponseEntity.ok(service.save(dto));
    }

    @GetMapping
    public ResponseEntity<List<InvestmentResponseDTO>> findAll(@RequestParam Optional<AssetType> type) {
        return ResponseEntity.ok(service.findAll(type));
    }

    @PutMapping("/{id}")
    public ResponseEntity<InvestmentResponseDTO> update(@PathVariable String id,
                                                        @RequestBody InvestmentRequestDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/summary")
    public ResponseEntity<Map<String, Object>> summary() {
        return ResponseEntity.ok(service.getSummary());
    }

    @PatchMapping("/{id}/market-price")
    public ResponseEntity<InvestmentResponseDTO> updateMarketPrice(@PathVariable String id,
                                                                   @RequestBody MarketPriceUpdateDTO body) {
        return ResponseEntity.ok(service.updateMarketPrice(id, body.getCurrentPrice()));
    }
}
