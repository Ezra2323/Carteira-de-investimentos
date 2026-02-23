import { useEffect, useState } from "react";
import { api } from "../api/api";

interface Summary {
  totalInvested: number;
  totalByType: {
    [key: string]: number;
  };
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

  if (!summary) return <p>Carregando resumo...</p>;

    // Dentro do componente InvestmentSummary
    return (
        <div className="fade-in">
            <h2 className="mb-4 fw-light text-white-50 text-center">Resumo da sua Performance</h2>

            <div className="row g-4 mb-5">
                <div className="col-md-6">
                    <div className="glass-panel p-4 h-100 text-center border-bottom border-primary border-4">
                        <p className="text-uppercase small fw-bold opacity-50 mb-2">Patrimônio Alocado</p>
                        <h1 className="display-4 fw-bold">
                            {summary.totalInvested.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </h1>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="glass-panel p-4 h-100 text-center border-bottom border-success border-4">
                        <p className="text-uppercase small fw-bold opacity-50 mb-2">Diversificação</p>
                        <h1 className="display-4 fw-bold">{summary.assetCount} <small className="h4 text-muted">ativos</small></h1>
                    </div>
                </div>
            </div>

            <h4 className="mb-4 text-white-50">Alocação por Categoria</h4>
            <div className="row g-3">
                {Object.entries(summary.totalByType).map(([type, total]) => (
                    <div className="col-md-3" key={type}>
                        <div className="glass-panel p-3 transition-card h-100 d-flex flex-column justify-content-center">
                            <span className="badge bg-primary bg-opacity-25 text-primary mb-2 align-self-start">{type}</span>
                            <h4 className="mb-0 fw-bold">R$ {total.toFixed(2)}</h4>
                            <div className="progress mt-3" style={{height: '6px', background: 'rgba(255,255,255,0.1)'}}>
                                <div className="progress-bar bg-primary" style={{width: `${(total/summary.totalInvested)*100}%`}}></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default InvestmentSummary;
