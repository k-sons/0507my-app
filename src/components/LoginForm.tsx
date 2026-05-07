import type { FormEvent } from 'react'

type LoginFormProps = {
  id: string
  password: string
  loading: boolean
  idError: string
  passwordError: string
  formError: string
  onIdChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export function LoginForm({
  id,
  password,
  loading,
  idError,
  passwordError,
  formError,
  onIdChange,
  onPasswordChange,
  onSubmit,
}: LoginFormProps) {
  const isSubmitDisabled = loading || !id.trim() || !password.trim() || !!idError || !!passwordError
  const idMessageId = idError ? 'user-id-error' : 'user-id-help'
  const passwordMessageId = passwordError ? 'user-password-error' : 'user-password-help'

  return (
    <>
      <p id="login-guide">테스트 계정: apple01 / 1234</p>
      <form onSubmit={onSubmit} aria-describedby="login-guide" aria-busy={loading}>
        <fieldset disabled={loading} aria-disabled={loading}>
          <div>
            <label htmlFor="user-id">아이디</label>
            <input
              id="user-id"
              type="text"
              value={id}
              onChange={(event) => onIdChange(event.target.value)}
              autoComplete="username"
              aria-invalid={!!idError}
              aria-describedby={idMessageId}
            />
            {idError ? (
              <p id="user-id-error" role="alert">
                {idError}
              </p>
            ) : (
              <p id="user-id-help">영문/숫자 조합 아이디를 입력해 주세요.</p>
            )}
          </div>
          <div>
            <label htmlFor="user-password">비밀번호</label>
            <input
              id="user-password"
              type="password"
              value={password}
              onChange={(event) => onPasswordChange(event.target.value)}
              autoComplete="current-password"
              aria-invalid={!!passwordError}
              aria-describedby={passwordMessageId}
            />
            {passwordError ? (
              <p id="user-password-error" role="alert">
                {passwordError}
              </p>
            ) : (
              <p id="user-password-help">비밀번호는 4자 이상 입력해 주세요.</p>
            )}
          </div>
          <button type="submit" disabled={isSubmitDisabled} aria-disabled={isSubmitDisabled}>
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </fieldset>
      </form>
      <p role="status" aria-live="polite">
        {loading ? '인증을 확인하고 있습니다...' : ''}
      </p>
      {formError ? (
        <p role="alert" aria-live="assertive">
          {formError}
        </p>
      ) : null}
    </>
  )
}
