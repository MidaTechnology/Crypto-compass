import { Target, CheckCircle2, Clock, Gift, ChevronRight } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const allTasks = [
  { id: 1, title: "完成首次交易", description: "使用智能体执行第一笔交易", progress: 100, reward: "50 积分", status: "completed" },
  { id: 2, title: "连续签到7天", description: "连续7天登录平台", progress: 71, reward: "100 积分", status: "in_progress", current: "5/7" },
  { id: 3, title: "创建智能体", description: "创建您的第一个智能体策略", progress: 100, reward: "200 积分", status: "completed" },
  { id: 4, title: "邀请3位好友", description: "邀请好友注册并完成首次交易", progress: 33, reward: "300 积分", status: "in_progress", current: "1/3" },
  { id: 5, title: "总收益达到1000U", description: "累计收益达到1000 USDT", progress: 85, reward: "500 积分", status: "in_progress", current: "$850/$1000" },
  { id: 6, title: "智能体上架市场", description: "将智能体发布到市场供他人租用", progress: 0, reward: "1000 积分", status: "pending" },
  { id: 7, title: "获得10个租用者", description: "您的智能体被10人租用", progress: 0, reward: "2000 积分", status: "pending" },
];

const inProgressTasks = allTasks.filter(t => t.status === "in_progress");
const completedTasks = allTasks.filter(t => t.status === "completed");

function TaskItem({ task }: { task: typeof allTasks[0] }) {
  const isCompleted = task.status === "completed";
  const isPending = task.status === "pending";
  
  return (
    <div className={`flex items-center gap-4 p-4 rounded-lg transition-colors ${
      isCompleted ? "bg-primary/10" : "bg-muted/30 hover:bg-muted/50"
    }`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
        isCompleted ? "bg-primary/20" : isPending ? "bg-muted/50" : "bg-accent/20"
      }`}>
        {isCompleted ? (
          <CheckCircle2 className="w-6 h-6 text-primary" />
        ) : (
          <Target className={`w-6 h-6 ${isPending ? "text-muted-foreground" : "text-accent"}`} />
        )}
      </div>
      
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-medium text-foreground">{task.title}</h3>
          {isCompleted && (
            <Badge variant="default" className="bg-primary/20 text-primary border-0">已完成</Badge>
          )}
          {isPending && (
            <Badge variant="outline" className="text-muted-foreground">未开始</Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
        
        {!isPending && (
          <div className="flex items-center gap-4">
            <Progress value={task.progress} className="flex-1 h-2" />
            {task.current && (
              <span className="text-xs text-muted-foreground">{task.current}</span>
            )}
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="flex items-center gap-1 text-yellow-400">
            <Gift className="w-4 h-4" />
            <span className="font-medium">{task.reward}</span>
          </div>
        </div>
        {isCompleted ? (
          <Button variant="outline" size="sm" disabled>已领取</Button>
        ) : (
          <Button variant="ghost" size="icon">
            <ChevronRight className="w-5 h-5" />
          </Button>
        )}
      </div>
    </div>
  );
}

export default function Tasks() {
  return (
    <DashboardLayout>
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground mb-2">任务中心</h1>
        <p className="text-muted-foreground">完成任务获取积分奖励</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="glass-card">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">已完成</p>
              <p className="text-2xl font-bold text-foreground">{completedTasks.length}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
              <Clock className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">进行中</p>
              <p className="text-2xl font-bold text-foreground">{inProgressTasks.length}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-yellow-400/20 flex items-center justify-center">
              <Gift className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">累计积分</p>
              <p className="text-2xl font-bold text-foreground">2,450</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Task List */}
      <Card className="glass-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            任务列表
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6 bg-muted/30">
              <TabsTrigger value="all" className="data-[state=active]:bg-primary/20">
                全部 ({allTasks.length})
              </TabsTrigger>
              <TabsTrigger value="in_progress" className="data-[state=active]:bg-primary/20">
                进行中 ({inProgressTasks.length})
              </TabsTrigger>
              <TabsTrigger value="completed" className="data-[state=active]:bg-primary/20">
                已完成 ({completedTasks.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-3">
              {allTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </TabsContent>
            
            <TabsContent value="in_progress" className="space-y-3">
              {inProgressTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </TabsContent>
            
            <TabsContent value="completed" className="space-y-3">
              {completedTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
