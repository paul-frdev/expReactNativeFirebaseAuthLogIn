
export interface AuthValuesProps {
  email: string;
  password: string;
}

export enum AutoCapitalizeProps {
  NONE = 'none',
  SENTENCES = 'sentences',
  WORDS = 'words',
  CHARACTERS = 'characters',
  UNDEFINED = '',
}

export interface ILogIn {
  token: string;
  isAuthenticated: boolean;
  authenticated?: (token: string) => void;
  logout?: () => void;
}
