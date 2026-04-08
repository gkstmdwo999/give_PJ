import { useNavigate } from "react-router";
import { User, Clock } from "lucide-react";
import { BottomNav } from "@/app/components/BottomNav";

interface ChatRoom {
  id: string;
  user: string;
  lastMessage: string;
  time: string;
  unread: number;
}

export function ChatListScreen() {
  const navigate = useNavigate();

  const mockChats: ChatRoom[] = [
    {
      id: "1",
      user: "나눔천사",
      lastMessage: "네, 오늘 오후 3시에 만나요!",
      time: "10분 전",
      unread: 2,
    },
    {
      id: "2",
      user: "따뜻한마음",
      lastMessage: "물품 상태가 어떤가요?",
      time: "1시간 전",
      unread: 0,
    },
    {
      id: "3",
      user: "도움이웃",
      lastMessage: "감사합니다~",
      time: "3시간 전",
      unread: 0,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3">
        <h1 className="text-lg font-semibold">채팅</h1>
      </div>

      <div className="divide-y divide-gray-200">
        {mockChats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => navigate(`/chat/${chat.id}`)}
            className="bg-white px-4 py-4 cursor-pointer hover:bg-gray-50"
          >
            <div className="flex items-start">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                <User className="w-6 h-6 text-gray-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold">{chat.user}</span>
                  <span className="text-xs text-gray-500 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {chat.time}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                  {chat.unread > 0 && (
                    <span className="ml-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}