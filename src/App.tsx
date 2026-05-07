import { FormEvent, useState } from 'react'
import { LoginForm } from './components/LoginForm'
import { UserProfile } from './components/UserProfile'
import { fakeLogin } from './services/auth'
import type { LoginResult } from './types/user'

function App() {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [idError, setIdError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [formError, setFormError] = useState('')
  const [user, setUser] = useState<LoginResult | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormError('')

    const trimmedId = id.trim()
    const trimmedPassword = password.trim()

    let hasError = false

    if (!trimmedId) {
      setIdError('아이디를 입력해 주세요.')
      hasError = true
    } else {
      setIdError('')
    }

    if (!trimmedPassword) {
      setPasswordError('비밀번호를 입력해 주세요.')
      hasError = true
    } else if (trimmedPassword.length < 4) {
      setPasswordError('비밀번호는 4자 이상 입력해 주세요.')
      hasError = true
    } else {
      setPasswordError('')
    }

    if (hasError) {
      return
    }

    try {
      setLoading(true)
      const loggedInUser = await fakeLogin(trimmedId, trimmedPassword)
      setUser(loggedInUser)
      setPassword('')
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : '로그인 중 오류가 발생했습니다.'
      setFormError(message)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    setUser(null)
    setId('')
    setPassword('')
    setIdError('')
    setPasswordError('')
    setFormError('')
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
        idError={idError}
        passwordError={passwordError}
        formError={formError}
        onIdChange={(value) => {
          setId(value)
          if (idError) {
            setIdError('')
          }
        }}
        onPasswordChange={(value) => {
          setPassword(value)
          if (passwordError) {
            setPasswordError('')
          }
        }}
        onSubmit={handleSubmit}
      />
    </main>
  )
}

export default App
