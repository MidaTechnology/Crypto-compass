import { Bot, TrendingUp, Users, Crown, Flame, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface FeaturedAgent {
  id: string;
  name: string;
  creator: string;
  profitRate: string;
  tvl: string;
  renters: number;
  rent: string;
  trend: number[];
}

interface FeaturedAgentCardProps {
  agent: FeaturedAgent;
  category: "star" | "hot" | "new";
  onViewDetails?: (agent: FeaturedAgent) => void;
  onRent?: (agent: FeaturedAgent) => void;
}

const categoryConfig = {
  star: {
    icon: Crown,
    label: "明星",
    gradient: "from-yellow-500/20 via-amber-500/10 to-orange-500/20",
    border: "border-yellow-500/30 hover:border-yellow-400/50",
    glow: "shadow-[0_0_30px_-5px_hsl(45,100%,50%,0.3)]",
    badgeClass: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  },
  hot: {
    icon: Flame,
    label: "热门",
    gradient: "from-red-500/20 via-orange-500/10 to-rose-500/20",
    border: "border-red-500/30 hover:border-red-400/50",
    glow: "shadow-[0_0_30px_-5px_hsl(0,100%,50%,0.3)]",
    badgeClass: "bg-red-500/20 text-red-400 border-red-500/30",
  },
  new: {
    icon: Sparkles,
    label: "最新",
    gradient: "from-blue-500/20 via-cyan-500/10 to-teal-500/20",
    border: "border-blue-500/30 hover:border-blue-400/50",
    glow: "shadow-[0_0_30px_-5px_hsl(200,100%,50%,0.3)]",
    badgeClass: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  },
};

function MiniSparkline({ data, positive }: { data: number[]; positive: boolean }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 60;
    const y = 20 - ((value - min) / range) * 18;
    return `${x},${y}`;
  }).join(' ');
  
  return (
    <svg width="60" height="24" className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={positive ? "hsl(var(--success))" : "hsl(var(--destructive))"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FeaturedAgentCard({ agent, category, onViewDetails, onRent }: FeaturedAgentCardProps) {
  const config = categoryConfig[category];
  const CategoryIcon = config.icon;
  const isPositive = agent.profitRate.startsWith("+");
  
  return (
    <div
      className={cn(
        "relative min-w-[280px] max-w-[320px] flex-shrink-0 rounded-xl border p-5 transition-all duration-300 hover:scale-[1.02] cursor-pointer",
        "bg-gradient-to-br",
        config.gradient,
        config.border,
        config.glow
      )}
      onClick={() => onViewDetails?.(agent)}
    >
      {/* Category Badge */}
      <Badge className={cn("absolute top-3 right-3 gap-1", config.badgeClass)}>
        <CategoryIcon className="w-3 h-3" />
        {config.label}
      </Badge>
      
      {/* Agent Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-card/60 backdrop-blur flex items-center justify-center border border-border/50">
          <Bot className="w-6 h-6 text-primary" />
        </div>
        <div>
          <p className="font-mono text-xs text-muted-foreground">{agent.id}</p>
          <p className="font-semibold text-foreground">{agent.name}</p>
          <p className="text-xs text-muted-foreground truncate max-w-[160px]">{agent.creator}</p>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-2 rounded-lg bg-card/40 backdrop-blur">
          <div className="flex items-center gap-1.5 mb-1">
            <TrendingUp className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">收益率</span>
          </div>
          <p className={cn("font-semibold", isPositive ? "text-success" : "text-destructive")}>
            {agent.profitRate}
          </p>
        </div>
        <div className="p-2 rounded-lg bg-card/40 backdrop-blur">
          <div className="flex items-center gap-1.5 mb-1">
            <Users className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">用户数</span>
          </div>
          <p className="font-semibold text-foreground">{agent.renters.toLocaleString()}</p>
        </div>
      </div>
      
      {/* Trend + TVL Row */}
      <div className="flex items-center justify-between mb-4 p-2 rounded-lg bg-card/40 backdrop-blur">
        <div>
          <p className="text-xs text-muted-foreground mb-1">TVL</p>
          <p className="font-medium text-foreground">{agent.tvl}</p>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-xs text-muted-foreground mb-1">24h趋势</p>
          <MiniSparkline data={agent.trend} positive={isPositive} />
        </div>
      </div>
      
      {/* Footer */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">租金</p>
          <p className="font-semibold text-warning">{agent.rent}</p>
        </div>
        <Button 
          variant="wallet" 
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onRent?.(agent);
          }}
        >
          立即租用
        </Button>
      </div>
    </div>
  );
}
