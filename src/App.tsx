import { FormEvent, useReducer } from 'react'
import { LoginForm } from './components/LoginForm'
import { UserProfile } from './components/UserProfile'
import { appReducer, initialState } from './reducers/authFormReducer'
import { fakeLogin } from './services/auth'

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedId = state.id.trim()
    const trimmedPassword = state.password.trim()

    const nextIdError = trimmedId ? '' : '아이디를 입력해 주세요.'
    const nextPasswordError = !trimmedPassword
      ? '비밀번호를 입력해 주세요.'
      : trimmedPassword.length < 4
      ? '비밀번호는 4자 이상 입력해 주세요.'
      : ''

    dispatch({
      type: 'SET_FIELD_ERRORS',
      payload: { idError: nextIdError, passwordError: nextPasswordError },
    })
    dispatch({ type: 'SET_FORM_ERROR', payload: '' })

    if (nextIdError || nextPasswordError) {
      return
    }

    try {
      dispatch({ type: 'LOGIN_START' })
      const loggedInUser = await fakeLogin(trimmedId, trimmedPassword)
      dispatch({ type: 'LOGIN_SUCCESS', payload: loggedInUser })
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : '로그인 중 오류가 발생했습니다.'
      dispatch({ type: 'LOGIN_FAILURE', payload: message })
    }
  }

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  if (state.user) {
    return (
      <main>
        <h1>React Login Practice</h1>
        <UserProfile user={state.user} onLogout={handleLogout} />
      </main>
    )
  }

  return (
    <main>
      <h1>React Login Practice</h1>
      <LoginForm
        id={state.id}
        password={state.password}
        loading={state.loading}
        idError={state.idError}
        passwordError={state.passwordError}
        formError={state.formError}
        onIdChange={(value) => dispatch({ type: 'SET_ID', payload: value })}
        onPasswordChange={(value) => dispatch({ type: 'SET_PASSWORD', payload: value })}
        onSubmit={handleSubmit}
      />
    </main>
  )
}

export default App
