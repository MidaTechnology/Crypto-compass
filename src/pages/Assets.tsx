import { Wallet, TrendingUp, Percent, DollarSign, Bot, Clock } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const metrics = [
  { title: "本金", value: "$50,000.00", icon: Wallet, color: "text-blue-400" },
  { title: "收益", value: "+$28,430.58", icon: TrendingUp, color: "text-primary" },
  { title: "收益率", value: "+56.86%", icon: Percent, color: "text-primary" },
  { title: "总资产", value: "$78,430.58", icon: DollarSign, color: "text-yellow-400" },
];

const runningAgents = [
  { id: "#001", name: "AlphaTrend", profit: "+$12,340", profitRate: "+24.68%", status: "运行中", runtime: "32天" },
  { id: "#003", name: "GridMaster", profit: "+$8,920", profitRate: "+17.84%", status: "运行中", runtime: "18天" },
  { id: "#007", name: "SwingPro", profit: "+$4,250", profitRate: "+8.50%", status: "运行中", runtime: "7天" },
];

const myAgents = [
  { id: "#002", name: "BetaWave", profit: "+$6,780", profitRate: "+13.56%", status: "已停止", created: "2024-01-15" },
  { id: "#005", name: "DeltaFlow", profit: "-$1,200", profitRate: "-2.40%", status: "测试中", created: "2024-02-20" },
];

const history = [
  { time: "2024-03-15 14:32", event: "AlphaTrend 执行买入", detail: "BTC/USDT +0.5 BTC @ $67,234" },
  { time: "2024-03-15 12:18", event: "GridMaster 完成网格", detail: "收益 +$320.50" },
  { time: "2024-03-15 09:45", event: "系统通知", detail: "市场波动预警已触发" },
  { time: "2024-03-14 22:10", event: "SwingPro 止盈成功", detail: "ETH/USDT 收益 +$890" },
  { time: "2024-03-14 18:30", event: "资金划转", detail: "从交易所转入 5,000 USDT" },
];

export default function Assets() {
  return (
    <DashboardLayout>
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground mb-2">资产总览</h1>
        <p className="text-muted-foreground">管理您的投资组合和智能体收益</p>
      </div>

      {/* Core Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((metric) => (
          <Card key={metric.title} className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">{metric.title}</p>
                  <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center">
                  <metric.icon className={`w-6 h-6 ${metric.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Agent Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Running Agents */}
        <Card className="glass-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary" />
              运行中的智能体
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {runningAgents.map((agent) => (
                <div key={agent.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground font-mono text-sm">{agent.id}</span>
                    <span className="font-medium">{agent.name}</span>
                    <Badge variant="default" className="bg-primary/20 text-primary border-0">
                      {agent.status}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-primary font-medium">{agent.profit}</p>
                    <p className="text-xs text-muted-foreground">{agent.runtime}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* My Created Agents */}
        <Card className="glass-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bot className="w-5 h-5 text-accent" />
              我创建的智能体
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {myAgents.map((agent) => (
                <div key={agent.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground font-mono text-sm">{agent.id}</span>
                    <span className="font-medium">{agent.name}</span>
                    <Badge 
                      variant="outline" 
                      className={agent.status === "已停止" ? "border-muted-foreground text-muted-foreground" : "border-yellow-500 text-yellow-500"}
                    >
                      {agent.status}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className={agent.profitRate.startsWith("+") ? "text-primary font-medium" : "text-red-400 font-medium"}>
                      {agent.profit}
                    </p>
                    <p className="text-xs text-muted-foreground">{agent.created}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* History Timeline */}
      <Card className="glass-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="w-5 h-5 text-muted-foreground" />
            历史动态
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {history.map((item, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  {index < history.length - 1 && <div className="w-px h-12 bg-border" />}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-foreground">{item.event}</span>
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
