import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  isVulnerable: boolean;
  vulnerableTypes?: string[]; // 취약계층 유형 (다중 선택)
  location: string;
  profileImage?: string;
  birthdate?: string;
  bio?: string;
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  // 회원가입 임시 데이터 (단계별 저장)
  signupData: Partial<User> | null;
  setSignupData: (data: Partial<User> | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [signupData, setSignupData] = useState<Partial<User> | null>(null);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated: !!user,
        signupData,
        setSignupData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}