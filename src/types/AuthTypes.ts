import { DecodedToken } from './DecodedToken';

export type { DecodedToken }; // Use export type for re-exporting

export interface AuthContextType {
  isAuthenticated: boolean;
  user: DecodedToken | null;
  login: (token: string) => void;
  logout: () => void;
  refreshToken: () => void;
}
