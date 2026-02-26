# Campaign Dashboard — Setup

## Pré-requisitos
- Python 3.11+
- Node.js 20+
- (Opcional) Docker + Docker Compose

---

## Desenvolvimento local (sem Docker)

### Backend

```bash
cd backend

# Criar e ativar ambiente virtual
python -m venv venv
source venv/bin/activate  # ou venv\Scripts\activate no Windows

# Instalar dependências
pip install -r requirements.txt

# Copiar e editar variáveis de ambiente
cp .env.example .env
# edite o .env com suas credenciais

# Executar migrações
python manage.py makemigrations
python manage.py migrate

# Criar superusuário (admin)
python manage.py createsuperuser

# Iniciar servidor
python manage.py runserver
```

Backend disponível em: http://localhost:8000
Admin: http://localhost:8000/admin

### Frontend

```bash
cd frontend

npm install
npm run dev
```

Frontend disponível em: http://localhost:3000

---

## Com Docker Compose

```bash
# Na raiz do projeto
cp backend/.env.example backend/.env
# edite o backend/.env

docker-compose up --build
```

---

## Configuração das integrações

### Meta Ads
1. Crie um app em https://developers.facebook.com
2. Adicione o produto "Marketing API"
3. Configure `META_APP_ID`, `META_APP_SECRET` e `META_REDIRECT_URI` no `.env`

### LinkedIn Ads
1. Crie um app em https://www.linkedin.com/developers
2. Adicione os escopos: `r_ads`, `r_ads_reporting`, `r_organization_social`
3. Configure `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET` e `LINKEDIN_REDIRECT_URI`

### Google Ads + Sheets
1. Crie um projeto no Google Cloud Console
2. Ative as APIs: Google Ads API, Google Sheets API
3. Crie credenciais OAuth 2.0 (tipo "Web application")
4. Configure `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REDIRECT_URI`
5. Para Google Ads: obtenha um Developer Token em https://ads.google.com/home/tools/manager-accounts/

### Google Sheets como fonte de dados
Formato esperado da planilha (cabeçalho na linha 1):

| platform | name | status | date_from | date_to | spend | impressions | clicks | leads | cpc | cpm | ctr | cpl |
|----------|------|--------|-----------|---------|-------|-------------|--------|-------|-----|-----|-----|-----|
| meta | Campanha Verão | ACTIVE | 2024-01-01 | 2024-01-31 | 5000 | 200000 | 3000 | 150 | 1.67 | 25 | 1.5 | 33.33 |

Plataformas aceitas: `meta`, `linkedin`, `google_ads`

---

## API Endpoints principais

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/auth/token/` | Login (retorna JWT) |
| POST | `/api/auth/register/` | Cadastro |
| GET | `/api/auth/me/` | Dados do usuário |
| GET | `/api/integrations/connections/` | Listar conexões |
| POST | `/api/integrations/connections/manual/` | Criar conexão manual |
| GET | `/api/integrations/meta/auth/` | URL OAuth Meta |
| GET | `/api/integrations/linkedin/auth/` | URL OAuth LinkedIn |
| GET | `/api/integrations/google/auth/` | URL OAuth Google |
| POST | `/api/campaigns/sync/` | Sincronizar campanhas |
| GET | `/api/campaigns/kpis/` | KPIs agregados |
| GET | `/api/campaigns/kpis/by-platform/` | KPIs por plataforma |
| GET | `/api/campaigns/kpis/timeseries/` | Série temporal |
| GET | `/api/campaigns/` | Listar campanhas |
