import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import SplashScreen from './modules/auth/SplashScreen'
import LoginScreen from './modules/auth/LoginScreen'
import RegisterScreen from './modules/auth/RegisterScreen'
import ForgotPasswordScreen from './modules/auth/ForgotPasswordScreen'
import ForgotPasswordSentScreen from './modules/auth/ForgotPasswordSentScreen'
import ResetPasswordScreen from './modules/auth/ResetPasswordScreen'

import WelcomeScreen from './modules/auth/onboarding/WelcomeScreen'
import SelectBeltScreen from './modules/auth/onboarding/SelectBeltScreen'
import SelectAcademyScreen from './modules/auth/onboarding/SelectAcademyScreen'
import SelectInterestsScreen from './modules/auth/onboarding/SelectInterestsScreen'
import SuggestedUsersScreen from './modules/auth/onboarding/SuggestedUsersScreen'
import OnboardingCompleteScreen from './modules/auth/onboarding/OnboardingCompleteScreen'

import FeedScreen from './modules/feed/FeedScreen'
import CommentsScreen from './modules/feed/CommentsScreen'

import ExploreScreen from './modules/explore/ExploreScreen'
import MarketplaceScreen from './modules/explore/MarketplaceScreen'

import ConnectionsScreen from './modules/connections/ConnectionsScreen'

import CirclesScreen from './modules/circles/CirclesScreen'

import MessagesScreen from './modules/messages/MessagesScreen'
import ChatScreen from './modules/messages/ChatScreen'

import NotificationsScreen from './modules/notifications/NotificationsScreen'

import ProfileScreen from './modules/profile/ProfileScreen'
import EditProfileScreen from './modules/profile/EditProfileScreen'
import FollowersScreen from './modules/profile/FollowersScreen'
import FollowingScreen from './modules/profile/FollowingScreen'
import SettingsScreen from './modules/profile/SettingsScreen'

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/splash" element={<SplashScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
          <Route path="/forgot-password-sent" element={<ForgotPasswordSentScreen />} />
          <Route path="/reset-password" element={<ResetPasswordScreen />} />

          <Route path="/onboarding/welcome" element={<WelcomeScreen />} />
          <Route path="/onboarding/belt" element={<SelectBeltScreen />} />
          <Route path="/onboarding/academy" element={<SelectAcademyScreen />} />
          <Route path="/onboarding/interests" element={<SelectInterestsScreen />} />
          <Route path="/onboarding/suggested" element={<SuggestedUsersScreen />} />
          <Route path="/onboarding/complete" element={<OnboardingCompleteScreen />} />

          <Route path="/feed" element={<FeedScreen />} />
          <Route path="/feed/:postId/comments" element={<CommentsScreen />} />
          <Route path="/messages" element={<MessagesScreen />} />
          <Route path="/messages/:chatId" element={<ChatScreen />} />
          <Route path="/notifications" element={<NotificationsScreen />} />
          <Route path="/explore" element={<ExploreScreen />} />
          <Route path="/marketplace" element={<MarketplaceScreen />} />
          <Route path="/connections" element={<ConnectionsScreen />} />
          <Route path="/circles" element={<CirclesScreen />} />

          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/profile/edit" element={<EditProfileScreen />} />
          <Route path="/profile/followers" element={<FollowersScreen />} />
          <Route path="/profile/following" element={<FollowingScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />

          <Route path="*" element={<Navigate to="/splash" replace />} />
        </Routes>
      </AnimatePresence>
    </Router>
  )
}

export default App
