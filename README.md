# Auto Lib

Aplicacao web para montar sua stack rapidamente. Selecione tecnologias por categoria, defina o gerenciador de pacotes e gere comandos de instalacao em poucos cliques.

## Funcionalidades
- Selecao guiada de tecnologias por categoria
- Gera comandos de instalacao com base no gerenciador de pacotes escolhido
- Campo para nome do projeto com preview de comandos
- Resumo das escolhas na lateral

## Stack
- Next.js 16 (App Router)
- React 19
- TypeScript
- MUI (Material UI)
- Emotion

## Requisitos
- Node.js 18+ (recomendado)
- API configurada via `NEXT_PUBLIC_URL_API_BASE`

## Configuracao
Crie um arquivo `.env` na raiz com:
```
NEXT_PUBLIC_URL_API_BASE="https://autolib-api.onrender.com"
```

## Como rodar
```bash
npm install
npm run dev
```

Acesse:
- `http://localhost:3000/auto-lib`

## Scripts
- `npm run dev` - ambiente de desenvolvimento
- `npm run build` - build de producao
- `npm run start` - iniciar build
- `npm run lint` - lint

## Estrutura principal
- `src/app/auto-lib` - pagina principal
- `src/features/stack-config` - selecao de stack e estado
- `src/features/last-steps` - sidebar com comandos e resumo
- `src/shared` - componentes e tipos compartilhados
