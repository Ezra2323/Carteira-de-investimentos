# 📈 Carteira de Investimentos - API + Frontend

Projeto Full Stack desenvolvido como desafio técnico com o objetivo de permitir o gerenciamento de uma carteira de investimentos pessoais, incluindo ações, criptomoedas, fundos e renda fixa.

---

## 🧰 Tecnologias Utilizadas

### Backend
- Java 17
- Spring Boot 3.x
- Spring Data JPA
- PostgreSQL (via Docker)
- Lombok
- Maven

### Frontend
- React 18 + Vite
- TypeScript
- Bootstrap 5

---

## ⚙️ Funcionalidades da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/investments` | Cadastrar um novo ativo |
| `GET` | `/investments` | Listar todos os ativos |
| `GET` | `/investments?type=ACAO` | Filtrar por tipo de ativo |
| `PUT` | `/investments/{id}` | Atualizar informações de um ativo |
| `DELETE` | `/investments/{id}` | Remover um ativo da carteira |
| `PATCH` | `/investments/{id}/market-price` | Atualizar o preço atual de mercado |
| `GET` | `/investments/summary` | Obter resumo da carteira |

---

## 💻 Como Executar o Projeto

### Pré-requisitos
- Java 17+
- Node.js 18+
- Docker e Docker Compose
- Maven

### 📦 Backend (Spring Boot)

```bash
# Clone o projeto
git clone https://github.com/seu-usuario/seu-repo.git
cd backend

# Inicie o PostgreSQL com Docker
docker-compose up -d

# Rode o projeto
./mvnw spring-boot:run
