// src/components/CreateInvestment.tsx
import { useState } from "react";
import { api } from "../api/api";

function CreateInvestment() {
  const [form, setForm] = useState({
    type: "",
    symbol: "",
    quantity: "",
    purchasePrice: "",
    purchaseDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "quantity" || name === "purchasePrice" ? Number(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api("/investments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      alert("Investimento adicionado com sucesso!");
      setForm({ type: "", symbol: "", quantity: 0, purchasePrice: 0, purchaseDate: "" });
    } catch (error) {
      console.error("Erro ao cadastrar investimento", error);
      alert("Erro ao cadastrar investimento.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Adicionar Investimento</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Tipo</label>
          <select name="type" value={form.type} onChange={handleChange} className="form-select" required>
            <option value="">Selecione</option>
            <option value="ACAO">Ação</option>
            <option value="CRIPTO">Cripto</option>
            <option value="FUNDO">Fundo</option>
            <option value="RENDA_FIXA">Renda Fixa</option>
            <option value="OUTRO">Outro</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Símbolo</label>
          <input name="symbol" className="form-control" value={form.symbol} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Quantidade</label>
          <input name="quantity" type="number" className="form-control" value={form.quantity} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Preço de Compra</label>
          <input name="purchasePrice" type="number" step="0.01" className="form-control" value={form.purchasePrice} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Data da Compra</label>
          <input name="purchaseDate" type="date" className="form-control" value={form.purchaseDate} onChange={handleChange} required />
        </div>

        <button type="submit" className="btn btn-primary">Cadastrar</button>
      </form>
    </div>
  );
}

export default CreateInvestment;
