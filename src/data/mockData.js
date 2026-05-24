export const currentUser = {
  id: '1',
  name: 'Rafael Mendes',
  username: 'rafamendes',
  belt: 'preta',
  academy: 'Gracie Barra SP',
  city: 'São Paulo, SP',
  professor: 'Carlos Gracie Jr.',
  practicingYears: 8,
  bio: 'BJJ é estilo de vida. Professor na GB São Paulo. Competidor ativo.',
  followers: 1240,
  following: 387,
  posts: 94,
  verified: true,
}

export const suggestedUsers = [
  { id: '2', name: 'Ana Paula Silva', username: 'anapaula', belt: 'roxa', academy: 'Alliance SP', city: 'São Paulo, SP', followers: 830, following: false },
  { id: '3', name: 'Bruno Goulart', username: 'brunogoulart', belt: 'marrom', academy: 'Checkmat RJ', city: 'Rio de Janeiro, RJ', followers: 512, following: true },
  { id: '4', name: 'Fernanda Costa', username: 'fecosta', belt: 'azul', academy: 'Gracie Humaitá', city: 'Curitiba, PR', followers: 291, following: false },
  { id: '5', name: 'Diego Morais', username: 'diegomorais', belt: 'preta', academy: 'Nova União', city: 'Belo Horizonte, MG', followers: 2100, following: true },
  { id: '6', name: 'Camila Rocha', username: 'camilarocha', belt: 'azul', academy: 'GF Team', city: 'Florianópolis, SC', followers: 178, following: false },
]

export const mockPosts = [
  {
    id: '1',
    userId: '2',
    userName: 'Ana Paula Silva',
    userBelt: 'roxa',
    userAcademy: 'Alliance SP',
    content: 'Treino pesado hoje na Alliance. Passagem de guarda que trabalhamos semanas finalmente encaixou no sparring. O processo é lento mas constante. 🥋',
    image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=600&q=80',
    likes: 142,
    comments: 18,
    time: '2h',
    liked: false,
    bookmarked: false,
  },
  {
    id: '2',
    userId: '3',
    userName: 'Bruno Goulart',
    userBelt: 'marrom',
    userAcademy: 'Checkmat RJ',
    content: 'Final do Brasileiro amanhã. Cinco anos de preparação para esse momento. Obrigado a todos que treinaram comigo nessa jornada.',
    image: null,
    likes: 389,
    comments: 47,
    time: '5h',
    liked: true,
    bookmarked: true,
  },
  {
    id: '3',
    userId: '5',
    userName: 'Diego Morais',
    userBelt: 'preta',
    userAcademy: 'Nova União',
    content: 'Workshop de leg locks no sábado em BH. Vagas limitadas. DM para inscrição.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
    likes: 521,
    comments: 83,
    time: '1d',
    liked: false,
    bookmarked: false,
  },
  {
    id: '4',
    userId: '4',
    userName: 'Fernanda Costa',
    userBelt: 'azul',
    userAcademy: 'Gracie Humaitá',
    content: 'Primeiro campeonato de gi hoje. Ouro na minha categoria! Resultado de muito treino e apoio da equipe. 🥇',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
    likes: 673,
    comments: 112,
    time: '2d',
    liked: true,
    bookmarked: false,
  },
  {
    id: '5',
    userId: '6',
    userName: 'Camila Rocha',
    userBelt: 'azul',
    userAcademy: 'GF Team',
    content: 'Alguém da comunidade treina em Floripa? Procurando parceiros para treino extra às quartas.',
    image: null,
    likes: 34,
    comments: 29,
    time: '3d',
    liked: false,
    bookmarked: false,
  },
]

export const mockStories = [
  { id: '1', userId: '2', userName: 'Ana Paula', seen: false },
  { id: '2', userId: '3', userName: 'Bruno', seen: true },
  { id: '3', userId: '5', userName: 'Diego', seen: false },
  { id: '4', userId: '4', userName: 'Fernanda', seen: true },
  { id: '5', userId: '6', userName: 'Camila', seen: false },
]

export const mockComments = [
  { id: '1', userName: 'Bruno Goulart', userBelt: 'marrom', text: 'Isso! Consistência é tudo no Jiu.', time: '1h', likes: 8 },
  { id: '2', userName: 'Diego Morais', userBelt: 'preta', text: 'Qual passagem foi? Torreando ou x-pass?', time: '45min', likes: 3 },
  { id: '3', userName: 'Camila Rocha', userBelt: 'azul', text: 'Inspirador! Quero chegar nesse nível.', time: '20min', likes: 5 },
]

export const interests = [
  { id: '1', label: 'Encontrar parceiros de treino', icon: 'users' },
  { id: '2', label: 'Descobrir academias', icon: 'map-pin' },
  { id: '3', label: 'Acompanhar competições', icon: 'trophy' },
  { id: '4', label: 'Aprender técnicas', icon: 'book-open' },
  { id: '5', label: 'Conectar com a comunidade', icon: 'heart' },
  { id: '6', label: 'Eventos e campeonatos', icon: 'calendar' },
]

export const beltColors = {
  branca:  { bg: '#FFFFFF', text: '#0F0F0F' },
  azul:    { bg: '#2B5FAC', text: '#FFFFFF' },
  roxa:    { bg: '#7B3FA0', text: '#FFFFFF' },
  marrom:  { bg: '#7B4A2D', text: '#FFFFFF' },
  preta:   { bg: '#1A1A1A', text: '#FFFFFF', border: '#555555' },
  coral:   { bg: '#C0203A', text: '#FFFFFF' },
}

export const allBelts = [
  { id: 'branca', label: 'Branca' },
  { id: 'azul', label: 'Azul' },
  { id: 'roxa', label: 'Roxa' },
  { id: 'marrom', label: 'Marrom' },
  { id: 'preta', label: 'Preta' },
  { id: 'coral', label: 'Coral' },
]

export const mockAcademies = [
  { id: '1', name: 'Gracie Barra SP', city: 'São Paulo, SP' },
  { id: '2', name: 'Alliance SP', city: 'São Paulo, SP' },
  { id: '3', name: 'Checkmat RJ', city: 'Rio de Janeiro, RJ' },
  { id: '4', name: 'Gracie Humaitá', city: 'Curitiba, PR' },
  { id: '5', name: 'Nova União', city: 'Belo Horizonte, MG' },
  { id: '6', name: 'GF Team', city: 'Florianópolis, SC' },
]

export const mockAchievements = [
  { id: '1', title: '1º lugar Paulistano 2023', date: '2023' },
  { id: '2', title: 'Faixa Preta 2022', date: '2022' },
  { id: '3', title: 'Campeão IBJJF 2021', date: '2021' },
]
