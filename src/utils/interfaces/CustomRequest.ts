export interface customRequest extends Request {
  user: {
    sub: number
    role: string
    refreshToken: string
  }
}