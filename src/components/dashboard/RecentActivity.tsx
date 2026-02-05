import { ArrowUpRight, ArrowDownLeft, RefreshCw } from "lucide-react";

const activities = [
  { type: "send", title: "发送 ETH", amount: "-0.5 ETH", time: "2分钟前", address: "0x1234...5678" },
  { type: "receive", title: "接收 USDT", amount: "+1,000 USDT", time: "15分钟前", address: "0xabcd...efgh" },
  { type: "swap", title: "兑换代币", amount: "ETH → USDC", time: "1小时前", address: "Uniswap V3" },
  { type: "receive", title: "接收 BTC", amount: "+0.02 BTC", time: "3小时前", address: "0x9876...5432" },
];

const iconMap = {
  send: ArrowUpRight,
  receive: ArrowDownLeft,
  swap: RefreshCw,
};

const colorMap = {
  send: "text-destructive bg-destructive/10",
  receive: "text-success bg-success/10",
  swap: "text-primary bg-primary/10",
};

export function RecentActivity() {
  return (
    <div className="card-glow rounded-xl p-5 animate-fade-in">
      <h3 className="text-lg font-medium text-foreground mb-4">最近活动</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = iconMap[activity.type as keyof typeof iconMap];
          const colorClass = colorMap[activity.type as keyof typeof colorMap];
          
          return (
            <div key={index} className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClass}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{activity.title}</p>
                <p className="text-xs text-muted-foreground truncate">{activity.address}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{activity.amount}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
