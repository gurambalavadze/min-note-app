export interface User {
  id: string;
  email: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  access_token: string;
}
