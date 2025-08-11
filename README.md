# 🏝️ Travel Itinerary Website

Este projeto é um **site interativo** para exibir um roteiro de viagem de forma visual, dinâmica e responsiva, pensado para uso em **desktop** e **mobile**.

## ✨ Funcionalidades

- **Tema Claro/Escuro** com alternância instantânea.
- **Animações fluidas** com Framer Motion, incluindo efeito *stagger* na entrada dos cards.
- **Timeline animada** para exibir horários e atividades do dia.
- **Galeria de fotos** por ponto turístico, com *swipe* no mobile.
- **Menu fixo com ScrollSpy**, destacando a seção atual conforme a rolagem.
- **Resumo do dia** (distância, tempo, destaques) com microinterações.
- **Botão “Adicionar ao calendário”** (gera arquivo `.ics`) para cada dia do roteiro.

## 🛠️ Tecnologias Utilizadas

- **React** (com Vite para build rápido)
- **Framer Motion** para animações
- **TailwindCSS** para estilização
- **React Scroll** para navegação com ScrollSpy
- **date-fns** para manipulação de datas e horários

## 📂 Estrutura do Projeto

```
vacation-roadmap/
├─ public/
│  ├─ images/                 # fotos reais (capas e pontos)
│  └─ favicon.svg
├─ src/
│  ├─ components/
│  │  ├─ DayCard.jsx
│  │  ├─ Section.jsx
│  │  ├─ Timeline.jsx
│  │  ├─ Gallery.jsx
│  │  ├─ ThemeToggle.jsx
│  │  └─ ResumoDia.jsx
│  ├─ data/
│  │  └─ itinerary.js         # dias, horários, restaurantes, etc.
│  ├─ pages/
│  │  └─ Home.jsx             # herói/intro + seções
│  ├─ styles/
│  │  └─ index.css            # Tailwind + utilitários
│  ├─ App.jsx
│  └─ main.jsx
├─ .gitignore
├─ index.html
├─ package.json
├─ postcss.config.js
├─ tailwind.config.js
└─ vite.config.js
```

## 🚀 Como Rodar Localmente

1. Clone o repositório:

```bash
git clone https://github.com/seuusuario/travel-itinerary.git
cd travel-itinerary
```

2. Instale as dependências:

```bash
npm install
```

3. Rode o servidor local:

```bash
npm run dev
```

4. Acesse no navegador:

```
http://localhost:5173
```

## 🌍 Como Publicar Online

- **Netlify** ou **Vercel** são recomendados.
- Suba o repositório para o GitHub.
- Conecte no painel da plataforma de deploy.
- Escolha o comando de build:

```bash
npm run build
```

- E como pasta de publicação: `dist/`

## 📸 Personalização

- Adicione imagens em `public/images/`.
- Altere o conteúdo do roteiro em `src/data/itinerary.js`.
- Ajuste cores e fontes no `tailwind.config.js`.

## 📄 Licença

Este projeto é de uso pessoal, sem fins comerciais.

---

✈️ **Dica**: Utilize este site como um guia de bolso durante sua viagem — ele é responsivo e otimizado para mobile!

