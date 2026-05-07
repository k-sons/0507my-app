import type { LoginResult } from '../types/user'

type UserProfileProps = {
  user: LoginResult
  onLogout: () => void
}

export function UserProfile({ user, onLogout }: UserProfileProps) {
  return (
    <section aria-label="로그인 사용자 정보">
      <p>
        환영합니다, {user.name} ({user.id})
      </p>
      <p>이메일: {user.email}</p>
      <button type="button" onClick={onLogout}>
        로그아웃
      </button>
    </section>
  )
}
