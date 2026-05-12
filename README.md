## GitHub Pages

Este projeto já está configurado para exportação estática com Next.js, então pode ser publicado no GitHub Pages sem SSR.

### Como publicar

1. No repositório `yukiochinen.github.io`, vá em Settings > Pages.
2. Em Build and deployment, selecione GitHub Actions como fonte.
3. Faça o push do projeto para a branch `main`.
4. A cada push na `main`, o workflow em [.github/workflows/deploy.yml](.github/workflows/deploy.yml) gera a pasta `out` e publica automaticamente na raiz do domínio.

### Observações

- Como esse é um usuário/site de organização do tipo `*.github.io`, o site deve ser servido na raiz, então não use `basePath`.
- O avatar em [app/page.tsx](app/page.tsx) usa caminho absoluto na raiz.

### Desenvolvimento

```bash
npm install
npm run dev
```

Abra http://localhost:3000 para ver o projeto localmente.
