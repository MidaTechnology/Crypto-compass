import { motion, AnimatePresence } from "framer-motion";
import { X, TrendingUp, AlertTriangle, CheckCircle2, Sparkles, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StrategyCase } from "./StrategyCaseCard";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useMemo } from "react";

interface StrategyDetailPanelProps {
  strategy: StrategyCase | null;
  onClose: () => void;
}

const difficultyColors = {
  "初级": "bg-green-500/20 text-green-400 border-green-500/30",
  "中级": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  "专家": "bg-red-500/20 text-red-400 border-red-500/30",
};

export function StrategyDetailPanel({ strategy, onClose }: StrategyDetailPanelProps) {
  const chartData = useMemo(() => {
    if (!strategy) return [];
    return strategy.backtestData.map((value, index) => ({
      month: `M${index + 1}`,
      value: value,
    }));
  }, [strategy]);

  return (
    <AnimatePresence>
      {strategy && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-2xl bg-background border-l border-border z-50 overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="gap-2 text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="w-4 h-4" />
                  返回列表
                </Button>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Strategy Title */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-foreground">{strategy.name}</h1>
                  <Badge variant="outline" className={difficultyColors[strategy.difficulty]}>
                    {strategy.difficulty}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>分类: {strategy.category}</span>
                  <span>•</span>
                  <span>运行环境: {strategy.environment}</span>
                  <span>•</span>
                  <span className="text-primary">预期回报: {strategy.roi}</span>
                </div>
              </div>

              {/* Principle Section */}
              <Card className="glass-card mb-6">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    原理讲解
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-invert prose-sm max-w-none">
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {strategy.principle}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Backtest Chart */}
              <Card className="glass-card mb-6">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    历史回测示意
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">经典案例历史表现 (模拟数据)</p>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis 
                          dataKey="month" 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                        />
                        <YAxis 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                          tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                          formatter={(value: number) => [`$${value.toLocaleString()}`, "资产价值"]}
                        />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#colorValue)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Pros and Cons */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <Card className="glass-card border-green-500/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2 text-green-400">
                      <CheckCircle2 className="w-5 h-5" />
                      优势
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {strategy.advantages.map((adv, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-2 text-sm text-green-300/80"
                        >
                          <span className="text-green-400 mt-1">•</span>
                          {adv}
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="glass-card border-red-500/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2 text-red-400">
                      <AlertTriangle className="w-5 h-5" />
                      风险点
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {strategy.risks.map((risk, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-2 text-sm text-red-300/80"
                        >
                          <span className="text-red-400 mt-1">•</span>
                          {risk}
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
              </Card>
              </div>

              {/* AI Advice */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-xl blur-xl" />
                <Card className="relative glass-card border-primary/30 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                  <CardHeader className="pb-3 relative">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      AI 智囊建议
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative">
                    <blockquote className="pl-4 border-l-2 border-primary/50 italic text-muted-foreground">
                      {strategy.aiAdvice}
                    </blockquote>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-8">
                <Button className="flex-1 bg-primary hover:bg-primary/90">
                  应用此策略
                </Button>
                <Button variant="outline" className="flex-1">
                  添加到收藏
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
