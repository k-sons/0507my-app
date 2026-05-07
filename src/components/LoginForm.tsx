import type { FormEvent } from 'react'

type LoginFormProps = {
  id: string
  password: string
  loading: boolean
  error: string
  onIdChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export function LoginForm({
  id,
  password,
  loading,
  error,
  onIdChange,
  onPasswordChange,
  onSubmit,
}: LoginFormProps) {
  const isSubmitDisabled = loading || !id.trim() || !password.trim()

  return (
    <>
      <p>테스트 계정: apple01 / 1234</p>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="user-id">아이디</label>
          <input
            id="user-id"
            type="text"
            value={id}
            onChange={(event) => onIdChange(event.target.value)}
            autoComplete="username"
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <input
            id="user-password"
            type="password"
            value={password}
            onChange={(event) => onPasswordChange(event.target.value)}
            autoComplete="current-password"
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={isSubmitDisabled}>
          {loading ? '로그인 중...' : '로그인'}
        </button>
      </form>
      {loading ? <p aria-live="polite">인증을 확인하고 있습니다...</p> : null}
      {error ? <p aria-live="polite">{error}</p> : null}
    </>
  )
}
