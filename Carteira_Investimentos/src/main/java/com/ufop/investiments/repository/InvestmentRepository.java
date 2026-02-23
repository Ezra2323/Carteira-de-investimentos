package com.ufop.investiments.repository;

import com.ufop.investiments.model.Investment;
import com.ufop.investiments.enums.AssetType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InvestmentRepository extends JpaRepository<Investment, String> {
    
    // 🔹 Buscar por tipo de ativo
    List<Investment> findByType(AssetType type);
}
