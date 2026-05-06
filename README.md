# LeTalk — Enriquecimento de Leads B2B

Aplicação para identificar e enriquecer leads a partir do CNPJ, para transformar dados brutos da Receita Federal via API em informações estratégicas para times de vendas ou consultas para agregar clientes.

---

## Funcionalidades

- Formulário de captura de lead (nome, e-mail, telefone, cargo e CNPJ)
- Validação de CNPJ no front e na API
- Consulta automática à BrasilAPI
- Exibição organizada: razão social, CNAE, porte, endereço, contato e quadro societário
- Histórico de buscas com acesso rápido às consultas anteriores
- Interface responsiva com feedback visual de loading e erros

---

## Tecnologias

Frontend: Next.js 16, Typescript, TailwindCSS, shadcn/ui, React Query(TanStack v5)
Backend: NestJS, Typescript
API CNPJ: BrasilAPI (https://brasilapi.com.br/docs#tag/CNPJ.)
---

## Estrutura do projeto

```
letalk/
├── apps/
│   ├── api/   # NestJS — POST /api/leads
│   └── web/   # Next.js — frontend
└── package.json
```

---

## Pré-requisitos

- Node.js 18+
- npm 9+

---

## Instalação

```bash
git clone https://github.com/PepOliveira/LeTalkChallenge.git
cd letalk
npm install
```

---

## Variáveis de ambiente

### API (`apps/api/.env`)

```env
PORT=3000
FRONTEND_URL=http://localhost:3001
```

### Web (`apps/web/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

Copie os arquivos de exemplo:

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
```

---

## Como rodar localmente

Em dois terminais separados:

```bash
# Terminal 1 — API
npm run dev:api

# Terminal 2 — Frontend
npm run dev:web
```

- Frontend: http://localhost:3001
- API: http://localhost:3000

---

## Endpoint da API

### `POST /api/leads`

Enriquece um lead a partir do CNPJ informado.

**Request body:**
```json
{
  "nome": "João Silva",
  "email": "joao@empresa.com",
  "telefone": "(11) 99999-9999",
  "cargo": "Diretor Comercial",
  "cnpj": "00.000.000/0001-00"
}
```

**Response (200):**
```json
{
  "lead": { "nome": "...", "email": "...", "telefone": "...", "cargo": "..." },
  "empresa": {
    "razao_social": "...",
    "nome_fantasia": "...",
    "cnpj": "...",
    "porte": "...",
    "situacao_cadastral": "...",
    "cnae_principal": { "codigo": "...", "descricao": "..." },
    "endereco": { "logradouro": "...", "cidade": "...", "estado": "..." },
    "contato": { "telefone": "...", "email": "..." },
    "socios": []
  },
  "resumo": "..."
}
```

---

## Como a IA me ajudou

Utilizei **Claude (Anthropic)** de duas formas complementares durante o desenvolvimento:

### Claude Code (Terminal)

- Direcionamento de como eu poderia criar melhor as estruturas de pastas do projeto
- Esqueleto Inicial de Recursos do NestJS para padronizar a comunicação entre os Controllers, Módulos e DTOs
- Revisão de bugs durante a configuração do Next.js com o App Router e shadcn/ui
- Comparação entre o novo FrontEnd depois de atualizado com o do site Oficial LeTalk para fidelidade ao design original e precisão de paleta de cores

**Tempo médio economizado** ~2h em configurações e UI Audit

### Claude Chat (Web)

- Perguntas técnicas sobre Monorepo, Repos Separados, Cache Strategy etc.
- Comparação de Stack (React Query ou useState) para melhor revisão do funcionamento de cache
- Mapeamento CNAE para garantir melhores segmentos do mercado

### Desenvolvimento Manual
Feitos diretamente por mim.
- Lógica de enriquecimento e filtração de dados da BrasilAPI fornecida no Teste Prático
- Mapeamento completo de CNAEs para segmentos
- Classificação direta de porte empresarial
- Processamento e formatação de dados assim que solicitados para a API (endereços, telefones, QSA)
- FrontEnd para Testes integrados com o BackEnd antes do design final do Projeto
- Integração de FrontEnd e BackEnd
- Máscaras de input e validações em tempo real no projeto
- Tratamento de erros de design, lógica e erros diretamente no Console
- Ajustes de UI/UX para o usuário
- Testes manuais e de Responsividade

### Sobre a IA no Projeto
A IA foi fundamental para garantir a redução de tempo em tarefas que podem ser simples mas devem ter muita atenção e revisão.
Foi utilizada como complemento para o FrontEnd buscando a fidelidade e originalidade da LeTalk

---

## Decisões de projeto

**Monorepo com npm workspaces** — mantém API e frontend no mesmo repositório sem overhead de ferramentas complexas como Turborepo ou Nx.

**NestJS na API** — estrutura modular que separa controller, service e types de forma clara, facilitando manutenção e testes.

**Cache em memória na API (1h, máx 500 entradas)** — a BrasilAPI é pública e os dados do CNPJ raramente mudam; o cache evita consultas desnecessárias para o mesmo CNPJ.

**React Query para o fetch** — gerencia estados de loading, erro e cache do lado do cliente sem boilerplate manual.

**shadcn/ui + TailwindCSS** — componentes acessíveis prontos com estilo customizável sem adicionar dependências pesadas.

---

## Tempo gasto

### Terça-feira (15:00 - 02:00)
- Setup (2h): Monorepo, NestJS, Next.js, shadcn/ui, configurações
- Backend(3h): Validação CNPJ, BrasilAPI, enriquecimento de dados, revisão de lógica
- Frontend base para testes(2h): Formulário, máscaras, estados de UI
- Otimizações (1h): Cache in-memory, CORS, .env.example
- Design (3h): Redesing com identidade LeTalk, ajustes de UX, UI Audit com revisão da IA para fidelidade

### Quarta-feira (02:30 - 03:20) 
- React Query (1h): Migração de gerenciamento de estado

### Quarta-feira (08:30 - 14:00)
- Features Extras (1h): Histórico de buscas adicionais
- Deploy (2h): Backend (Railway) + Frontend (Vercel)
- Documentação (2h): README, revisão final

Total: ~17 horas

Observação aos Commits: 
- Commits do primeiro dia foram mais próximos devido ao setup inicial (boilerplate rápido)
- Commits posteriores mais espaçados devido ao desenvolvimento de features mais complexas e ajustes de design
- Commit duplicado feat(api): add CNAE mapper, porte classification, full address and POST /leads endpoint devido a continuação de desenvolvimento de features sem pausa, optei por manter o histórico real de evolução no Git, priorizando a transparência do processo de desenvolvimento em vez de um histórico perfeitamente limpo, mas artificial

---

## O que eu faria com mais tempo


- Testes unitários na API (service de enriquecimento e validações)
- Testes de integração no frontend com Testing Library
- Deploy automatizado via CI/CD
- Paginação e filtros no histórico de buscas
- Exportação dos dados do lead em CSV ou PDF
- Sistema de scoring de leads baseado em dados enriquecidos
- Integração com múltiplas APIs (ReceitaWS, Serasa)
- Dashboard com analytics de buscas

---

## Links

-  **Aplicação:** https://le-talk-challenge-web.vercel.app    
-  **API:** https://api-production-c513e.up.railway.app
-  **Repositório:** https://github.com/PepOliveira/LeTalkChallenge 

---

##  Autor

**Pedro Oliveira**  
Desenvolvedor Full-Stack Junior | Java | Spring Boot | JavaScript | TypeScript | Next.JS | React | Node.js |

-  [LinkedIn]https://www.linkedin.com/in/pedro-oliveira-834812268/
-  [GitHub]https://github.com/PepOliveira
-  peoliveira0101@gmail.com
 
---
