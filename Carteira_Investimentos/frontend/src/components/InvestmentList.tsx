import { useEffect, useState } from "react";
import { api } from "../api/api";

interface Investment {
  id: string;
  type: string;
  symbol: string;
  quantity: number;
  purchasePrice: number;
  currentPrice?: number;
  purchaseDate: string;
}

function InvestmentList() {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [typeFilter, setTypeFilter] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newPrice, setNewPrice] = useState("");
  const getBadgeClass = (type: string) => {
      const map: any = { ACAO: "bg-primary", CRIPTO: "bg-warning text-dark", FUNDO: "bg-info", RENDA_FIXA: "bg-success" };
      return `badge rounded-pill ${map[type] || 'bg-secondary'}`;
  };

  useEffect(() => {
    loadInvestments();
  }, [typeFilter]);

  const loadInvestments = async () => {
    try {
      const data = await api(`/investments${typeFilter ? `?type=${typeFilter}` : ""}`);
      setInvestments(data);
    } catch (error) {
      console.error("Erro ao carregar investimentos", error);
    }
  };

  const handleUpdatePrice = async (id: string) => {
    try {
      await api(`/investments/${id}/market-price`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPrice: parseFloat(newPrice) }),
      });

      alert("Preço atualizado com sucesso!");
      setEditingId(null);
      setNewPrice("");
      loadInvestments();
    } catch (err) {
      alert("Erro ao atualizar preço");
      console.error(err);
    }
  };

    return (
        <div className="glass-panel overflow-hidden border-0">
            <div className="p-4 bg-white bg-opacity-10 border-bottom border-white border-opacity-10 d-flex justify-content-between align-items-center">
                <h3 className="h5 mb-0 fw-bold">Ativos na Carteira</h3>
                <select className="form-select form-select-sm w-auto bg-dark text-white border-secondary" onChange={(e) => setTypeFilter(e.target.value)}>
                    <option value="">Filtrar por Tipo</option>
                    {/* opções do enum... */}
                </select>
            </div>

            <div className="table-responsive">
                <table className="table table-dark table-hover mb-0">
                    <thead className="text-muted small text-uppercase">
                    <tr>
                        <th className="px-4 py-3">Ticker / Símbolo</th>
                        <th className="py-3">Tipo</th>
                        <th className="py-3">Qtd</th>
                        <th className="py-3">Preço Médio</th>
                        <th className="py-3">Preço Atual</th>
                        <th className="py-3 text-end px-4">Ações</th>
                    </tr>
                    </thead>
                    <tbody className="border-0">
                    {investments.map((inv) => (
                        <tr key={inv.id} className="align-middle">
                            <td className="px-4 py-3 fw-bold">{inv.symbol}</td>
                            <td><span className={getBadgeClass(inv.type)}>{inv.type}</span></td>
                            <td className="text-white-50">{inv.quantity}</td>
                            <td>R$ {inv.purchasePrice.toFixed(2)}</td>
                            <td className="text-success fw-bold">
                                {inv.currentPrice ? `R$ ${inv.currentPrice.toFixed(2)}` : "---"}
                            </td>
                            <td className="text-end px-4">
                                {/* Lógica de edição original mantida aqui */}
                                <button className="btn btn-sm btn-outline-light border-opacity-25" onClick={() => setEditingId(inv.id)}>
                                    ⚙️
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default InvestmentList;
