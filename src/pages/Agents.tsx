import { useState, useMemo } from "react";
import { Bot, Plus, Eye, Store, List } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreateAgentModal } from "@/components/agents/CreateAgentModal";
import { FeaturedSection } from "@/components/agents/FeaturedSection";
import { AgentFilterBar, SortOption } from "@/components/agents/AgentFilterBar";
import { AgentListTable } from "@/components/agents/AgentListTable";
import { toast } from "sonner";

const myAgents = [
  { id: "#001", name: "AlphaTrend", status: "运行中", profit: "+$12,340", profitRate: "+24.68%", trades: 156 },
  { id: "#002", name: "BetaWave", status: "已停止", profit: "+$6,780", profitRate: "+13.56%", trades: 89 },
  { id: "#003", name: "GridMaster", status: "运行中", profit: "+$8,920", profitRate: "+17.84%", trades: 234 },
];

// Generate random trend data
const generateTrend = (positive: boolean) => {
  const base = positive ? 50 : 50;
  const direction = positive ? 1 : -1;
  return Array.from({ length: 12 }, (_, i) => 
    base + direction * (i * 2 + Math.random() * 10 - 5)
  );
};

const featuredAgents = {
  star: [
    { id: "#101", name: "OmegaBot", creator: "0x1a2b...3c4d", profitRate: "+156.8%", tvl: "$2.4M", renters: 1234, rent: "50 USDT/月", trend: generateTrend(true) },
    { id: "#102", name: "QuantumFlow", creator: "0x5e6f...7g8h", profitRate: "+134.2%", tvl: "$1.8M", renters: 987, rent: "80 USDT/月", trend: generateTrend(true) },
    { id: "#103", name: "NeuralTrader", creator: "0x9i0j...1k2l", profitRate: "+128.5%", tvl: "$1.5M", renters: 756, rent: "120 USDT/月", trend: generateTrend(true) },
    { id: "#104", name: "AlphaMatrix", creator: "0xab12...cd34", profitRate: "+118.3%", tvl: "$1.2M", renters: 654, rent: "90 USDT/月", trend: generateTrend(true) },
  ],
  hot: [
    { id: "#201", name: "TrendHunter", creator: "0xab12...cd34", profitRate: "+89.3%", tvl: "$890K", renters: 2341, rent: "30 USDT/月", trend: generateTrend(true) },
    { id: "#202", name: "GridGenius", creator: "0xef56...gh78", profitRate: "+76.8%", tvl: "$720K", renters: 1876, rent: "25 USDT/月", trend: generateTrend(true) },
    { id: "#203", name: "SwingMaster", creator: "0xij90...kl12", profitRate: "+71.2%", tvl: "$650K", renters: 1543, rent: "35 USDT/月", trend: generateTrend(true) },
    { id: "#204", name: "MomentumPro", creator: "0xmn34...op56", profitRate: "+68.5%", tvl: "$580K", renters: 1298, rent: "28 USDT/月", trend: generateTrend(true) },
  ],
  new: [
    { id: "#301", name: "AlphaSeeker", creator: "0xmn34...op56", profitRate: "+45.6%", tvl: "$120K", renters: 123, rent: "15 USDT/月", trend: generateTrend(true) },
    { id: "#302", name: "BetaRunner", creator: "0xqr78...st90", profitRate: "+38.9%", tvl: "$95K", renters: 89, rent: "20 USDT/月", trend: generateTrend(true) },
    { id: "#303", name: "GammaWave", creator: "0xuv12...wx34", profitRate: "+32.1%", tvl: "$78K", renters: 45, rent: "10 USDT/月", trend: generateTrend(true) },
    { id: "#304", name: "DeltaFlow", creator: "0xyz56...ab78", profitRate: "-5.2%", tvl: "$45K", renters: 23, rent: "8 USDT/月", trend: generateTrend(false) },
  ],
};

