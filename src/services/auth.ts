import { mockUsers } from '../mockUsers'
import type { LoginResult } from '../types/user'

export function fakeLogin(id: string, password: string): Promise<LoginResult> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find((item) => item.id === id && item.password === password)

      if (!user) {
        reject(new Error('아이디 또는 비밀번호가 올바르지 않습니다.'))
        return
      }

      resolve({
        id: user.id,
        name: user.name,
        email: user.email,
      })
    }, 800)
  })
}
