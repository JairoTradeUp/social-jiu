import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, Send } from 'lucide-react'
import Avatar from '../../components/ui/Avatar'
import Badge from '../../components/ui/Badge'
import { mockPosts, mockComments } from '../../data/mockData'

const CommentsScreen = () => {
  const navigate = useNavigate()
  const { postId } = useParams()
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState(mockComments)

  const post = mockPosts.find(p => p.id === postId)

  const handleSendComment = () => {
    if (comment.trim()) {
      setComments([...comments, {
        id: Date.now(),
        userName: 'Você',
        userBelt: 'preta',
        text: comment,
        time: 'agora',
        likes: 0,
      }])
      setComment('')
    }
  }

  if (!post) {
    return null
  }

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'tween', duration: 0.3 }}
      className="fixed inset-0 bg-surface-bg flex flex-col z-50"
    >
      {/* Handle bar */}
      <div className="flex justify-center pt-3 pb-4">
        <div className="w-12 h-1 bg-surface-border rounded-full" />
      </div>

      {/* Header */}
      <div className="px-4 py-4 border-b border-surface-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-text-primary font-semibold">Comentários ({comments.length})</h2>
          <button
            onClick={() => navigate(-1)}
            className="text-text-secondary hover:text-text-primary text-xl"
          >
            ✕
          </button>
        </div>

        {/* Post resumido */}
        <div className="flex gap-3">
          <Avatar name={post.userName} belt={post.userBelt} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-text-primary text-sm font-semibold">{post.userName}</p>
            <p className="text-text-secondary text-xs line-clamp-2">
              {post.content.substring(0, 80)}...
            </p>
          </div>
        </div>
      </div>

      {/* Comentários */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {comments.map((c) => (
          <div key={c.id} className="flex gap-3">
            <Avatar name={c.userName} belt={c.userBelt} size="sm" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-text-primary text-sm font-semibold">{c.userName}</p>
                <Badge belt={c.userBelt} size="sm" />
                <span className="text-text-secondary text-xs">{c.time}</span>
              </div>
              <p className="text-text-primary text-sm mt-1">{c.text}</p>
              <div className="flex items-center gap-4 mt-2">
                <button className="flex items-center gap-1 text-text-secondary hover:text-text-primary transition-colors">
                  <Heart size={14} />
                  <span className="text-xs">{c.likes}</span>
                </button>
                <button className="text-text-secondary hover:text-text-primary text-xs font-medium transition-colors">
                  Responder
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-surface-border p-4 flex items-center gap-3 bg-surface-bg sticky bottom-0">
        <Avatar name="Você" belt="preta" size="sm" />
        <input
          type="text"
          placeholder="Adicionar comentário..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendComment()}
          className="flex-1 bg-surface-card border border-surface-border rounded-3xl px-4 py-2.5 text-text-primary placeholder-text-tertiary focus:outline-none focus:border-brand-red transition-colors text-sm"
        />
        <button
          onClick={handleSendComment}
          disabled={!comment.trim()}
          className="text-brand-red hover:text-brand-red-dark disabled:text-text-tertiary transition-colors"
        >
          <Send size={20} />
        </button>
      </div>
    </motion.div>
  )
}

export default CommentsScreen
