import { Wallet, TrendingUp, Users, Zap, Plus, Search, ArrowRight, Bot, CheckCircle2 } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const stats = [
  { title: "总资产价值", value: "$128,430.58", change: "24h +5.23%", changeType: "positive" as const, icon: Wallet },
  { title: "今日盈亏", value: "+$6,320.15", change: "较昨日 +12.4%", changeType: "positive" as const, icon: TrendingUp },
  { title: "运行中智能体", value: "3", change: "共5个智能体", changeType: "neutral" as const, icon: Users },
  { title: "完成任务", value: "23", change: "本周完成", changeType: "neutral" as const, icon: Zap },
];

const recentUpdates = [
  { id: 1, type: "trade", title: "AlphaTrend 执行买入", detail: "BTC/USDT +0.5 BTC @ $67,234", time: "5分钟前", icon: Bot },
  { id: 2, type: "profit", title: "GridMaster 盈利", detail: "+$320.50 收益入账", time: "32分钟前", icon: TrendingUp },
  { id: 3, type: "task", title: "任务完成", detail: "连续签到奖励 +100 积分", time: "1小时前", icon: CheckCircle2 },
  { id: 4, type: "system", title: "系统通知", detail: "市场波动预警已触发", time: "2小时前", icon: Zap },
  { id: 5, type: "trade", title: "SwingPro 止盈成功", detail: "ETH/USDT 收益 +$890", time: "3小时前", icon: Bot },
];

export default function Index() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground mb-2">欢迎回来 👋</h1>
        <p className="text-muted-foreground">以下是您的加密资产概览</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card 
          className="glass-card cursor-pointer hover:border-primary/50 transition-all group"
          onClick={() => navigate("/agents")}
        >
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus className="w-7 h-7 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">创建新智能体</h3>
              <p className="text-sm text-muted-foreground">配置自动化交易策略</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </CardContent>
        </Card>

        <Card 
          className="glass-card cursor-pointer hover:border-accent/50 transition-all group"
          onClick={() => navigate("/strategy-cases")}
        >
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Search className="w-7 h-7 text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">策略案例查询</h3>
              <p className="text-sm text-muted-foreground">浏览市场热门策略</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
          </CardContent>
        </Card>
      </div>

      {/* Latest Updates */}
      <Card className="glass-card">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              最新动态
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              查看全部
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentUpdates.map((update) => (
              <div key={update.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <update.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{update.title}</p>
                  <p className="text-sm text-muted-foreground">{update.detail}</p>
                </div>
                <span className="text-xs text-muted-foreground">{update.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
