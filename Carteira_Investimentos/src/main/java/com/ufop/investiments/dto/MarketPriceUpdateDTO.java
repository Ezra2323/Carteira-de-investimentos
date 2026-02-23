package com.ufop.investiments.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class MarketPriceUpdateDTO {
    private BigDecimal currentPrice;
}
