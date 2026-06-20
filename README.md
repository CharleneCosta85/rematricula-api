# 🏫 API de Rematrícula Escolar

Este projeto é uma API RESTful desenvolvida com **NestJS**, **TypeORM** e **PostgreSQL** para simular e gerenciar o processo de rematrícula de alunos. A aplicação conta com autenticação segura (JWT e Google OAuth2), validação rigorosa de dados de entrada e uma camada de regras de negócio para verificar dependências acadêmicas (pré-requisitos) antes de efetuar a matrícula.

---

## 🛠️ Tecnologias Utilizadas

* **Framework:** NestJS (TypeScript)
* **Banco de Dados:** PostgreSQL
* **ORM:** TypeORM
* **Autenticação:** JWT (JSON Web Tokens) & Google OAuth2 (SSO)
* **Documentação:** Swagger UI
* **Validação:** `class-validator` & `class-transformer`

---

## 🏗️ Modelagem de Dados (Entidades)

O banco de dados foi modelado para refletir a estrutura acadêmica real, contendo as seguintes tabelas relacionais:

* **Curso:** `id`, `nome`, `sigla`.
* **Aluno:** `id`, `nome`, `matricula`, `email`, `senha`, `cursoId` (FK).
* **Disciplina:** `id`, `codigo`, `nome`, `cargaHoraria`, `cursoId` (FK).
* **PreRequisito:** `id`, `disciplinaId` (FK), `disciplinaRequisitoId` (FK).
* **Turma:** `id`, `professor`, `horario`, `periodoLetivo`, `disciplinaId` (FK).
* **Matricula:** `id`, `situacao` (`ATIVA`/`CONCLUIDA`), `dataMatricula`, `alunoId` (FK), `turmaId` (FK).

---

## 🚀 Como Executar o Projeto

### 1. Clonar o Repositório
```bash
git clone https://github.com/CharleneCosta85/rematricula-api.git
cd rematricula-api
2. Instalar as Dependências
Bash
npm install
3. Configurar as Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto (copiando as chaves do .env.example) e preencha com as suas credenciais locais do banco e chaves de autenticação:

Snippet de código
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=sua_senha
DB_DATABASE=rematricula
JWT_SECRET=seu_segredo_jwt
GOOGLE_CLIENT_ID=seu_client_id
GOOGLE_CLIENT_SECRET=seu_client_secret
4. Executar a Aplicação
O TypeORM está configurado com synchronize: true, o que significa que todas as tabelas serão geradas automaticamente no banco assim que o servidor inicializar.

Bash
npm run start:dev
A API estará disponível em: http://localhost:3001

📖 Documentação da API (Swagger)
A API está totalmente documentada e pode ser testada visualmente através da interface do Swagger. Com o servidor rodando, acesse:

👉 http://localhost:3001/api (ou a rota padrão configurada em seu main.ts)

Principais Endpoints Disponíveis:
Autenticação (/auth): POST /auth/login (Autenticação interna) | GET /auth/google (SSO Google)

Alunos (/aluno): CRUD completo de estudantes.

Cursos (/curso): CRUD completo de cursos organizacionais.

Disciplinas (/disciplina): CRUD completo de matérias.

Pré-requisitos (/prerequisito): Gerenciamento de dependências entre disciplinas.

Turmas (/turma): Abertura de turmas e listagem por período letivo (GET /turma/periodo/:periodo).

Matrículas (/matricula): Realização de inscrições (POST /matricula) com travas automáticas de pré-requisitos e histórico de disciplinas cursadas.

🧠 Regras de Negócio Implementadas
Validação de Existência: O sistema impede operações com IDs de alunos ou turmas inexistentes (Retorna 404 Not Found).

Trava de Pré-requisito: Um aluno não pode se matricular em uma turma cuja disciplina exija um pré-requisito que ele ainda não tenha concluído (Retorna 400 Bad Request). O sistema analisa dinamicamente o histórico de matrículas com situação CONCLUIDA.

Proteção de Rotas: Endpoints sensíveis de escrita e leitura exigem o cabeçalho Authorization: Bearer <TOKEN_JWT>.