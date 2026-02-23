import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import InvestmentList from "./components/InvestmentList";
import CreateInvestment from "./components/CreateInvestment";
import InvestmentSummary from "./components/InvestmentSummary";

function App() {
    return (
        <BrowserRouter>
            <div className="container py-5">
                <header className="glass-panel p-3 mb-5 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-2 px-3">
                        <span style={{fontSize: '1.5rem'}}>📈</span>
                        <h1 className="h4 mb-0 fw-bold" style={{letterSpacing: '-1px'}}>
                            INVEST<span className="text-primary">FLOW</span>
                        </h1>
                    </div>

                    <nav className="nav nav-pills gap-2">
                        <Link className="nav-link text-white opacity-75" to="/">Minha Carteira</Link>
                        <Link className="nav-link text-white opacity-75" to="/summary">Dashboard</Link>
                        <Link className="btn btn-primary shadow-sm ms-3" to="/create">+ Adicionar Ativo</Link>
                    </nav>
                </header>

                <main style={{ minHeight: '70vh' }}>
                    <Routes>
                        <Route path="/" element={<InvestmentList />} />
                        <Route path="/create" element={<CreateInvestment />} />
                        <Route path="/summary" element={<InvestmentSummary />} />
                    </Routes>
                </main>

                <footer className="text-center mt-5 opacity-50 small">
                    
                </footer>
            </div>
        </BrowserRouter>
    );
}

export default App;