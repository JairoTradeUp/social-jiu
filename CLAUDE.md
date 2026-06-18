# App Jiu-jitsu — Documentação do Projeto

## Visão Geral
Protótipo de alta fidelidade de uma rede social mobile-first para praticantes de Jiu-Jitsu. Projeto em fase de prototipagem para apresentação a stakeholders. Todos os dados são mockados (sem backend).

## Stack Tecnológica
- **React 18** + **Vite 8**
- **Tailwind CSS v3.4** (importante: v3, NÃO v4)
- **React Router v7**
- **Framer Motion v12** — transições de tela
- **Lucide React** — ícones
- **PostCSS** + **Autoprefixer**

## Como Rodar
```bash
npm install
npm run dev
# Acessa em http://localhost:5173
```

## Configuração Crítica (não alterar)

### Tailwind v3 com PostCSS
O projeto usa **Tailwind CSS v3** via PostCSS. Tentativas anteriores com `@tailwindcss/vite` (v4) falharam — o CSS não era gerado. A configuração atual que funciona:

- `postcss.config.js` — processa o Tailwind via PostCSS
- `src/index.css` — começa com `@tailwind base/components/utilities`
- `vite.config.js` — usa apenas `@vitejs/plugin-react`, sem plugin do Tailwind

### Fonte Red Hat Display
Carregada via `<link>` no `index.html` (NÃO via `@import` no CSS, pois o `@import` é ignorado quando colocado após as diretivas `@tailwind`).

## Design System

### Paleta de Cores
```js
brand: {
  red: '#C0203A',
  'red-dark': '#9A1830',
  blue: '#2B5FAC',
  'blue-dark': '#1E3F6F',
  navy: '#1B2A4A',
}
surface: {
  bg: '#0F0F0F',      // fundo geral
  card: '#1A1A1A',    // cards
  elevated: '#222222',
  border: '#2A2A2A',
  'border-2': '#3A3A3A',
}
text: {
  primary: '#FFFFFF',
  secondary: '#888888',
  tertiary: '#555555',
  inverse: '#0F0F0F',
}
```

### Cores de Belt (Faixa)
```js
branca: { bg: '#FFFFFF', text: '#0F0F0F' }
azul:   { bg: '#2B5FAC', text: '#FFFFFF' }
roxa:   { bg: '#7B3FA0', text: '#FFFFFF' }
marrom: { bg: '#7B4A2D', text: '#FFFFFF' }
preta:  { bg: '#1A1A1A', text: '#FFFFFF' }
coral:  { bg: '#C0203A', text: '#FFFFFF' }
```

### Tipografia
- **Família:** Red Hat Display (400, 500, 600, 700)
- **Aplicada globalmente** via `html, body, #root` no `index.css`

### Componente Button (Full-Width / Primary)
Specs do design system — implementadas com `style` inline:
```
height: 48px
padding: 8px 16px
border-radius: 8px
background: #D9434F
box-shadow: 0 -1.2px 0 0 rgba(0, 0, 0, 0.12) inset
font: Red Hat Display, 700, 16px, letter-spacing 0.2px
```

### Viewport Mobile
```css
#root {
  width: 390px;
  max-width: 100%;
  margin: 0 auto;
}
```

## Estrutura de Pastas
```
src/
├── App.jsx                          # Router + AnimatePresence
├── main.jsx                         # Entry point + AppProvider
├── index.css                        # Tailwind directives + global styles
├── context/
│   └── AppContext.jsx               # Estado global (auth, posts, following)
├── data/
│   └── mockData.js                  # Todos os dados mockados
├── components/
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Avatar.jsx
│   │   ├── Badge.jsx
│   │   └── ProgressBar.jsx
│   └── layout/
│       ├── StatusBar.jsx
│       ├── TopBar.jsx
│       └── BottomNav.jsx
└── modules/
    ├── auth/
    │   ├── SplashScreen.jsx
    │   ├── LoginScreen.jsx
    │   ├── RegisterScreen.jsx
    │   ├── ForgotPasswordScreen.jsx
    │   ├── ForgotPasswordSentScreen.jsx
    │   ├── ResetPasswordScreen.jsx
    │   └── onboarding/
    │       ├── WelcomeScreen.jsx
    │       ├── SelectBeltScreen.jsx
    │       ├── SelectAcademyScreen.jsx
    │       ├── SelectInterestsScreen.jsx
    │       ├── SuggestedUsersScreen.jsx
    │       └── OnboardingCompleteScreen.jsx
    ├── feed/
    │   ├── FeedScreen.jsx
    │   ├── StoriesBar.jsx
    │   ├── PostCard.jsx
    │   └── CommentsScreen.jsx
    └── profile/
        ├── ProfileScreen.jsx
        ├── EditProfileScreen.jsx
        ├── FollowersScreen.jsx
        ├── FollowingScreen.jsx
        └── SettingsScreen.jsx
```

## Rotas (App.jsx)
```
/splash                     → SplashScreen (auto-redirect 2s)
/login                      → LoginScreen
/register                   → RegisterScreen
/forgot-password            → ForgotPasswordScreen
/forgot-password-sent       → ForgotPasswordSentScreen
/reset-password             → ResetPasswordScreen
/onboarding/welcome         → WelcomeScreen (1/5)
/onboarding/belt            → SelectBeltScreen (2/5)
/onboarding/academy         → SelectAcademyScreen (3/5)
/onboarding/interests       → SelectInterestsScreen (4/5)
/onboarding/suggested       → SuggestedUsersScreen (5/5)
/onboarding/complete        → OnboardingCompleteScreen
/feed                       → FeedScreen
/feed/:postId/comments      → CommentsScreen
/profile                    → ProfileScreen
/profile/edit               → EditProfileScreen
/profile/followers          → FollowersScreen
/profile/following          → FollowingScreen
/settings                   → SettingsScreen
```

## Estado Global (AppContext)
Actions disponíveis via `useApp()`:
- `login(user)` — autentica o usuário
- `logout()` — desloga
- `completeOnboarding()` — marca onboarding como concluído
- `toggleLike(postId)` — curtir/descurtir post
- `toggleBookmark(postId)` — salvar/remover post
- `toggleFollow(userId)` — seguir/deixar de seguir
- `updateProfile(data)` — atualizar dados do perfil

## Animações (Framer Motion)
- **Telas principais:** slide horizontal `x: '100%' → 0 → '-100%'`, 0.25s tween
- **CommentsScreen:** slide vertical `y: '100%' → 0`, 0.3s tween
- **AnimatePresence mode="wait"** no App.jsx

## Usuário Mock de Teste
```
Email: rafael@email.com
Senha: qualquer (mínimo 6 caracteres)
```
Login redireciona para `/onboarding/welcome`. Para ir direto ao feed, acessar `/feed` na URL.

## Repositório
```
https://github.com/JairoTradeUp/social-jiu
git clone https://github.com/JairoTradeUp/social-jiu.git
```

## Estado Atual do Desenvolvimento
- ✅ Módulo Auth completo (6 telas)
- ✅ Módulo Onboarding completo (6 telas)
- ✅ Módulo Feed completo (Feed, PostCard, Stories, Comments)
- ✅ Módulo Profile completo (Profile, Edit, Followers, Following, Settings)
- ✅ Design system implementado
- ✅ Tailwind CSS v3 funcionando
- ✅ Fonte Red Hat Display carregada
- 🔄 Button full-width com specs do design system aplicadas
- 🔄 Ajustes visuais em andamento
