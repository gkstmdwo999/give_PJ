import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { AICheckDialog } from "./components/AICheckDialog";
import { WriteFormFields } from "./components/WriteFormFields";

export function WriteFormScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const postType = searchParams.get("type") || "share";
  const [aiCheckDialogOpen, setAiCheckDialogOpen] = useState(false);
  const [aiCheckResult, setAiCheckResult] = useState<"checking" | "safe" | "unsafe" | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    location: "역삼동",
  });

  // 컴포넌트 마운트 시 AI 유해물품 판단 팝업 표시 (나눔해요일 때만)
  useEffect(() => {
    if (postType === "share") {
      setAiCheckDialogOpen(true);
      setAiCheckResult("checking");

      // 2초 후 안전한 물품으로 판단 (실제로는 AI API 호출)
      setTimeout(() => {
        setAiCheckResult("safe");
      }, 2000);
    }
  }, [postType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to success or back to home
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-10">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="ml-4 text-lg font-semibold">
            {postType === "share" ? "나눔해요" : "필요해요"}
          </h1>
        </div>
        <Button
          onClick={handleSubmit}
          size="sm"
          className="bg-blue-600 hover:bg-blue-700"
        >
          완료
        </Button>
      </div>

      <WriteFormFields
        formData={formData}
        onFormChange={setFormData}
        postType={postType}
      />

      <AICheckDialog
        open={aiCheckDialogOpen}
        onOpenChange={setAiCheckDialogOpen}
        result={aiCheckResult}
      />
    </div>
  );
}