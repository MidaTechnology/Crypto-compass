import { Trophy, TrendingUp, DollarSign, Lock, Users, Star, Medal } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const leaderboards = {
  profitRate: [
    { rank: 1, id: "#001", name: "AlphaTrend", value: "+256.8%", creator: "0x1a2b...3c4d" },
    { rank: 2, id: "#042", name: "QuantumFlow", value: "+198.3%", creator: "0x5e6f...7g8h" },
    { rank: 3, id: "#017", name: "NeuralTrader", value: "+167.2%", creator: "0x9i0j...1k2l" },
    { rank: 4, id: "#089", name: "GridGenius", value: "+145.6%", creator: "0xab12...cd34" },
    { rank: 5, id: "#023", name: "SwingMaster", value: "+134.8%", creator: "0xef56...gh78" },
    { rank: 6, id: "#056", name: "TrendHunter", value: "+128.4%", creator: "0xij90...kl12" },
    { rank: 7, id: "#078", name: "MomentumPro", value: "+119.7%", creator: "0xmn34...op56" },
    { rank: 8, id: "#034", name: "ScalpKing", value: "+112.3%", creator: "0xqr78...st90" },
    { rank: 9, id: "#091", name: "WaveRider", value: "+105.9%", creator: "0xuv12...wx34" },
    { rank: 10, id: "#012", name: "DeltaFlow", value: "+98.6%", creator: "0xyz56...ab78" },
  ],
  profitAmount: [
    { rank: 1, id: "#001", name: "AlphaTrend", value: "$1,234,567", creator: "0x1a2b...3c4d" },
    { rank: 2, id: "#042", name: "QuantumFlow", value: "$987,654", creator: "0x5e6f...7g8h" },
    { rank: 3, id: "#017", name: "NeuralTrader", value: "$756,432", creator: "0x9i0j...1k2l" },
    { rank: 4, id: "#089", name: "GridGenius", value: "$654,321", creator: "0xab12...cd34" },
    { rank: 5, id: "#023", name: "SwingMaster", value: "$543,210", creator: "0xef56...gh78" },
    { rank: 6, id: "#056", name: "TrendHunter", value: "$432,109", creator: "0xij90...kl12" },
    { rank: 7, id: "#078", name: "MomentumPro", value: "$321,098", creator: "0xmn34...op56" },
    { rank: 8, id: "#034", name: "ScalpKing", value: "$210,987", creator: "0xqr78...st90" },
    { rank: 9, id: "#091", name: "WaveRider", value: "$198,765", creator: "0xuv12...wx34" },
    { rank: 10, id: "#012", name: "DeltaFlow", value: "$187,654", creator: "0xyz56...ab78" },
  ],
  tvl: [
    { rank: 1, id: "#001", name: "AlphaTrend", value: "$45.6M", creator: "0x1a2b...3c4d" },
    { rank: 2, id: "#042", name: "QuantumFlow", value: "$32.4M", creator: "0x5e6f...7g8h" },
    { rank: 3, id: "#017", name: "NeuralTrader", value: "$28.9M", creator: "0x9i0j...1k2l" },
    { rank: 4, id: "#089", name: "GridGenius", value: "$21.3M", creator: "0xab12...cd34" },
    { rank: 5, id: "#023", name: "SwingMaster", value: "$18.7M", creator: "0xef56...gh78" },
    { rank: 6, id: "#056", name: "TrendHunter", value: "$15.2M", creator: "0xij90...kl12" },
    { rank: 7, id: "#078", name: "MomentumPro", value: "$12.8M", creator: "0xmn34...op56" },
    { rank: 8, id: "#034", name: "ScalpKing", value: "$10.5M", creator: "0xqr78...st90" },
    { rank: 9, id: "#091", name: "WaveRider", value: "$8.9M", creator: "0xuv12...wx34" },
    { rank: 10, id: "#012", name: "DeltaFlow", value: "$7.2M", creator: "0xyz56...ab78" },
  ],
  users: [
    { rank: 1, id: "#001", name: "AlphaTrend", value: "12,345", creator: "0x1a2b...3c4d" },
    { rank: 2, id: "#042", name: "QuantumFlow", value: "9,876", creator: "0x5e6f...7g8h" },
    { rank: 3, id: "#017", name: "NeuralTrader", value: "7,654", creator: "0x9i0j...1k2l" },
    { rank: 4, id: "#089", name: "GridGenius", value: "6,543", creator: "0xab12...cd34" },
    { rank: 5, id: "#023", name: "SwingMaster", value: "5,432", creator: "0xef56...gh78" },
    { rank: 6, id: "#056", name: "TrendHunter", value: "4,321", creator: "0xij90...kl12" },
    { rank: 7, id: "#078", name: "MomentumPro", value: "3,210", creator: "0xmn34...op56" },
    { rank: 8, id: "#034", name: "ScalpKing", value: "2,109", creator: "0xqr78...st90" },
    { rank: 9, id: "#091", name: "WaveRider", value: "1,987", creator: "0xuv12...wx34" },
    { rank: 10, id: "#012", name: "DeltaFlow", value: "1,876", creator: "0xyz56...ab78" },
  ],
  points: [
    { rank: 1, id: "#001", name: "AlphaTrend", value: "98,765", creator: "0x1a2b...3c4d" },
    { rank: 2, id: "#042", name: "QuantumFlow", value: "87,654", creator: "0x5e6f...7g8h" },
    { rank: 3, id: "#017", name: "NeuralTrader", value: "76,543", creator: "0x9i0j...1k2l" },
    { rank: 4, id: "#089", name: "GridGenius", value: "65,432", creator: "0xab12...cd34" },
    { rank: 5, id: "#023", name: "SwingMaster", value: "54,321", creator: "0xef56...gh78" },
    { rank: 6, id: "#056", name: "TrendHunter", value: "43,210", creator: "0xij90...kl12" },
    { rank: 7, id: "#078", name: "MomentumPro", value: "32,109", creator: "0xmn34...op56" },
    { rank: 8, id: "#034", name: "ScalpKing", value: "21,098", creator: "0xqr78...st90" },
    { rank: 9, id: "#091", name: "WaveRider", value: "19,876", creator: "0xuv12...wx34" },
    { rank: 10, id: "#012", name: "DeltaFlow", value: "18,765", creator: "0xyz56...ab78" },
  ],
};

