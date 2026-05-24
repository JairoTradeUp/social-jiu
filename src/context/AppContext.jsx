import React, { createContext, useReducer, useCallback } from 'react'
import { currentUser, mockPosts, suggestedUsers } from '../data/mockData'

export const AppContext = createContext()

const initialState = {
  currentUser: null,
  isAuthenticated: false,
  onboardingComplete: false,
  posts: mockPosts,
  following: ['3', '5'],
  userDetails: {
    belt: null,
    academy: null,
    professor: null,
    practicingYears: null,
    interests: [],
  },
}

function appReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: true,
      }
    case 'LOGOUT':
      return initialState
    case 'COMPLETE_ONBOARDING':
      return {
        ...state,
        onboardingComplete: true,
        userDetails: action.payload,
      }
    case 'TOGGLE_LIKE': {
      const posts = state.posts.map(post =>
        post.id === action.payload
          ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
          : post
      )
      return { ...state, posts }
    }
    case 'TOGGLE_BOOKMARK': {
      const posts = state.posts.map(post =>
        post.id === action.payload
          ? { ...post, bookmarked: !post.bookmarked }
          : post
      )
      return { ...state, posts }
    }
    case 'TOGGLE_FOLLOW': {
      const following = state.following.includes(action.payload)
        ? state.following.filter(id => id !== action.payload)
        : [...state.following, action.payload]
      return { ...state, following }
    }
    case 'UPDATE_PROFILE':
      return {
        ...state,
        currentUser: { ...state.currentUser, ...action.payload },
      }
    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  const login = useCallback((userData) => {
    dispatch({ type: 'LOGIN', payload: userData })
  }, [])

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' })
  }, [])

  const completeOnboarding = useCallback((details) => {
    dispatch({ type: 'COMPLETE_ONBOARDING', payload: details })
  }, [])

  const toggleLike = useCallback((postId) => {
    dispatch({ type: 'TOGGLE_LIKE', payload: postId })
  }, [])

  const toggleBookmark = useCallback((postId) => {
    dispatch({ type: 'TOGGLE_BOOKMARK', payload: postId })
  }, [])

  const toggleFollow = useCallback((userId) => {
    dispatch({ type: 'TOGGLE_FOLLOW', payload: userId })
  }, [])

  const updateProfile = useCallback((userData) => {
    dispatch({ type: 'UPDATE_PROFILE', payload: userData })
  }, [])

  return (
    <AppContext.Provider
      value={{
        ...state,
        login,
        logout,
        completeOnboarding,
        toggleLike,
        toggleBookmark,
        toggleFollow,
        updateProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = React.useContext(AppContext)
  if (!context) {
    throw new Error('useApp deve ser usado dentro de AppProvider')
  }
  return context
}
