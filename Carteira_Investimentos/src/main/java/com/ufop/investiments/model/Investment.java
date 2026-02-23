package com.ufop.investiments.model;

import com.ufop.investiments.enums.AssetType;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Investment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Enumerated(EnumType.STRING)
    private AssetType type;

    private String symbol;

    private Integer quantity;

    private BigDecimal purchasePrice;

    private LocalDate purchaseDate;

    // 🔹 Valor atual do ativo (para cálculo de lucro/prejuízo)
    private BigDecimal currentPrice;
}
