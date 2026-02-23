package com.ufop.investiments.dto;

import com.ufop.investiments.enums.AssetType;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
public class InvestmentResponseDTO {
    private String id;
    private AssetType type;
    private String symbol;
    private Integer quantity;
    private BigDecimal purchasePrice;
    private LocalDate purchaseDate;

    private BigDecimal currentPrice;   // preço de mercado (pode ser null)
    private BigDecimal investedAmount; // quantity * purchasePrice
    private BigDecimal currentValue;   // quantity * currentPrice
    private BigDecimal pnlAmount;      // currentValue - investedAmount
    private BigDecimal pnlPercent;     // (pnlAmount / investedAmount) * 100
}