// All market agents for the table
const allMarketAgents = [
  { id: "#001", name: "OmegaBot", creator: "0x1a2b...3c4d", profitRate: "+156.8%", tvl: "$2.4M", renters: 1234, rent: "50 USDT/月", trend: generateTrend(true), listedAt: "2024-01-15" },
  { id: "#002", name: "QuantumFlow", creator: "0x5e6f...7g8h", profitRate: "+134.2%", tvl: "$1.8M", renters: 987, rent: "80 USDT/月", trend: generateTrend(true), listedAt: "2024-01-10" },
  { id: "#003", name: "NeuralTrader", creator: "0x9i0j...1k2l", profitRate: "+128.5%", tvl: "$1.5M", renters: 756, rent: "120 USDT/月", trend: generateTrend(true), listedAt: "2024-01-08" },
  { id: "#004", name: "TrendHunter", creator: "0xab12...cd34", profitRate: "+89.3%", tvl: "$890K", renters: 2341, rent: "30 USDT/月", trend: generateTrend(true), listedAt: "2024-01-05" },
  { id: "#005", name: "GridGenius", creator: "0xef56...gh78", profitRate: "+76.8%", tvl: "$720K", renters: 1876, rent: "25 USDT/月", trend: generateTrend(true), listedAt: "2024-01-03" },
  { id: "#006", name: "SwingMaster", creator: "0xij90...kl12", profitRate: "+71.2%", tvl: "$650K", renters: 1543, rent: "35 USDT/月", trend: generateTrend(true), listedAt: "2024-01-01" },
  { id: "#007", name: "幻影套利", creator: "0xmn34...op56", profitRate: "+68.5%", tvl: "$580K", renters: 1298, rent: "28 USDT/月", trend: generateTrend(true), listedAt: "2023-12-28" },
  { id: "#008", name: "AlphaSeeker", creator: "0xqr78...st90", profitRate: "+45.6%", tvl: "$120K", renters: 123, rent: "15 USDT/月", trend: generateTrend(true), listedAt: "2023-12-25" },
  { id: "#009", name: "BetaRunner", creator: "0xuv12...wx34", profitRate: "+38.9%", tvl: "$95K", renters: 89, rent: "20 USDT/月", trend: generateTrend(true), listedAt: "2023-12-20" },
  { id: "#010", name: "GammaWave", creator: "0xyz56...ab78", profitRate: "+32.1%", tvl: "$78K", renters: 45, rent: "10 USDT/月", trend: generateTrend(true), listedAt: "2023-12-18" },
  { id: "#011", name: "DeltaFlow", creator: "0xcd90...ef12", profitRate: "-5.2%", tvl: "$45K", renters: 23, rent: "8 USDT/月", trend: generateTrend(false), listedAt: "2023-12-15" },
  { id: "#012", name: "EpsilonEdge", creator: "0xgh34...ij56", profitRate: "+22.4%", tvl: "$180K", renters: 234, rent: "18 USDT/月", trend: generateTrend(true), listedAt: "2023-12-10" },
  { id: "#013", name: "ZetaZone", creator: "0xkl78...mn90", profitRate: "+55.7%", tvl: "$340K", renters: 567, rent: "40 USDT/月", trend: generateTrend(true), listedAt: "2023-12-05" },
  { id: "#014", name: "EtaEngine", creator: "0xop12...qr34", profitRate: "+41.3%", tvl: "$210K", renters: 312, rent: "22 USDT/月", trend: generateTrend(true), listedAt: "2023-12-01" },
  { id: "#015", name: "ThetaTrader", creator: "0xst56...uv78", profitRate: "-12.8%", tvl: "$32K", renters: 12, rent: "5 USDT/月", trend: generateTrend(false), listedAt: "2023-11-28" },
];

const ITEMS_PER_PAGE = 8;

