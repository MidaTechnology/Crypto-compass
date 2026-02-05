import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Zap, Target, Flame } from "lucide-react";

export interface StrategyCase {
  id: string;
  name: string;
  difficulty: "初级" | "中级" | "专家";
  environment: string;
  description: string;
  category: string;
  hotScore: number;
  roi: string;
  principle: string;
  backtestData: number[];
  advantages: string[];
  risks: string[];
  aiAdvice: string;
}

interface StrategyCaseCardProps {
  strategy: StrategyCase;
  onClick: () => void;
  index: number;
}

const difficultyColors = {
  "初级": "bg-green-500/20 text-green-400 border-green-500/30",
  "中级": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  "专家": "bg-red-500/20 text-red-400 border-red-500/30",
};

const categoryIcons: Record<string, React.ElementType> = {
  "趋势跟踪": TrendingUp,
  "对冲套利": Target,
  "网格交易": Zap,
  "MEV 策略": Flame,
  "高频交易": Zap,
};

export function StrategyCaseCard({ strategy, onClick, index }: StrategyCaseCardProps) {
  const CategoryIcon = categoryIcons[strategy.category] || TrendingUp;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card
        onClick={onClick}
        className="glass-card p-5 cursor-pointer hover:border-primary/40 hover:bg-card/80 transition-all group"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CategoryIcon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {strategy.name}
              </h3>
              <span className="text-xs text-muted-foreground">{strategy.category}</span>
            </div>
          </div>
          <Badge variant="outline" className={difficultyColors[strategy.difficulty]}>
            {strategy.difficulty}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {strategy.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground">环境:</span>
              <span className="text-xs font-medium text-foreground">{strategy.environment}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground">回报:</span>
              <span className="text-xs font-medium text-primary">{strategy.roi}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <Flame className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-medium text-orange-400">{strategy.hotScore}</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
