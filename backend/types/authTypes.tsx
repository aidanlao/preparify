import { TProjectProgress } from "./dataTypes";

export type TLoginDetails = {
  email: string;
  password: string;
  redirectTo: string;
};

// Define the type for the context
export type AuthContextType = {
  user: any;
  isLoading: boolean;
  error: Error | undefined;
  refetchUser: () => void;
};