function ListAgentModal({ agent }: { agent: typeof myAgents[0] }) {
  const [rent, setRent] = useState("50");
  const [commission, setCommission] = useState("10");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1">
          <Store className="w-4 h-4" />
          上架
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-card border-border">
        <DialogHeader>
          <DialogTitle>上架智能体到市场</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/30">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-medium">{agent.id} - {agent.name}</p>
              <p className="text-sm text-primary">{agent.profitRate} 收益率</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="rent">月租金 (USDT)</Label>
            <Input 
              id="rent" 
              value={rent} 
              onChange={(e) => setRent(e.target.value)}
              placeholder="输入月租金"
              className="bg-muted/30 border-border"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="commission">佣金比例 (%)</Label>
            <Input 
              id="commission" 
              value={commission} 
              onChange={(e) => setCommission(e.target.value)}
              placeholder="输入佣金百分比"
              className="bg-muted/30 border-border"
            />
            <p className="text-xs text-muted-foreground">用户收益的 {commission}% 将作为您的佣金</p>
          </div>
          
          <Button className="w-full" variant="wallet">
            确认上架
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Agents() {
  const [agents, setAgents] = useState(myAgents);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("profitRate");
  const [currentPage, setCurrentPage] = useState(1);

  const handleAgentCreated = (agentData: {
    name: string;
    description: string;
    strategyType: string;
    tradingPair: string;
    initialCapital: string;
  }) => {
    const newAgent = {
      id: `#${String(agents.length + 1).padStart(3, '0')}`,
      name: agentData.name,
      status: "已停止" as const,
      profit: "$0",
      profitRate: "+0.00%",
      trades: 0,
    };
    setAgents(prev => [...prev, newAgent]);
    toast.success(`智能体 "${agentData.name}" 创建成功！`, {
      description: `策略: ${agentData.strategyType} | 交易对: ${agentData.tradingPair}`,
    });
  };

  const handleViewDetails = (agent: any) => {
    toast.info(`查看智能体详情: ${agent.id} - ${agent.name}`);
  };

  const handleRent = (agent: any) => {
    toast.success(`已添加到购物车: ${agent.id} - ${agent.name}`, {
      description: `租金: ${agent.rent}`,
    });
  };

  // Filter and sort agents
  const filteredAgents = useMemo(() => {
    let result = [...allMarketAgents];
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        agent => 
          agent.name.toLowerCase().includes(query) || 
          agent.id.toLowerCase().includes(query)
      );
    }
    
    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "profitRate":
          return parseFloat(b.profitRate) - parseFloat(a.profitRate);
        case "tvl":
          const tvlA = parseFloat(a.tvl.replace(/[$KM]/g, '')) * (a.tvl.includes('M') ? 1000 : 1);
          const tvlB = parseFloat(b.tvl.replace(/[$KM]/g, '')) * (b.tvl.includes('M') ? 1000 : 1);
          return tvlB - tvlA;
        case "renters":
          return b.renters - a.renters;
        case "newest":
          return new Date(b.listedAt).getTime() - new Date(a.listedAt).getTime();
        default:
          return 0;
      }
    });
    
    return result;
  }, [searchQuery, sortBy]);

  const totalPages = Math.ceil(filteredAgents.length / ITEMS_PER_PAGE);
  const paginatedAgents = filteredAgents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <DashboardLayout>
      {/* Page Title */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">智能体</h1>
          <p className="text-muted-foreground">管理和发现自动化交易策略</p>
        </div>
        <CreateAgentModal onAgentCreated={handleAgentCreated}>
          <Button variant="wallet" className="gap-2">
            <Plus className="w-4 h-4" />
            创建智能体
          </Button>
        </CreateAgentModal>
      </div>

      {/* My Agents */}
      <Card className="glass-card mb-8">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" />
            我的智能体
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.length === 0 ? (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>还没有创建智能体</p>
                <p className="text-sm">点击右上角按钮创建您的第一个智能体</p>
              </div>
            ) : null}
            {agents.map((agent) => (
              <Card key={agent.id} className="bg-muted/20 border-border hover:border-primary/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{agent.name}</p>
                        <p className="text-xs text-muted-foreground">{agent.id}</p>
                      </div>
                    </div>
                    <Badge 
                      variant={agent.status === "运行中" ? "default" : "outline"}
                      className={agent.status === "运行中" ? "bg-primary/20 text-primary border-0" : ""}
                    >
                      {agent.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground">收益</p>
                      <p className="text-primary font-medium">{agent.profit}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">收益率</p>
                      <p className="text-primary font-medium">{agent.profitRate}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 gap-1">
                      <Eye className="w-4 h-4" />
                      明细
                    </Button>
                    <ListAgentModal agent={agent} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Agent Market */}
      <Card className="glass-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Store className="w-5 h-5 text-accent" />
            智能体市场
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Featured Section */}
          <FeaturedSection
            starAgents={featuredAgents.star}
            hotAgents={featuredAgents.hot}
            newAgents={featuredAgents.new}
            onViewDetails={handleViewDetails}
            onRent={handleRent}
          />
          
          {/* Divider */}
          <div className="border-t border-border" />
          
          {/* All Agents Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <List className="w-5 h-5 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">所有智能体</h3>
              <span className="text-sm text-muted-foreground">({allMarketAgents.length})</span>
            </div>
            
            {/* Filter Bar */}
            <AgentFilterBar
              searchQuery={searchQuery}
              onSearchChange={(query) => {
                setSearchQuery(query);
                setCurrentPage(1);
              }}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
            
            {/* Agent Table */}
            <AgentListTable
              agents={paginatedAgents}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              onViewDetails={handleViewDetails}
              onRent={handleRent}
            />
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
