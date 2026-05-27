import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Settings, CheckCircle2, Award, Shield, MapPin, Calendar, Users, Trophy } from 'lucide-react'
import StatusBar from '../../components/layout/StatusBar'
import TopBar from '../../components/layout/TopBar'
import BottomNav from '../../components/layout/BottomNav'
import Button from '../../components/ui/Button'
import Avatar from '../../components/ui/Avatar'
import Badge from '../../components/ui/Badge'
import { useApp } from '../../context/AppContext'
import { currentUser as defaultUser, mockPosts } from '../../data/mockData'

const ProfileScreen = () => {
  const navigate = useNavigate()
  const { currentUser: contextUser } = useApp()
  const currentUser = contextUser || defaultUser
  const [activeTab, setActiveTab] = useState('feed')

  const userPosts = mockPosts.slice(0, 4)

  // Custom BJJ Profile Data
  const graduations = [
    { id: 'g1', belt: 'preta', date: 'Outubro / 2022', professor: 'João Chiozzi Jr.', status: 'Homologada CBJJ' },
    { id: 'g2', belt: 'marrom', date: 'Agosto / 2020', professor: 'João Chiozzi Jr.', status: 'Graduado' },
    { id: 'g3', belt: 'roxa', date: 'Maio / 2018', professor: 'Diego Morais', status: 'Graduado' },
    { id: 'g4', belt: 'azul', date: 'Fevereiro / 2016', professor: 'Diego Morais', status: 'Graduado' },
    { id: 'g5', belt: 'branca', date: 'Janeiro / 2014', professor: 'Diego Morais', status: 'Início da Jornada' }
  ]

  const academyDetails = {
    name: 'Alliance SP',
    professor: 'João Chiozzi Jr.',
    focus: 'Jiu-Jitsu Competitivo & Defesa Pessoal',
    address: 'Av. Paulista, 1000 - Bela Vista, São Paulo - SP',
    teammatesCount: '350+ Alunos',
    founded: '2005'
  }

  const eventsParticipated = [
    { id: 'ev1', name: 'Campeonato Mundial IBJJF 2023', place: '🥈 Vice-Campeão (Faixa Preta Adulto)', date: 'Junho / 2023', category: 'Absoluto' },
    { id: 'ev2', name: 'Campeonato Pan-Americano IBJJF 2022', place: '🥇 Campeão Pan-Americano (Faixa Marrom)', date: 'Outubro / 2022', category: 'Peso Leio' },
    { id: 'ev3', name: 'Campeonato Brasileiro CBJJ 2021', place: '🥇 Campeão Brasileiro (Faixa Roxa)', date: 'Maio / 2021', category: 'Peso Leio' },
    { id: 'ev4', name: 'São Paulo Open IBJJF 2019', place: '🥇 Campeão Peso e Absoluto (Faixa Roxa)', date: 'Julho / 2019', category: 'Peso Leio' },
    { id: 'ev5', name: 'Copa Podio Challenge 2018', place: '🥉 3º Lugar (Faixa Azul Absoluto)', date: 'Março / 2018', category: 'Peso Leio' }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'feed':
        return (
          <div className="grid grid-cols-2 gap-3.5 px-4 pb-24">
            {userPosts.map(post => (
              <div key={post.id} className="aspect-square rounded-2xl bg-surface-card border border-surface-border overflow-hidden relative group">
                {post.image ? (
                  <img src={post.image} alt="post" className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-text-secondary bg-white/[0.01]">
                    📄
                  </div>
                )}
              </div>
            ))}
          </div>
        )
      case 'graduations':
        return (
          <div className="px-4 pb-24 space-y-4">
            <div className="space-y-4 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-0.5 before:bg-white/[0.06]">
              {graduations.map((grad, index) => (
                <div key={grad.id} className="flex gap-4 relative">
                  {/* Timeline bullet */}
                  <div className="z-10 w-9 h-9 rounded-xl border border-white/10 bg-surface-card flex items-center justify-center">
                    <Award size={16} className={index === 0 ? 'text-brand-red' : 'text-text-secondary'} />
                  </div>

                  <div className="flex-1 p-4 bg-surface-card border border-surface-border rounded-2xl space-y-2.5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[16px] font-bold text-text-primary capitalize">Faixa {grad.belt}</span>
                        <Badge belt={grad.belt} size="sm" />
                      </div>
                      <span className="text-[14px] text-text-tertiary font-semibold">{grad.date}</span>
                    </div>
                    <p className="text-[15px] text-text-secondary">Professor: <strong className="text-text-primary font-medium">{grad.professor}</strong></p>
                    <span className="inline-block text-[13px] bg-white/5 border border-white/[0.04] text-text-tertiary px-3 py-1 rounded-md font-medium">
                      {grad.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      case 'academy':
        return (
          <div className="px-4 pb-24">
            <div className="p-5 bg-surface-card border border-surface-border rounded-3xl space-y-4 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/5 rounded-bl-full -z-10" />

              <div className="space-y-1">
                <span className="text-[13px] bg-brand-red/10 border border-brand-red/20 text-brand-red rounded-lg px-2.5 py-0.5 font-bold uppercase tracking-wider">
                  QG Oficial
                </span>
                <h3 className="text-[20px] font-extrabold text-text-primary mt-1.5">{academyDetails.name}</h3>
              </div>

              <div className="space-y-4.5 pt-2 text-[15px] text-text-secondary border-t border-white/[0.04]">
                <div className="flex items-center gap-3 py-1">
                  <Shield size={17} className="text-brand-red" />
                  <span>Mestre Principal: <strong className="text-text-primary font-medium">{academyDetails.professor}</strong></span>
                </div>
                <div className="flex items-center gap-3 py-1">
                  <Users size={17} className="text-brand-red" />
                  <span>Teammates: <strong className="text-text-primary font-medium">{academyDetails.teammatesCount}</strong></span>
                </div>
                <div className="flex items-center gap-3 py-1">
                  <Calendar size={17} className="text-brand-red" />
                  <span>Filiado desde: <strong className="text-text-primary font-medium">{academyDetails.founded}</strong></span>
                </div>
                <div className="flex items-start gap-3 py-1">
                  <MapPin size={17} className="text-brand-red shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{academyDetails.address}</span>
                </div>
              </div>

              <div className="p-3.5 bg-white/[0.02] border border-white/[0.04] rounded-2xl text-[14px] text-text-tertiary leading-relaxed">
                <strong>Estilo & Foco:</strong> {academyDetails.focus}
              </div>
            </div>
          </div>
        )
      case 'events':
        return (
          <div className="px-4 pb-24 space-y-3.5">
            {eventsParticipated.map(event => (
              <div key={event.id} className="p-4 bg-surface-card border border-surface-border rounded-2xl space-y-2.5 shadow-sm relative overflow-hidden">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-[16px] font-bold text-text-primary leading-snug">{event.name}</h4>
                    <span className="inline-block text-[13px] text-text-tertiary font-medium mt-0.5">{event.date} • {event.category}</span>
                  </div>
                  <Trophy size={19} className="text-brand-red shrink-0 mt-0.5" />
                </div>

                <div className="p-2.5 bg-brand-red/5 border border-brand-red/10 rounded-xl text-[14px] text-text-secondary font-medium">
                  {event.place}
                </div>
              </div>
            ))}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-100%', opacity: 0 }}
      transition={{ type: 'tween', duration: 0.25 }}
      className="w-full h-screen bg-surface-bg flex flex-col relative overflow-hidden"
    >
      <StatusBar />
      <TopBar
        title="Meu perfil"
        rightAction={
          <button
            onClick={() => navigate('/settings')}
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            <Settings size={24} />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto pb-20 scrollbar-hide">
        {/* Profile Header */}
        <div className="px-4 py-6 border-b border-surface-border bg-surface-bg">
          <div className="flex flex-col items-center mb-6">
            <Avatar name={currentUser.name} belt={currentUser.belt} size="xl" showBeltBorder />
            <Badge belt={currentUser.belt} className="mt-2" size="md" />
          </div>

          <div className="text-center mb-4">
            <div className="flex items-center justify-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-text-primary">{currentUser.name}</h1>
              {currentUser.verified && <CheckCircle2 size={20} color="#C0203A" />}
            </div>
            <p className="text-text-secondary text-sm">@{currentUser.username}</p>
            <p className="text-text-secondary text-sm">
              {currentUser.academy} • {currentUser.city}
            </p>
          </div>

          <p className="text-text-primary text-center text-sm mb-6 leading-relaxed">
            {currentUser.bio}
          </p>

          {/* Stats */}
          <div className="flex justify-around text-center mb-6">
            <button
              onClick={() => setActiveTab('feed')}
              className="flex flex-col items-center hover:opacity-80 transition-opacity"
            >
              <p className="text-text-primary font-bold text-lg">{currentUser.posts}</p>
              <p className="text-text-secondary text-xs">Posts</p>
            </button>
            <button
              onClick={() => navigate('/profile/followers')}
              className="flex flex-col items-center hover:opacity-80 transition-opacity"
            >
              <p className="text-text-primary font-bold text-lg">{currentUser.followers}</p>
              <p className="text-text-secondary text-xs">Seguidores</p>
            </button>
            <button
              onClick={() => navigate('/profile/following')}
              className="flex flex-col items-center hover:opacity-80 transition-opacity"
            >
              <p className="text-text-primary font-bold text-lg">{currentUser.following}</p>
              <p className="text-text-secondary text-xs">Seguindo</p>
            </button>
          </div>

          <Button
            fullWidth
            variant="outline"
            onClick={() => navigate('/profile/edit')}
          >
            Editar perfil
          </Button>
        </div>

        {/* Tabs Dashboard */}
        <div className="flex justify-between gap-1 px-3 py-4 border-b border-surface-border bg-surface-bg sticky top-0 z-30 shrink-0 select-none">
          {[
            { id: 'feed', label: 'Publicações' },
            { id: 'graduations', label: 'Graduações' },
            { id: 'academy', label: 'Academia' },
            { id: 'events', label: 'Eventos' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-2.5 py-1.5 rounded-[6px] text-xs font-semibold transition-all whitespace-nowrap border ${activeTab === tab.id
                ? 'bg-white/[0.08] border-white/[0.05] text-white'
                : 'bg-transparent border-transparent text-text-secondary hover:text-text-primary'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="pt-4 bg-surface-bg">
          {renderTabContent()}
        </div>
      </div>

      <BottomNav />
    </motion.div>
  )
}

export default ProfileScreen

