import { Play, Square, Download, ChevronRight, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sparkline } from "./Sparkline";
import { motion } from "framer-motion";

export interface SimulatedAgent {
  id: number;
  name: string;
  balance: number;
  initialBalance: number;
  profit: number;
  roi: number;
  testDuration: number; // hours
  totalTestDuration: number; // hours
  sparklineData: number[];
  status: 'running' | 'paused' | 'completed';
  trades: TradeRecord[];
}

export interface TradeRecord {
  id: number;
  timestamp: string;
  action: '买入' | '卖出';
  coin: string;
  price: number;
  amount: number;
  total: number;
  balanceAfter: number;
  status: '执行中' | '已完成' | '已撤销';
}

interface AgentSimulationCardProps {
  agent: SimulatedAgent;
  onSelect: (agent: SimulatedAgent) => void;
  onStop: (agentId: number) => void;
  onExport: (agentId: number) => void;
  index: number;
}

export function AgentSimulationCard({ agent, onSelect, onStop, onExport, index }: AgentSimulationCardProps) {
  const isPositive = agent.profit >= 0;
  const progress = (agent.testDuration / agent.totalTestDuration) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="glass-card hover:border-primary/50 transition-all duration-300 cursor-pointer group">
        <CardContent className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-bold text-sm">#{agent.id.toString().padStart(3, '0')}</span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{agent.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge 
                    variant="outline" 
                    className={
                      agent.status === 'running' 
                        ? 'border-primary text-primary bg-primary/10' 
                        : agent.status === 'paused'
                        ? 'border-yellow-400 text-yellow-400 bg-yellow-400/10'
                        : 'border-muted-foreground text-muted-foreground'
                    }
                  >
                    {agent.status === 'running' ? '运行中' : agent.status === 'paused' ? '已暂停' : '已完成'}
                  </Badge>
                </div>
              </div>
            </div>
            <Sparkline data={agent.sparklineData} width={80} height={28} />
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">当前余额</p>
              <motion.p 
                key={agent.balance.toFixed(2)}
                initial={{ scale: 1.05, color: isPositive ? "hsl(var(--primary))" : "rgb(248, 113, 113)" }}
                animate={{ scale: 1, color: "hsl(var(--foreground))" }}
                transition={{ duration: 0.3 }}
                className="text-lg font-bold"
              >
                {agent.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </motion.p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">总利润</p>
              <motion.p 
                key={agent.profit.toFixed(2)}
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`text-lg font-bold ${isPositive ? 'text-primary' : 'text-red-400'}`}
              >
                {isPositive ? '+' : ''}{agent.profit.toFixed(2)}
              </motion.p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">投资回报率</p>
              <motion.p 
                key={agent.roi.toFixed(2)}
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`text-lg font-bold ${agent.roi >= 0 ? 'text-primary' : 'text-red-400'}`}
              >
                {agent.roi >= 0 ? '+' : ''}{agent.roi.toFixed(2)}%
              </motion.p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">测试时长</p>
              <p className="text-lg font-bold text-foreground flex items-center gap-1">
                <Clock className="w-4 h-4 text-muted-foreground" />
                {agent.testDuration}h
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>测试进度</span>
              <span>{agent.testDuration} / {agent.totalTestDuration} 小时</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 gap-1"
              onClick={(e) => {
                e.stopPropagation();
                onStop(agent.id);
              }}
            >
              <Square className="w-3 h-3" />
              停止测试
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 gap-1"
              onClick={(e) => {
                e.stopPropagation();
                onExport(agent.id);
              }}
            >
              <Download className="w-3 h-3" />
              导出数据
            </Button>
            <Button
              variant="wallet"
              size="sm"
              className="gap-1"
              onClick={() => onSelect(agent)}
            >
              详情
              <ChevronRight className="w-3 h-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
