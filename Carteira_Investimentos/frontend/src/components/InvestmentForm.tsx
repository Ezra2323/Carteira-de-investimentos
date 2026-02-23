import { useState } from "react";
import { api } from "../api/api";

function InvestmentForm({ onCreated }: { onCreated: () => void }) {
  const [form, setForm] = useState({
    type: "ACAO",
    symbol: "",
    quantity: "",
    purchasePrice: "",
    purchaseDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api("/investments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          quantity: parseInt(form.quantity),
          purchasePrice: parseFloat(form.purchasePrice),
        }),
      });

      alert("Investimento cadastrado com sucesso!");
      setForm({
        type: "ACAO",
        symbol: "",
        quantity: "",
        purchasePrice: "",
        purchaseDate: "",
      });
      onCreated();
    } catch (err) {
      alert("Erro ao cadastrar investimento");
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <h4>Adicionar Novo Investimento</h4>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-3">
          <label className="form-label">Tipo</label>
          <select className="form-select" name="type" value={form.type} onChange={handleChange}>
            <option value="ACAO">Ação</option>
            <option value="CRIPTO">Cripto</option>
            <option value="FUNDO">Fundo</option>
            <option value="RENDA_FIXA">Renda Fixa</option>
            <option value="OUTRO">Outro</option>
          </select>
        </div>

        <div className="col-md-3">
          <label className="form-label">Ativo (símbolo)</label>
          <input type="text" className="form-control" name="symbol" value={form.symbol} onChange={handleChange} required />
        </div>

        <div className="col-md-2">
          <label className="form-label">Quantidade</label>
          <input type="number" className="form-control" name="quantity" value={form.quantity} onChange={handleChange} required />
        </div>

        <div className="col-md-2">
          <label className="form-label">Preço de Compra</label>
          <input type="number" step="0.01" className="form-control" name="purchasePrice" value={form.purchasePrice} onChange={handleChange} required />
        </div>

        <div className="col-md-2">
          <label className="form-label">Data da Compra</label>
          <input type="date" className="form-control" name="purchaseDate" value={form.purchaseDate} onChange={handleChange} required />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-success">Salvar</button>
        </div>
      </form>
    </div>
  );
}

export default InvestmentForm;
