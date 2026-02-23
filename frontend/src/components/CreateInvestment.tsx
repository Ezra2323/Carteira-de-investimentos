import { useState } from "react";
import { api } from "../api/api";

function CreateInvestment() {
    const [form, setForm] = useState({
        type: "",
        symbol: "",
        quantity: "", // Mantido como string para evitar o "0" fixo
        purchasePrice: "",
        purchaseDate: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        // CORREÇÃO: Remova o Number(value) daqui para o TypeScript não reclamar
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api("/investments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                // CORREÇÃO: Converta para número apenas no momento do envio
                body: JSON.stringify({
                    ...form,
                    quantity: Number(form.quantity),
                    purchasePrice: Number(form.purchasePrice)
                }),
            });

            alert("Investimento adicionado com sucesso!");
            // CORREÇÃO: Resetar com "" em vez de 0
            setForm({ type: "", symbol: "", quantity: "", purchasePrice: "", purchaseDate: "" });
        } catch (error) {
            console.error("Erro ao cadastrar investimento", error);
            alert("Erro ao cadastrar investimento.");
        }
    };

    return (
        <div className="glass-panel p-5 mt-4 shadow-lg animate-fade-in">
            <h2 className="text-white fw-bold mb-4">Adicionar Novo Ativo</h2>
            <form onSubmit={handleSubmit} className="row g-4">

                <div className="col-md-6">
                    <label className="form-label text-white-50 small fw-bold">TIPO</label>
                    <select name="type" value={form.type} onChange={handleChange} className="form-select bg-dark text-white border-secondary rounded-3" required>
                        <option value="">Selecione</option>
                        <option value="ACAO">Ação</option>
                        <option value="CRIPTO">Cripto</option>
                        <option value="FUNDO">Fundo</option>
                        <option value="RENDA_FIXA">Renda Fixa</option>
                        <option value="OUTRO">Outro</option>
                    </select>
                </div>

                <div className="col-md-6">
                    <label className="form-label text-white-50 small fw-bold">SÍMBOLO</label>
                    <input name="symbol" placeholder="Ex: PETR4" className="form-control bg-dark text-white border-secondary rounded-3" value={form.symbol} onChange={handleChange} required />
                </div>

                <div className="col-md-4">
                    <label className="form-label text-white-50 small fw-bold">QUANTIDADE</label>
                    <input name="quantity" type="number" placeholder="Digite a qtd" className="form-control bg-dark text-white border-secondary rounded-3" value={form.quantity} onChange={handleChange} required />
                </div>

                <div className="col-md-4">
                    <label className="form-label text-white-50 small fw-bold">PREÇO DE COMPRA (R$)</label>
                    <input name="purchasePrice" type="number" step="0.01" placeholder="0,00" className="form-control bg-dark text-white border-secondary rounded-3" value={form.purchasePrice} onChange={handleChange} required />
                </div>

                <div className="col-md-4">
                    <label className="form-label text-white-50 small fw-bold">DATA DA COMPRA</label>
                    <input name="purchaseDate" type="date" className="form-control bg-dark text-white border-secondary rounded-3" value={form.purchaseDate} onChange={handleChange} required />
                </div>

                <div className="col-12 mt-4">
                    <button type="submit" className="btn btn-primary w-100 py-3 fw-bold rounded-pill transition-card">
                        CADASTRAR ATIVO NA CARTEIRA
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateInvestment;