// API 서비스 레이어
// 실제 백엔드 연동 시 이 파일의 Mock 데이터를 실제 API 호출로 교체

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

// HTTP 요청 헬퍼
async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<{ data: T | null; error: string | null }> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

// ==================== AUTH API ====================

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  birthdate: string;
  isVulnerable: boolean;
  vulnerableTypes?: string[];
  location: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    isVulnerable: boolean;
    vulnerableTypes?: string[];
    location: string;
    profileImage?: string;
    birthdate?: string;
  };
  token: string;
}

export const authAPI = {
  // 회원가입
  signup: async (data: SignupRequest): Promise<{ data: AuthResponse | null; error: string | null }> => {
    // TODO: 실제 API 호출로 교체
    // return fetchAPI<AuthResponse>("/auth/signup", {
    //   method: "POST",
    //   body: JSON.stringify(data),
    // });

    // Mock 응답
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      data: {
        user: {
          id: `user_${Date.now()}`,
          name: data.name,
          email: data.email,
          phone: data.phone,
          isVulnerable: data.isVulnerable,
          vulnerableTypes: data.vulnerableTypes,
          location: data.location,
          birthdate: data.birthdate,
        },
        token: "mock_token_123",
      },
      error: null,
    };
  },

  // 로그인
  login: async (data: LoginRequest): Promise<{ data: AuthResponse | null; error: string | null }> => {
    // TODO: 실제 API 호출로 교체
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      data: {
        user: {
          id: "user_1",
          name: "김나눔",
          email: data.email,
          isVulnerable: false,
          location: "역삼동",
        },
        token: "mock_token_123",
      },
      error: null,
    };
  },

  // 로그아웃
  logout: async (): Promise<{ data: boolean | null; error: string | null }> => {
    // TODO: 실제 API 호출로 교체
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { data: true, error: null };
  },
};

// ==================== POST API ====================

export interface Post {
  id: string;
  type: "share" | "need";
  title: string;
  description: string;
  location: string;
  time: string;
  status: "available" | "reserved" | "completed";
  category: string;
  author: {
    id: string;
    name: string;
    temperature: number;
  };
  images: string[];
  distance?: number; // km
}

export const postAPI = {
  // 게시물 목록 조회
  getPosts: async (filters?: {
    type?: "share" | "need";
    category?: string;
    status?: string;
    search?: string;
  }): Promise<{ data: Post[] | null; error: string | null }> => {
    // TODO: 실제 API 호출로 교체
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      data: [], // Mock 데이터는 컴포넌트에서 처리
      error: null,
    };
  },

  // 게시물 상세 조회
  getPost: async (id: string): Promise<{ data: Post | null; error: string | null }> => {
    // TODO: 실제 API 호출로 교체
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { data: null, error: null };
  },

  // 게시물 작성
  createPost: async (data: Omit<Post, "id" | "time" | "author">): Promise<{ data: Post | null; error: string | null }> => {
    // TODO: 실제 API 호출로 교체
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { data: null, error: null };
  },

  // AI 유해물품 판단
  checkHarmfulItem: async (data: {
    title: string;
    description: string;
    images: string[];
  }): Promise<{ data: { isHarmful: boolean; reason?: string } | null; error: string | null }> => {
    // TODO: 실제 API 호출로 교체
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return {
      data: { isHarmful: false },
      error: null,
    };
  },
};

// ==================== POLICY API ====================

export interface Policy {
  id: string;
  title: string;
  category: string;
  description: string;
  target: string;
  support: string;
  eligibility?: string[];
  howToApply?: string;
}

export const policyAPI = {
  // AI 추천 정책
  getRecommendedPolicies: async (userProfile: {
    isVulnerable: boolean;
    vulnerableTypes?: string[];
  }): Promise<{ data: Policy[] | null; error: string | null }> => {
    // TODO: 실제 API 호출로 교체
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { data: null, error: null };
  },

  // 카테고리별 정책
  getPoliciesByCategory: async (categories: string[]): Promise<{ data: Policy[] | null; error: string | null }> => {
    // TODO: 실제 API 호출로 교체
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { data: null, error: null };
  },

  // 챗봇 질의
  chatbotQuery: async (message: string, conversationHistory: any[]): Promise<{ data: { response: string; suggestedPolicies?: Policy[] } | null; error: string | null }> => {
    // TODO: 실제 API 호출로 교체
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { data: null, error: null };
  },
};

// ==================== CHAT API ====================

export interface Chat {
  id: string;
  participant: {
    id: string;
    name: string;
    profileImage?: string;
  };
  lastMessage: string;
  time: string;
  unreadCount: number;
}

export interface Message {
  id: string;
  text: string;
  sender: "me" | "other";
  time: string;
  type?: "text" | "image" | "location";
  imageUrl?: string;
  location?: { lat: number; lng: number; address: string };
}

export const chatAPI = {
  // 채팅 목록 조회
  getChats: async (): Promise<{ data: Chat[] | null; error: string | null }> => {
    // TODO: 실제 API 호출로 교체
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { data: null, error: null };
  },

  // 채팅 메시지 조회
  getMessages: async (chatId: string): Promise<{ data: Message[] | null; error: string | null }> => {
    // TODO: 실제 API 호출로 교체
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { data: null, error: null };
  },

  // 메시지 전송
  sendMessage: async (chatId: string, message: Omit<Message, "id" | "time">): Promise<{ data: Message | null; error: string | null }> => {
    // TODO: 실제 API 호출로 교체
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { data: null, error: null };
  },
};

// ==================== USER API ====================

export const userAPI = {
  // 프로필 수정
  updateProfile: async (data: Partial<{
    name: string;
    phone: string;
    bio: string;
    profileImage: string;
  }>): Promise<{ data: any | null; error: string | null }> => {
    // TODO: 실제 API 호출로 교체
    await new Promise((resolve) => setTimeout(resolve, 600));
    return { data: null, error: null };
  },

  // 동네 설정
  updateLocation: async (location: string): Promise<{ data: any | null; error: string | null }> => {
    // TODO: 실제 API 호출로 교체
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { data: null, error: null };
  },

  // 나눔 통계 조회
  getStats: async (): Promise<{ data: any | null; error: string | null }> => {
    // TODO: 실제 API 호출로 교체
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { data: null, error: null };
  },
};

// ==================== SEARCH API ====================

export const searchAPI = {
  // 텍스트 검색
  searchPosts: async (query: string, filters?: any): Promise<{ data: Post[] | null; error: string | null }> => {
    // TODO: 실제 API 호출로 교체
    await new Promise((resolve) => setTimeout(resolve, 600));
    return { data: null, error: null };
  },

  // AI 이미지 검색
  searchByImage: async (imageFile: File): Promise<{ data: Post[] | null; error: string | null }> => {
    // TODO: 실제 API 호출로 교체
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return { data: null, error: null };
  },
};
