import { Wallet, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";

const pageTitles: Record<string, string> = {
  "/": "仪表盘",
  "/assets": "资产",
  "/agents": "智能体",
  "/quests": "任务",
  "/leaderboard": "排行榜",
  "/simulation": "模拟区",
};

export function Header() {
  const location = useLocation();
  const title = pageTitles[location.pathname] || "仪表盘";

  return (
    <header className="h-16 border-b border-border bg-background/80 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-medium text-foreground">{title}</h2>
      </div>
      
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full text-[10px] flex items-center justify-center text-primary-foreground font-medium">
            3
          </span>
        </Button>
        <Button variant="wallet" size="default">
          <Wallet className="w-4 h-4 mr-2" />
          连接钱包
        </Button>
      </div>
    </header>
  );
}
