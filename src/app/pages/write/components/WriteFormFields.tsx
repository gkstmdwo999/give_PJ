import { Camera, MapPin } from "lucide-react";
import { useNavigate } from "react-router";
import { Input } from "@/app/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";

interface FormData {
  title: string;
  category: string;
  description: string;
  location: string;
}

interface WriteFormFieldsProps {
  formData: FormData;
  onFormChange: (data: FormData) => void;
  postType: string;
}

export function WriteFormFields({ formData, onFormChange, postType }: WriteFormFieldsProps) {
  const navigate = useNavigate();

  return (
    <div className="px-4 py-6">
      <div className="space-y-6">
        {/* Image Upload */}
        <div>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-blue-600 transition-colors">
            <Camera className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-sm text-gray-600">사진 추가 (최대 10장)</p>
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2">제목</label>
          <Input
            type="text"
            value={formData.title}
            onChange={(e) => onFormChange({ ...formData, title: e.target.value })}
            placeholder={
              postType === "share" ? "나눔할 물품의 제목을 입력하세요" : "필요한 물품의 제목을 입력하세요"
            }
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-2">카테고리</label>
          <Select onValueChange={(value) => onFormChange({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="카테고리를 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="clothing">의류/잡화</SelectItem>
              <SelectItem value="electronics">전자제품</SelectItem>
              <SelectItem value="furniture">가구/인테리어</SelectItem>
              <SelectItem value="books">도서</SelectItem>
              <SelectItem value="household">생활용품</SelectItem>
              <SelectItem value="food">식품</SelectItem>
              <SelectItem value="toys">장난감/취미</SelectItem>
              <SelectItem value="etc">기타</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">설명</label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md min-h-[150px]"
            value={formData.description}
            onChange={(e) => onFormChange({ ...formData, description: e.target.value })}
            placeholder={
              postType === "share"
                ? "물품의 상태, 사용 기간 등을 자세히 적어주세요"
                : "필요한 이유와 용도를 자세히 적어주세요"
            }
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium mb-2">거래 희망 장소</label>
          <button
            type="button"
            onClick={() => navigate("/location-select")}
            className="w-full px-4 py-3 border border-gray-300 rounded-md flex items-center justify-between hover:border-blue-600 transition-colors"
          >
            <div className="flex items-center text-gray-700">
              <MapPin className="w-5 h-5 mr-2 text-blue-600" />
              {formData.location}
            </div>
            <span className="text-sm text-gray-500">변경</span>
          </button>
        </div>
      </div>
    </div>
  );
}
