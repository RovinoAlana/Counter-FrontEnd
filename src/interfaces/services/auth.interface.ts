export interface ILoginRequest {
  username: string
  password: string
}

export interface ILoginResponse {
  token?: string
  admin: {
    id: number
    username: string
    email: string
    name: string
  }
}

export interface IAdmin {
  id: number
  username: string
  email: string
  name: string
  role: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export interface ICreateAdminRequest {
  username: string
  password: string
  email: string
  name: string
}

export interface IUpdateAdminRequest {
  id?: number
  email?: string
  username?: string
  name?: string
  password?: string
}

export interface IToggleAdminStatusRequest {
  id: number
}

export interface IToggleAdminStatusResponse {
  admin: IAdmin
  newStatus: boolean
}
