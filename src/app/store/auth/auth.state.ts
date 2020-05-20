export interface AuthState {
    loading: boolean;
  
    isAuthenticated: boolean;
    isTokenExpired: boolean;
  
    expiresIn: string;
    expiresOn: Date;
  
    error: any;
  
  }