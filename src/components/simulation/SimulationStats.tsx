import { Bot, TrendingUp, TrendingDown, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

interface SimulationStatsProps {
  activeAgents: number;
  totalPnL: number;
  totalROI: number;
}

export function SimulationStats({ activeAgents, totalPnL, totalROI }: SimulationStatsProps) {
  const isPositive = totalPnL >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm mb-1">模拟中的智能体</p>
              <motion.p 
                key={activeAgents}
                initial={{ scale: 1.2, color: "hsl(var(--primary))" }}
                animate={{ scale: 1, color: "hsl(var(--foreground))" }}
                className="text-3xl font-bold"
              >
                {activeAgents}
              </motion.p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm mb-1">模拟总盈亏</p>
              <motion.p 
                key={totalPnL.toFixed(2)}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className={`text-3xl font-bold ${isPositive ? 'text-primary' : 'text-red-400'}`}
              >
                {isPositive ? '+' : ''}{totalPnL.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT
              </motion.p>
            </div>
            <div className={`w-12 h-12 rounded-xl ${isPositive ? 'bg-primary/20' : 'bg-red-500/20'} flex items-center justify-center`}>
              {isPositive ? (
                <TrendingUp className="w-6 h-6 text-primary" />
              ) : (
                <TrendingDown className="w-6 h-6 text-red-400" />
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm mb-1">平均投资回报率</p>
              <motion.p 
                key={totalROI.toFixed(2)}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className={`text-3xl font-bold ${totalROI >= 0 ? 'text-primary' : 'text-red-400'}`}
              >
                {totalROI >= 0 ? '+' : ''}{totalROI.toFixed(2)}%
              </motion.p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
              <Activity className="w-6 h-6 text-accent" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
