import { AlertTriangle, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";

interface AICheckDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  result: "checking" | "safe" | "unsafe" | null;
}

export function AICheckDialog({ open, onOpenChange, result }: AICheckDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>물품 안전 확인</DialogTitle>
          <DialogDescription>
            {result === "checking" && (
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" />
                물품을 확인 중입니다...
              </div>
            )}
            {result === "safe" && (
              <div className="flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />
                안전한 물품입니다.
              </div>
            )}
            {result === "unsafe" && (
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
                유해한 물품입니다. 다른 물품을 선택해주세요.
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
