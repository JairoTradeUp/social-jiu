import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from 'lucide-react'
import Avatar from '../../components/ui/Avatar'
import Badge from '../../components/ui/Badge'
import { useApp } from '../../context/AppContext'

const PostCard = ({ post }) => {
  const navigate = useNavigate()
  const { toggleLike, toggleBookmark } = useApp()
  const [liked, setLiked] = useState(post.liked)
  const [likes, setLikes] = useState(post.likes)

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
      className="mx-4 mb-4 bg-surface-card border border-surface-border rounded-4xl overflow-hidden"
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
      <div className="px-4">
        <p className="text-text-primary text-sm leading-relaxed mb-3">
          {post.content}
        </p>

        {post.image && (
          <img
            src={post.image}
            alt="Post"
            className="w-full rounded-3xl object-cover aspect-video mb-4"
          />
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
              fill={liked ? '#C0203A' : 'none'}
              color={liked ? '#C0203A' : 'currentColor'}
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

          <button className="text-text-secondary hover:text-text-primary transition-colors">
            <Share2 size={20} />
          </button>
        </div>

        <button
          onClick={() => toggleBookmark(post.id)}
          className="text-text-secondary hover:text-text-primary transition-colors"
        >
          <Bookmark
            size={20}
            fill={post.bookmarked ? '#C0203A' : 'none'}
            color={post.bookmarked ? '#C0203A' : 'currentColor'}
          />
        </button>
      </div>
    </motion.div>
  )
}

export default PostCard
