import { useEffect, useState } from "react";
import { api } from "../api/api";

interface Summary {
    totalInvested: number;
    currentTotalValue: number;
    totalProfitOrLoss: number;
    totalByType: { [key: string]: number; };
    assetCount: number;
}

function InvestmentSummary() {
    const [summary, setSummary] = useState<Summary | null>(null);

    useEffect(() => {
        loadSummary();
    }, []);

    const loadSummary = async () => {
        try {
            const data = await api("/investments/summary");
            setSummary(data);
        } catch (err) {
            console.error("Erro ao carregar resumo", err);
        }
    };

    if (!summary) return <p className="text-white text-center mt-5">Carregando resumo...</p>;

    return (
        <div className="fade-in">
            <h2 className="mb-4 fw-light text-white-50 text-center">Resumo da sua Performance</h2>

            {/* GRID DE CARDS PRINCIPAIS */}
            <div className="row g-4 mb-5">
                {/* 1. Valor de Mercado Atual */}
                <div className="col-md-4">
                    <div className="glass-panel p-4 h-100 text-center border-bottom border-primary border-4 shadow">
                        <p className="text-uppercase small fw-bold opacity-50 mb-2">Valor de Mercado</p>
                        <h1 className="display-6 fw-bold text-info">
                            {summary.currentTotalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </h1>
                    </div>
                </div>

                {/* 2. Resultado Total (Lucro/Prejuízo) */}
                <div className="col-md-4">
                    <div className={`glass-panel p-4 h-100 text-center border-bottom border-4 shadow ${summary.totalProfitOrLoss >= 0 ? 'border-success' : 'border-danger'}`}>
                        <p className="text-uppercase small fw-bold opacity-50 mb-2">Resultado Total (P/L)</p>
                        <h1 className={`display-6 fw-bold ${summary.totalProfitOrLoss >= 0 ? 'text-success' : 'text-danger'}`}>
                            {summary.totalProfitOrLoss >= 0 ? '▲' : '▼'} {Math.abs(summary.totalProfitOrLoss).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </h1>
                    </div>
                </div>

                {/* 3. Diversificação (Quantidade de ativos) */}
                <div className="col-md-4">
                    <div className="glass-panel p-4 h-100 text-center border-bottom border-success border-4 shadow">
                        <p className="text-uppercase small fw-bold opacity-50 mb-2">Diversificação</p>
                        <h1 className="display-6 fw-bold text-white">
                            {summary.assetCount} <small className="h4 text-muted">ativos</small>
                        </h1>
                    </div>
                </div>
            </div>

            <h4 className="mb-4 text-white-50">Alocação por Categoria</h4>
            <div className="row g-3">
                {Object.entries(summary.totalByType).map(([type, total]) => (
                    <div className="col-md-3" key={type}>
                        <div className="glass-panel p-3 transition-card h-100 d-flex flex-column justify-content-center border-0 shadow-sm">
                            <span className="badge bg-primary bg-opacity-25 text-primary mb-2 align-self-start">{type}</span>
                            <h4 className="mb-0 fw-bold">R$ {total.toFixed(2)}</h4>
                            <div className="progress mt-3" style={{height: '6px', background: 'rgba(255,255,255,0.1)'}}>
                                <div
                                    className="progress-bar bg-primary"
                                    style={{width: `${(total / (summary.currentTotalValue || 1)) * 100}%`}}
                                ></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default InvestmentSummary;