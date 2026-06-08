[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=000000)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-5-443E38)](https://zustand-demo.pmnd.rs/)

# Introdução
Este repositório contém o frontend da aplicação **Hero Factory**, uma API REST para cadastro e gerenciamento de heróis.

A aplicação permite criar, listar, buscar, visualizar, editar, ativar, desativar e excluir heróis.

Contato: <a href="https://www.linkedin.com/in/giovani-appezzato" target="_blank">LinkedIn</a> - giovani.appezzato@gmail.com

## Tecnologias
- Next.js 16
- TypeScript
- Tailwind CSS
- Shadcn/ui
- Zustand
- React Hook Form
- Yup

## Antes de instalar

Certifique-se de que o Node.js esteja instalado em sua máquina.

Por padrão, a aplicação frontend utiliza a porta: `3000`

## Guia de instalação

### Clone o repositório
```bash
git clone https://github.com/GiovaniAppezzato/heroes-factory-frontend
cd heroes-factory-frontend
```

### Instale as dependências
```bash
npm install
```

### Copie o arquivo de ambiente
```bash
cp .env.example .env
```

### Configure a URL da API
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

### Execute a aplicação
```bash
npm run dev
```
Tudo pronto. O frontend estará disponível em:
```txt
http://localhost:3000
```
Caso essa porta esteja ocupada, consulte o terminal para verificar qual porta foi atribuída pelo Next.js.

<div align="center">
  Feito com ♡ por <a href="https://www.linkedin.com/in/giovani-appezzato">Giovani Appezzato</a><br>
    <b>Por favor, mantenha o código limpo e organizado. Obrigado!</b>
</div>