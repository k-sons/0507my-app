export type MockUser = {
  id: string
  name: string
  email: string
  password: string
}

export type LoginResult = Pick<MockUser, 'id' | 'name' | 'email'>
