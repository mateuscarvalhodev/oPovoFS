# O POVO — Frontend (React + Vite)

Aplicação web de blog colaborativo onde usuários podem visualizar posts públicos e, quando autenticados, criar, editar, excluir seus próprios posts.

## Funcionalidades

### Público (sem login)

- Ver lista de posts públicos
- Buscar posts (título/autor/conteúdo)
- Paginação
- Ver detalhes de um post
- Acessar páginas de Login e Cadastro

### Autenticado (com login)

- Criar post
- Editar post (apenas do autor)
- Excluir post (apenas do autor)
- Página **Meus posts** (`/meus-posts`) para gerenciar posts do usuário
- Header com menu do perfil (Dropdown Menu) com:
  - **Meus posts**
  - **Todos os posts**
  - **Sair (logout)**
- Proteções de rota:
  - `/meus-posts` exige autenticação
  - se o usuário estiver logado e tentar acessar `/login` ou `/register`, é redirecionado para `/posts`

## 🧱 Stack / Bibliotecas

- React + Vite + TypeScript
- React Router
- TanStack React Query (cache, refetch, loading states)
- shadcn/ui
- Tailwind CSS
- React Hook Form + Zod
- Lucide Icons

## 🔗 API (Backend)

Este frontend consome uma API local em `http://127.0.0.1:8000/api` [tirei o ignore do .env].

Endpoints utilizados:

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`
- `GET /posts`
- `GET /posts/{id}`
- `POST /posts`
- `PUT /posts/{id}`
- `DELETE /posts/{id}`
- `GET /meus-posts` (rota autenticada)

> Autenticação via **Bearer Token** no header `Authorization: Bearer <token>`.

## ✅ Requisitos

- Node.js
- pnpm

## ▶️ Como rodar o projeto

### 1) Instalar dependências

```bash
pnpm install
```

### 2) Rodar em desenvolvimento

```bash
pnpm dev
```

A aplicação ficará disponível em:

http://localhost:5173

### 3) Build de produção

```bash
pnpm build
```

### 4) Preview do build

```bash
pnpm preview
```

## Rotas principais

/ — Welcome page (sem header)

/posts — Listagem pública de posts

/posts/new — Criar post

/posts/:id — Detalhes do post

/posts/:id/edit — Editar post

/login — Login

/register — Cadastro

/meus-posts — Gerenciar posts do usuário (tem que estar authenticado)

## Notas de UX

Listagens têm paginação e busca com debounce

Loading states usando React Query

Confirmação de exclusão com Alert Dialog

Após criar/editar/excluir, as listagens são atualizadas via invalidate/refetch
