import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { ArrowLeft, MapPin, Search } from "lucide-react";
import { useApp } from "@/app/context/AppContext";

export function LocationSettingScreen() {
  const navigate = useNavigate();
  const { signupData, setUser, setSignupData } = useApp();
  const [location, setLocation] = useState("");
  const [searchResults] = useState([
    "서울특별시 강남구 역삼동",
    "서울특별시 강남구 삼성동",
    "서울특별시 서초구 서초동",
    "서울특별시 강남구 논현동",
    "서울특별시 송파구 잠실동",
  ]);

  const filteredResults = location
    ? searchResults.filter((result) =>
        result.toLowerCase().includes(location.toLowerCase())
      )
    : searchResults;

  const handleComplete = (selectedLocation: string) => {
    // 회원가입 완료 - 전역 상태에 사용자 정보 저장
    const newUser = {
      id: `user_${Date.now()}`,
      name: signupData?.name || "사용자",
      email: signupData?.email || "",
      phone: signupData?.phone,
      isVulnerable: signupData?.isVulnerable || false,
      vulnerableTypes: signupData?.vulnerableTypes,
      location: selectedLocation,
      birthdate: signupData?.birthdate,
    };

    setUser(newUser);
    setSignupData(null); // 회원가입 임시 데이터 초기화
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="ml-4 text-lg font-semibold">내 동네 설정</h1>
      </div>

      <div className="px-6 py-8">
        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            우리 동네를 설정하고 이웃과 나눔을 시작하세요
          </p>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="동네 이름을 검색하세요 (예: 역삼동)"
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          {filteredResults.length > 0 ? (
            filteredResults.map((result, index) => (
              <button
                key={index}
                onClick={() => handleComplete(result)}
                className="w-full p-4 border border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-colors text-left"
              >
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-blue-600 mr-3" />
                  <span>{result}</span>
                </div>
              </button>
            ))
          ) : (
            <p className="text-center text-gray-500 py-8">
              검색 결과가 없습니다
            </p>
          )}
        </div>

        <div className="mt-8">
          <Button
            onClick={() => handleComplete("미설정")}
            variant="outline"
            className="w-full"
          >
            나중에 설정하기
          </Button>
        </div>
      </div>
    </div>
  );
}