function getRankIcon(rank: number) {
  if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-400" />;
  if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
  if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
  return <span className="text-muted-foreground font-mono w-5 text-center">{rank}</span>;
}

function getRankStyle(rank: number) {
  if (rank === 1) return "bg-yellow-400/10 border-yellow-400/30";
  if (rank === 2) return "bg-gray-400/10 border-gray-400/30";
  if (rank === 3) return "bg-amber-600/10 border-amber-600/30";
  return "bg-muted/30";
}

function LeaderboardList({ data, valueLabel }: { data: typeof leaderboards.profitRate; valueLabel: string }) {
  return (
    <div className="space-y-2">
      {data.map((item) => (
        <div 
          key={item.id} 
          className={`flex items-center gap-4 p-4 rounded-lg border transition-colors hover:bg-muted/50 ${getRankStyle(item.rank)}`}
        >
          <div className="w-8 flex justify-center">
            {getRankIcon(item.rank)}
          </div>
          
          <div className="flex-1 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-bold text-sm">{item.id.replace('#', '')}</span>
            </div>
            <div>
              <p className="font-medium">{item.id}-{item.name}</p>
              <p className="text-xs text-muted-foreground">创建者: {item.creator}</p>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-primary font-bold text-lg">{item.value}</p>
            <p className="text-xs text-muted-foreground">{valueLabel}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Leaderboard() {
  return (
    <DashboardLayout>
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground mb-2">排行榜</h1>
        <p className="text-muted-foreground">发现表现最佳的智能体</p>
      </div>

      {/* Top 3 Highlight */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {leaderboards.profitRate.slice(0, 3).map((item, index) => (
          <Card key={item.id} className={`glass-card border ${
            index === 0 ? "border-yellow-400/50" : 
            index === 1 ? "border-gray-400/50" : 
            "border-amber-600/50"
          }`}>
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                {index === 0 && <Trophy className="w-12 h-12 text-yellow-400 mx-auto" />}
                {index === 1 && <Medal className="w-12 h-12 text-gray-400 mx-auto" />}
                {index === 2 && <Medal className="w-12 h-12 text-amber-600 mx-auto" />}
              </div>
              <Badge variant="outline" className="mb-2">#{index + 1}</Badge>
              <h3 className="font-bold text-lg mb-1">{item.id}-{item.name}</h3>
              <p className="text-primary text-xl font-bold">{item.value}</p>
              <p className="text-xs text-muted-foreground mt-2">{item.creator}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Leaderboard Tabs */}
      <Card className="glass-card">
        <CardContent className="p-6">
          <Tabs defaultValue="profitRate" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6 bg-muted/30">
              <TabsTrigger value="profitRate" className="gap-1 data-[state=active]:bg-primary/20 text-xs md:text-sm">
                <TrendingUp className="w-4 h-4" />
                <span className="hidden md:inline">收益率</span>
              </TabsTrigger>
              <TabsTrigger value="profitAmount" className="gap-1 data-[state=active]:bg-primary/20 text-xs md:text-sm">
                <DollarSign className="w-4 h-4" />
                <span className="hidden md:inline">收益金额</span>
              </TabsTrigger>
              <TabsTrigger value="tvl" className="gap-1 data-[state=active]:bg-primary/20 text-xs md:text-sm">
                <Lock className="w-4 h-4" />
                <span className="hidden md:inline">TVL</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="gap-1 data-[state=active]:bg-primary/20 text-xs md:text-sm">
                <Users className="w-4 h-4" />
                <span className="hidden md:inline">用户数</span>
              </TabsTrigger>
              <TabsTrigger value="points" className="gap-1 data-[state=active]:bg-primary/20 text-xs md:text-sm">
                <Star className="w-4 h-4" />
                <span className="hidden md:inline">积分</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profitRate">
              <LeaderboardList data={leaderboards.profitRate} valueLabel="收益率" />
            </TabsContent>
            
            <TabsContent value="profitAmount">
              <LeaderboardList data={leaderboards.profitAmount} valueLabel="收益金额" />
            </TabsContent>
            
            <TabsContent value="tvl">
              <LeaderboardList data={leaderboards.tvl} valueLabel="锁仓量" />
            </TabsContent>
            
            <TabsContent value="users">
              <LeaderboardList data={leaderboards.users} valueLabel="用户数" />
            </TabsContent>
            
            <TabsContent value="points">
              <LeaderboardList data={leaderboards.points} valueLabel="积分" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
