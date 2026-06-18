import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Heart, Play, Pause } from 'lucide-react'
import Avatar from '../ui/Avatar'
import Badge from '../ui/Badge'
import { beltColors } from '../../data/mockData'
import { useApp } from '../../context/AppContext'
 
// Fallback stories for users who don't have mock data
const getFallbackStories = (userId, userName) => {
  return [
    {
      id: `fallback-${userId}-1`,
      type: 'text',
      background: 'linear-gradient(135deg, #1E3F6F 0%, #1B2A4A 100%)',
      caption: `🥋 "O Jiu-Jitsu é a arte de fazer o impossível se tornar possível com técnica." - Treino diário na mente! 💪 @${userName.toLowerCase().replace(/\s+/g, '')}`,
      time: '5h',
    },
    {
      id: `fallback-${userId}-2`,
      type: 'text',
      background: 'linear-gradient(135deg, #324462 0%, #25334c 100%)',
      caption: `🔥 A persistência supera o talento. Mais um dia de evolução no tatame! 🥋`,
      time: '2h',
    }
  ]
}
 
const StoryViewer = ({ initialUserId, onClose, onStorySeen }) => {
  const { stories: contextStories, storiesContent: contextStoriesContent } = useApp()
  const [activeUserId, setActiveUserId] = useState(initialUserId)
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [replyText, setReplyText] = useState('')
  const [replySent, setReplySent] = useState(false)
  const timerRef = useRef(null)
  const progressStartRef = useRef(Date.now())
  const [progressPercent, setProgressPercent] = useState(0)
  
  // Find current user's story metadata
  const userStoryMeta = contextStories.find(s => s.userId === activeUserId)
  const userName = userStoryMeta?.userName || 'Lutador'
  // Get belt of user. Let's find from suggested users or default
  const belt = activeUserId === '2' ? 'roxa' : activeUserId === '3' ? 'marrom' : activeUserId === '5' ? 'preta' : activeUserId === '4' ? 'azul' : activeUserId === '1' ? 'preta' : 'branca'
 
  // Get active user's stories content
  const stories = contextStoriesContent[activeUserId] || getFallbackStories(activeUserId, userName)
  const currentSlide = stories[activeSlideIndex]
 
  // Track active user index in stories list
  const userIdsWithStories = contextStories.map(s => s.userId)
  const currentUserIndex = userIdsWithStories.indexOf(activeUserId)

  // Mark story as seen
  useEffect(() => {
    if (onStorySeen) {
      onStorySeen(activeUserId)
    }
  }, [activeUserId, onStorySeen])

  // Story Timer effect
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }

    setProgressPercent(0)
    progressStartRef.current = Date.now()

    const intervalTime = 50 // ms per update
    const duration = 5000 // 5 seconds per story
    let elapsed = 0

    timerRef.current = setInterval(() => {
      elapsed += intervalTime
      const pct = Math.min((elapsed / duration) * 100, 100)
      setProgressPercent(pct)

      if (elapsed >= duration) {
        clearInterval(timerRef.current)
        handleNext()
      }
    }, intervalTime)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [activeUserId, activeSlideIndex, isPaused])

  const handleNext = () => {
    if (activeSlideIndex < stories.length - 1) {
      setActiveSlideIndex(prev => prev + 1)
    } else {
      // Go to next user's story
      const nextUserIndex = currentUserIndex + 1
      if (nextUserIndex < userIdsWithStories.length) {
        setActiveUserId(userIdsWithStories[nextUserIndex])
        setActiveSlideIndex(0)
      } else {
        // Last slide of last user -> close viewer
        onClose()
      }
    }
  }

  const handlePrev = () => {
    if (activeSlideIndex > 0) {
      setActiveSlideIndex(prev => prev - 1)
    } else {
      // Go to previous user's story
      const prevUserIndex = currentUserIndex - 1
      if (prevUserIndex >= 0) {
        const prevUserId = userIdsWithStories[prevUserIndex]
        const prevStories = contextStoriesContent[prevUserId] || getFallbackStories(prevUserId, 'Lutador')
        setActiveUserId(prevUserId)
        setActiveSlideIndex(prevStories.length - 1)
      } else {
        // First slide of first user -> restart current slide
        setActiveSlideIndex(0)
      }
    }
  }

  const handleScreenClick = (e) => {
    const screenWidth = window.innerWidth
    const clickX = e.clientX
    
    // If clicking close, input or action buttons, don't trigger slide change
    if (e.target.closest('button') || e.target.closest('input')) {
      return
    }

    if (clickX < screenWidth * 0.3) {
      handlePrev()
    } else {
      handleNext()
    }
  }

  const handleSendReply = (e) => {
    e.preventDefault()
    if (!replyText.trim()) return
    setReplySent(true)
    setReplyText('')
    setTimeout(() => {
      setReplySent(false)
    }, 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 bg-black z-[100] flex flex-col justify-between overflow-hidden select-none select-none max-w-[390px] mx-auto rounded-[40px] shadow-2xl border border-surface-border"
      onClick={handleScreenClick}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      onMouseDown={() => setIsPaused(true)}
      onMouseUp={() => setIsPaused(false)}
    >
      {/* Background (Image or Gradient) */}
      <div className="absolute inset-0 z-0">
        {currentSlide.type === 'image' ? (
          <>
            <img
              src={currentSlide.url}
              alt="Story"
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60" />
          </>
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center p-8 text-center text-xl font-bold leading-relaxed text-white"
            style={{ background: currentSlide.background }}
          >
            <p className="px-4">{currentSlide.caption}</p>
          </div>
        )}
      </div>

      {/* Top Header & Progress Bars */}
      <div className="relative z-10 p-4 pt-6 bg-gradient-to-b from-black/75 to-transparent">
        {/* Progress Bars */}
        <div className="flex gap-1.5 mb-4">
          {stories.map((slide, index) => {
            let width = '0%'
            if (index < activeSlideIndex) width = '100%'
            if (index === activeSlideIndex) width = `${progressPercent}%`

            return (
              <div
                key={slide.id}
                className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden"
              >
                <div
                  className="h-full bg-white transition-all ease-linear"
                  style={{
                    width,
                    transitionDuration: isPaused ? '0s' : '50ms',
                  }}
                />
              </div>
            )
          })}
        </div>

        {/* User Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar name={userName} belt={belt} size="sm" showBeltBorder />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white text-sm font-semibold">{userName}</span>
                <Badge belt={belt} size="sm" />
              </div>
              <span className="text-white/60 text-xs">{currentSlide.time}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="text-white hover:text-brand-red p-2 transition-colors"
            >
              {isPaused ? <Play size={20} /> : <Pause size={20} />}
            </button>
            <button
              onClick={onClose}
              className="text-white hover:text-brand-red p-2 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Center Caption (Only for image stories) */}
      {currentSlide.type === 'image' && (
        <div className="relative z-10 px-6 text-center text-white mb-auto mt-auto pointer-events-none">
          <p className="text-lg font-semibold drop-shadow-md leading-relaxed bg-black/30 p-4 rounded-2xl backdrop-blur-xs">
            {currentSlide.caption}
          </p>
        </div>
      )}

      {/* Reply Section / Bottom Actions */}
      <div className="relative z-10 p-4 pb-6 bg-gradient-to-t from-black/80 to-transparent">
        <form onSubmit={handleSendReply} className="flex items-center gap-3">
          <div className="flex-1 relative flex items-center">
            <input
              type="text"
              placeholder={replySent ? "Mensagem enviada! 🥋" : "Enviar mensagem..."}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              disabled={replySent}
              className={`w-full h-11 bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/20 rounded-[8px] px-4 pr-12 text-white text-sm placeholder-white/50 focus:outline-none transition-all ${
                replySent ? 'border-green-500 text-green-300' : ''
              }`}
            />
            <button
              type="submit"
              className="absolute right-1 w-9 h-9 bg-brand-red hover:bg-brand-red-dark text-white rounded-full flex items-center justify-center transition-colors"
            >
              <Send size={16} />
            </button>
          </div>

          <button
            type="button"
            className="w-11 h-11 bg-white/10 hover:bg-white/15 rounded-full flex items-center justify-center text-white hover:text-brand-red transition-colors"
          >
            <Heart size={20} />
          </button>
        </form>
      </div>
    </motion.div>
  )
}

export default StoryViewer
