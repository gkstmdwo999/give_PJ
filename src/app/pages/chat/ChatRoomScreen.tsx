import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { 
  ArrowLeft, MoreVertical, Send, User, Plus, Camera as CameraIcon, 
  Image as ImageIcon, MapPin, Calendar, AlertCircle, ThumbsUp, 
  ThumbsDown, Ban, LogOut, Star
} from "lucide-react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";

interface Message {
  id: string;
  sender: "me" | "other";
  text: string;
  time: string;
}

export function ChatRoomScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [plusMenuOpen, setPlusMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
  const [ratingType, setRatingType] = useState<"positive" | "negative" | null>(null);
  const [ratingComment, setRatingComment] = useState("");

  const mockMessages: Message[] = [
    {
      id: "1",
      sender: "other",
      text: "안녕하세요! 나눔 물품에 관심있어서 연락드려요",
      time: "오후 2:30",
    },
    {
      id: "2",
      sender: "me",
      text: "네 안녕하세요! 언제 받으실 수 있나요?",
      time: "오후 2:32",
    },
    {
      id: "3",
      sender: "other",
      text: "오늘 오후 3시에 가능할까요?",
      time: "오후 2:35",
    },
    {
      id: "4",
      sender: "me",
      text: "네, 오늘 오후 3시에 만나요!",
      time: "오후 2:36",
    },
  ];

  const handleSend = () => {
    if (!message.trim()) return;
    // Send message logic
    setMessage("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={() => setProfileDialogOpen(true)}
            className="ml-4 flex items-center hover:bg-gray-50 rounded-lg p-2 transition-colors"
          >
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
              <User className="w-5 h-5 text-gray-500" />
            </div>
            <div>
              <div className="font-semibold">나눔천사</div>
              <div className="text-xs text-gray-500">매너온도 38.5°C</div>
            </div>
          </button>
        </div>
        <Sheet open={moreMenuOpen} onOpenChange={setMoreMenuOpen}>
          <SheetTrigger asChild>
            <button>
              <MoreVertical className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>채팅방 메뉴</SheetTitle>
              <SheetDescription>
                원하는 작업을 선택하세요
              </SheetDescription>
            </SheetHeader>
            <div className="py-6 space-y-2">
              <button 
                onClick={() => {
                  setMoreMenuOpen(false);
                  setRatingDialogOpen(true);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ThumbsUp className="w-5 h-5 text-blue-600" />
                <span>매너 평가하기</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg transition-colors">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span>신고하기</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg transition-colors">
                <Ban className="w-5 h-5 text-gray-600" />
                <span>차단하기</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg transition-colors text-red-600">
                <LogOut className="w-5 h-5" />
                <span>채팅방 나가기</span>
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {mockMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] ${
                msg.sender === "me" ? "bg-blue-600 text-white" : "bg-white"
              } rounded-lg px-4 py-2 shadow-sm`}
            >
              <p>{msg.text}</p>
              <div
                className={`text-xs mt-1 ${
                  msg.sender === "me" ? "text-blue-100" : "text-gray-500"
                }`}
              >
                {msg.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center space-x-2">
          <Sheet open={plusMenuOpen} onOpenChange={setPlusMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Plus className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-auto">
              <SheetHeader>
                <SheetTitle>추가 기능</SheetTitle>
                <SheetDescription>
                  보내고 싶은 내용을 선택하세요
                </SheetDescription>
              </SheetHeader>
              <div className="grid grid-cols-4 gap-4 py-6">
                <button className="flex flex-col items-center gap-2 p-4 hover:bg-gray-100 rounded-lg transition-colors">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <ImageIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-xs">사진</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-4 hover:bg-gray-100 rounded-lg transition-colors">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <CameraIcon className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className="text-xs">카메라</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-4 hover:bg-gray-100 rounded-lg transition-colors">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-xs">위치공유</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-4 hover:bg-gray-100 rounded-lg transition-colors">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-orange-600" />
                  </div>
                  <span className="text-xs">거래약속</span>
                </button>
              </div>
            </SheetContent>
          </Sheet>
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="메시지를 입력하세요"
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            size="icon"
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* 상대방 프로필 다이얼로그 */}
      <Dialog open={profileDialogOpen} onOpenChange={setProfileDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>프로필 정보</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-3">
                <User className="w-10 h-10 text-gray-500" />
              </div>
              <h3 className="text-xl font-bold">나눔천사</h3>
              <p className="text-sm text-gray-500">역삼동</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">매너온도</span>
                <span className="text-sm font-semibold text-green-600">38.5°C</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">나눔 횟수</span>
                <span className="text-sm font-semibold">23회</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">응답률</span>
                <span className="text-sm font-semibold">95%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">가입일</span>
                <span className="text-sm font-semibold">2024.01.15</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold">받은 후기</h4>
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-sm text-gray-700">"친절하시고 물건 상태도 좋았어요. 감사합니다!"</p>
                <p className="text-xs text-gray-500 mt-1">- 1주일 전</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-sm text-gray-700">"시간 약속도 잘 지키시고 좋은 분이셨습니다."</p>
                <p className="text-xs text-gray-500 mt-1">- 2주일 전</p>
              </div>
            </div>
          </div>
          <Button onClick={() => setProfileDialogOpen(false)} className="w-full">
            닫기
          </Button>
        </DialogContent>
      </Dialog>

      {/* 매너 평가 다이얼로그 */}
      <Dialog open={ratingDialogOpen} onOpenChange={setRatingDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>매너 평가하기</DialogTitle>
            <DialogDescription>
              나눔천사님과의 거래는 어떠셨나요?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="flex gap-3">
              <button
                onClick={() => setRatingType("positive")}
                className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                  ratingType === "positive"
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <ThumbsUp
                  className={`w-8 h-8 ${
                    ratingType === "positive" ? "text-green-600" : "text-gray-400"
                  }`}
                />
                <span className="font-semibold">매너있어요</span>
              </button>
              <button
                onClick={() => setRatingType("negative")}
                className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                  ratingType === "negative"
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <ThumbsDown
                  className={`w-8 h-8 ${
                    ratingType === "negative" ? "text-orange-600" : "text-gray-400"
                  }`}
                />
                <span className="font-semibold">아쉬워요</span>
              </button>
            </div>

            {ratingType && (
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {ratingType === "positive"
                    ? "어떤 점이 좋았나요?"
                    : "어떤 점이 아쉬웠나요?"}
                </label>
                <Textarea
                  value={ratingComment}
                  onChange={(e) => setRatingComment(e.target.value)}
                  placeholder="거래 경험을 알려주세요"
                  className="min-h-[100px]"
                />
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setRatingDialogOpen(false);
                setRatingType(null);
                setRatingComment("");
              }}
              className="flex-1"
            >
              취소
            </Button>
            <Button
              onClick={() => {
                alert("평가가 완료되었습니다!");
                setRatingDialogOpen(false);
                setRatingType(null);
                setRatingComment("");
              }}
              disabled={!ratingType}
              className="flex-1"
            >
              평가하기
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}