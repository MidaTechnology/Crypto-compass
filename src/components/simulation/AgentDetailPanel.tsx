import { X, TrendingUp, Clock, DollarSign, Target, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SimulatedAgent } from "./AgentSimulationCard";
import { motion, AnimatePresence } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

interface AgentDetailPanelProps {
  agent: SimulatedAgent;
  onClose: () => void;
}

export function AgentDetailPanel({ agent, onClose }: AgentDetailPanelProps) {
  const isPositive = agent.profit >= 0;
  const progress = (agent.testDuration / agent.totalTestDuration) * 100;

  // Generate chart data from sparkline
  const chartData = agent.sparklineData.map((value, index) => ({
    time: `${index}h`,
    value: value
  }));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 right-0 w-full md:w-[600px] lg:w-[700px] bg-background border-l border-border z-50 overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border p-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-bold text-sm">#{agent.id.toString().padStart(3, '0')}</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold">{agent.name}</h2>
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
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-4 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Card className="glass-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                  <DollarSign className="w-3 h-3" />
                  初始资金
                </div>
                <p className="text-lg font-bold">{agent.initialBalance.toLocaleString()} USDT</p>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                  <Target className="w-3 h-3" />
                  当前余额
                </div>
                <motion.p 
                  key={agent.balance.toFixed(2)}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  className="text-lg font-bold text-primary"
                >
                  {agent.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </motion.p>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                  <TrendingUp className="w-3 h-3" />
                  总利润
                </div>
                <motion.p 
                  key={agent.profit.toFixed(2)}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  className={`text-lg font-bold ${isPositive ? 'text-primary' : 'text-red-400'}`}
                >
                  {isPositive ? '+' : ''}{agent.profit.toFixed(2)}
                </motion.p>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                  <Clock className="w-3 h-3" />
                  测试时长
                </div>
                <p className="text-lg font-bold">{agent.testDuration}h / {agent.totalTestDuration}h</p>
              </CardContent>
            </Card>
          </div>

          {/* Progress */}
          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">测试进度</span>
                <span className="font-medium">{progress.toFixed(1)}%</span>
              </div>
              <Progress value={progress} className="h-3" />
              <p className="text-xs text-muted-foreground mt-2">
                预计剩余 {agent.totalTestDuration - agent.testDuration} 小时完成测试
              </p>
            </CardContent>
          </Card>

          {/* Chart */}
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                收益曲线
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorDetail" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="time" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={10}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={10}
                      tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                      formatter={(value: number) => [`$${value.toLocaleString()}`, '余额']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      fill="url(#colorDetail)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Trade History */}
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">任务明细</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead className="text-xs">时间戳</TableHead>
                      <TableHead className="text-xs">操作</TableHead>
                      <TableHead className="text-xs">币种</TableHead>
                      <TableHead className="text-xs text-right">成交价</TableHead>
                      <TableHead className="text-xs text-right">成交金额</TableHead>
                      <TableHead className="text-xs text-right">余额</TableHead>
                      <TableHead className="text-xs text-center">状态</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {agent.trades.map((trade, index) => (
                      <motion.tr
                        key={trade.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-border"
                      >
                        <TableCell className="text-xs text-muted-foreground font-mono">
                          {trade.timestamp}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {trade.action === '买入' ? (
                              <ArrowUpRight className="w-3 h-3 text-primary" />
                            ) : (
                              <ArrowDownRight className="w-3 h-3 text-red-400" />
                            )}
                            <span className={`text-xs font-medium ${trade.action === '买入' ? 'text-primary' : 'text-red-400'}`}>
                              {trade.action}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs font-medium">{trade.coin}</TableCell>
                        <TableCell className="text-xs text-right font-mono">
                          ${trade.price.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-xs text-right font-mono">
                          ${trade.total.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-xs text-right font-mono text-primary">
                          ${trade.balanceAfter.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge 
                            variant="outline" 
                            className={`text-[10px] ${
                              trade.status === '已完成' 
                                ? 'border-primary text-primary' 
                                : trade.status === '执行中'
                                ? 'border-yellow-400 text-yellow-400'
                                : 'border-red-400 text-red-400'
                            }`}
                          >
                            {trade.status}
                          </Badge>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
    </AnimatePresence>
  );
}
