import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Play } from 'lucide-react'
import Avatar from '../../components/ui/Avatar'
import Badge from '../../components/ui/Badge'
import ShareSheet from '../../components/feed/ShareSheet'
import { useApp } from '../../context/AppContext'

const PostCard = ({ post }) => {
  const navigate = useNavigate()
  const { toggleLike, toggleBookmark } = useApp()
  const [liked, setLiked] = useState(post.liked)
  const [likes, setLikes] = useState(post.likes)
  const [isShareOpen, setIsShareOpen] = useState(false)

  const handleLike = () => {
    setLiked(!liked)
    setLikes(liked ? likes - 1 : likes + 1)
    toggleLike(post.id)
  }

  const handleComment = () => {
    navigate(`/feed/${post.id}/comments`)
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mx-4 mb-4 bg-surface-card border border-surface-border rounded-xl overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <Avatar name={post.userName} belt={post.userBelt} size="md" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-text-primary font-semibold text-sm">{post.userName}</p>
              <Badge belt={post.userBelt} size="sm" />
            </div>
            <p className="text-text-secondary text-xs">
              {post.userAcademy} · {post.time}
            </p>
          </div>
        </div>
        <button className="text-text-secondary hover:text-text-primary transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Conteúdo */}
      <div className="px-4" style={{ fontSize: '15px', letterSpacing: '0.02em', lineHeight: '1.22' }}>
        {post.category === 'articles' ? (
          <div className="flex flex-col mb-3">
            {/* Tag Destaque do Artigo */}
            <div className="inline-flex items-center gap-1.5 bg-brand-red/10 border border-brand-red/20 text-brand-red px-2.5 py-1 rounded-lg text-[12px] font-bold uppercase tracking-wider w-fit mb-3">
              <span className="w-1.5 h-1.5 bg-brand-red rounded-full animate-pulse" />
              Artigo Técnico
            </div>
 
            {/* Renderização de Conteúdo Estilizado com Parágrafos */}
            <div className="space-y-3">
              {post.content.split('\n\n').map((paragraph, index) => {
                // If it is the first paragraph, make it look like a bold title/lead
                if (index === 0) {
                  return (
                    <h3 key={index} className="text-text-primary font-bold leading-snug" style={{ fontSize: '17px', letterSpacing: '0.02em', lineHeight: '1.22' }}>
                      {paragraph}
                    </h3>
                  )
                }
                // Bullet point lists
                if (paragraph.includes('•')) {
                  return (
                    <ul key={index} className="text-text-secondary space-y-1.5 pl-1 my-1">
                      {paragraph.split('\n').map((bullet, bIndex) => (
                        <li key={bIndex} className="flex items-start gap-2">
                          <span className="text-brand-red mt-1.5 select-none shrink-0 w-1.5 h-1.5 rounded-full bg-brand-red" />
                          <span>{bullet.replace('•', '').trim()}</span>
                        </li>
                      ))}
                    </ul>
                  )
                }
                return (
                  <p key={index} className="text-text-secondary">
                    {paragraph}
                  </p>
                )
              })}
            </div>
          </div>
        ) : (
          <p className="text-text-primary mb-3">
            {post.content}
          </p>
        )}

        {post.image && (
          <div className="relative group cursor-pointer mb-4 overflow-hidden rounded-xl border border-surface-border/50">
            <img
              src={post.image}
              alt="Post"
              className="w-full object-cover aspect-video transition-transform duration-300 group-hover:scale-102"
            />
            {post.category === 'videos' && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[1px]">
                <div className="w-14 h-14 bg-brand-red rounded-full flex items-center justify-center text-white shadow-lg shadow-brand-red/30 transition-transform duration-300 group-hover:scale-110">
                  <Play size={24} fill="currentColor" className="ml-1 text-white" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Ações */}
      <div className="px-4 py-3 border-t border-surface-border flex items-center justify-between">
        <div className="flex items-center gap-4">
          <motion.button
            onClick={handleLike}
            whileScale={{ scale: 1.2 }}
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            <Heart
              size={20}
              fill={liked ? '#42587B' : 'none'}
              color={liked ? '#42587B' : 'currentColor'}
            />
            <span className="text-xs font-medium">{likes}</span>
          </motion.button>

          <button
            onClick={handleComment}
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            <MessageCircle size={20} />
            <span className="text-xs font-medium">{post.comments}</span>
          </button>

          <button
            onClick={() => setIsShareOpen(true)}
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            <Share2 size={20} />
          </button>
        </div>

        <button
          onClick={() => toggleBookmark(post.id)}
          className="text-text-secondary hover:text-text-primary transition-colors"
        >
          <Bookmark
            size={20}
            fill={post.bookmarked ? '#42587B' : 'none'}
            color={post.bookmarked ? '#42587B' : 'currentColor'}
          />
        </button>
      </div>

      <ShareSheet
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        post={post}
      />
    </motion.div>
  )
}

export default PostCard
