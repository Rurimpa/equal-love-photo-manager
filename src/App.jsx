import { Routes, Route, Link, useLocation } from 'react-router-dom'
import MainPage from './pages/MainPage'
import MissingPage from './pages/MissingPage'
import SettingsPage from './pages/SettingsPage'

function NavBar() {
  const location = useLocation()
  const items = [
    { path: '/', label: 'ホーム', icon: '🏠' },
    { path: '/missing', label: '未所持', icon: '📋' },
    { path: '/settings', label: '設定', icon: '⚙️' },
  ]
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-pink-300 flex shadow-lg">
      {items.map(item => (
        <Link
          key={item.path}
          to={item.path}
          className={`flex-1 flex flex-col items-center py-2 text-xs transition-colors ${
            location.pathname === item.path
              ? 'text-pink-600 font-bold bg-pink-50'
              : 'text-gray-400'
          }`}
        >
          <span className="text-xl">{item.icon}</span>
          {item.label}
        </Link>
      ))}
    </nav>
  )
}

export default function App() {
  return (
    <div className="max-w-lg mx-auto min-h-screen">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/missing" element={<MissingPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
      <NavBar />
    </div>
  )
}
