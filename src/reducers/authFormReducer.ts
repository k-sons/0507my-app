import type { LoginResult } from '../types/user'

export type AppState = {
  id: string
  password: string
  loading: boolean
  idError: string
  passwordError: string
  formError: string
  user: LoginResult | null
}

export type AppAction =
  | { type: 'SET_ID'; payload: string }
  | { type: 'SET_PASSWORD'; payload: string }
  | { type: 'SET_FIELD_ERRORS'; payload: { idError: string; passwordError: string } }
  | { type: 'SET_FORM_ERROR'; payload: string }
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: LoginResult }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }

export const initialState: AppState = {
  id: '',
  password: '',
  loading: false,
  idError: '',
  passwordError: '',
  formError: '',
  user: null,
}

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_ID':
      return {
        ...state,
        id: action.payload,
        idError: state.idError ? '' : state.idError,
      }
    case 'SET_PASSWORD':
      return {
        ...state,
        password: action.payload,
        passwordError: state.passwordError ? '' : state.passwordError,
      }
    case 'SET_FIELD_ERRORS':
      return {
        ...state,
        idError: action.payload.idError,
        passwordError: action.payload.passwordError,
      }
    case 'SET_FORM_ERROR':
      return {
        ...state,
        formError: action.payload,
      }
    case 'LOGIN_START':
      return {
        ...state,
        loading: true,
        formError: '',
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        user: action.payload,
        password: '',
        formError: '',
      }
    case 'LOGIN_FAILURE':
      return {
        ...state,
        loading: false,
        formError: action.payload,
      }
    case 'LOGOUT':
      return initialState
    default:
      return state
  }
}
