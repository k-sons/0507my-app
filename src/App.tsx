import { FormEvent, useState } from 'react'
import { LoginForm } from './components/LoginForm'
import { UserProfile } from './components/UserProfile'
import { fakeLogin } from './services/auth'
import type { LoginResult } from './types/user'

function App() {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [user, setUser] = useState<LoginResult | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (!id.trim() || !password.trim()) {
      setError('아이디와 비밀번호를 입력해 주세요.')
      return
    }

    try {
      setLoading(true)
      const loggedInUser = await fakeLogin(id.trim(), password.trim())
      setUser(loggedInUser)
      setPassword('')
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : '로그인 중 오류가 발생했습니다.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    setUser(null)
    setId('')
    setPassword('')
    setError('')
  }

  if (user) {
    return (
      <main>
        <h1>React Login Practice</h1>
        <UserProfile user={user} onLogout={handleLogout} />
      </main>
    )
  }

  return (
    <main>
      <h1>React Login Practice</h1>
      <LoginForm
        id={id}
        password={password}
        loading={loading}
        error={error}
        onIdChange={setId}
        onPasswordChange={setPassword}
        onSubmit={handleSubmit}
      />
    </main>
  )
}

export default App
