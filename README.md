# Portfólio de Enzo Yukio Chinen

Portfólio pessoal desenvolvido com Next.js e publicado como site estático no GitHub Pages. O projeto apresenta uma landing page com apresentação, foto, links sociais, experiências profissionais e alternância de tema claro/escuro.

## Visão geral

- Seção inicial com animação de texto e CTA para navegar pela página.
- Seção “Sobre mim” com apresentação pessoal, foto, bandeira de Okinawa e links para LinkedIn e GitHub.
- Seção “Minhas experiências” com linha do tempo e tópicos resumidos.
- Tema claro/escuro persistido no navegador.
- Layout responsivo, com ajustes para mobile.

## Stack

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [react-icons](https://react-icons.github.io/react-icons/)
- [Cascadia Code](https://github.com/microsoft/cascadia-code) via `@fontsource/cascadia-code`

## Estrutura principal

- [app/page.tsx](app/page.tsx): página principal do portfólio.
- [app/globals.css](app/globals.css): tokens de tema, estilos globais e animações.
- [public/profile.jpg](public/profile.jpg): foto de perfil.
- [public/okinawa-flag.svg](public/okinawa-flag.svg): bandeira usada na seção “Sobre mim”.
- [.github/workflows/deploy.yml](.github/workflows/deploy.yml): pipeline de deploy no GitHub Pages.

## Rodando localmente

```bash
npm install
npm run dev
```

Depois, abra `http://localhost:3000`.

## Build

```bash
npm run build
```

O projeto é exportado estaticamente para a pasta `out`, pronto para publicação.

## Deploy no GitHub Pages

O deploy já está automatizado no workflow em [.github/workflows/deploy.yml](.github/workflows/deploy.yml).

1. Faça push para a branch `main`.
2. O GitHub Actions instala as dependências com `npm ci`.
3. O projeto é compilado com `npm run build`.
4. O conteúdo gerado em `out` é enviado para o GitHub Pages.

Se o repositório estiver configurado como `*.github.io`, o site deve ser servido na raiz do domínio, sem `basePath`.

## Licença

Uso pessoal. Se quiser reutilizar alguma parte, adapte ao seu próprio portfólio.
