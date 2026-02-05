import { Bot, Eye, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface MarketAgent {
  id: string;
  name: string;
  creator: string;
  profitRate: string;
  tvl: string;
  renters: number;
  rent: string;
  trend: number[];
  listedAt: string;
}

interface AgentListTableProps {
  agents: MarketAgent[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onViewDetails: (agent: MarketAgent) => void;
  onRent: (agent: MarketAgent) => void;
}

function MicroSparkline({ data, positive }: { data: number[]; positive: boolean }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 48;
    const y = 16 - ((value - min) / range) * 14;
    return `${x},${y}`;
  }).join(' ');
  
  return (
    <svg width="48" height="18" className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={positive ? "hsl(var(--success))" : "hsl(var(--destructive))"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AgentListTable({ 
  agents, 
  currentPage, 
  totalPages, 
  onPageChange, 
  onViewDetails, 
  onRent 
}: AgentListTableProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              <TableHead className="w-[200px]">智能体</TableHead>
              <TableHead>创建者</TableHead>
              <TableHead className="text-right">24h 收益率</TableHead>
              <TableHead className="text-right">TVL</TableHead>
              <TableHead className="text-right">用户数</TableHead>
              <TableHead className="text-center">趋势</TableHead>
              <TableHead className="text-right">租金</TableHead>
              <TableHead className="text-center w-[160px]">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agents.map((agent, index) => {
              const isPositive = agent.profitRate.startsWith("+");
              return (
                <TableRow 
                  key={agent.id}
                  className="group transition-colors hover:bg-muted/40"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-mono text-primary text-sm">{agent.id}</p>
                        <p className="font-medium text-foreground">{agent.name}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground font-mono">
                      {agent.creator}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={cn(
                      "font-semibold",
                      isPositive ? "text-success" : "text-destructive"
                    )}>
                      {agent.profitRate}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="font-medium text-foreground">{agent.tvl}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="font-medium text-foreground">
                      {agent.renters.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <MicroSparkline data={agent.trend} positive={isPositive} />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">
                      {agent.rent}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1 text-muted-foreground hover:text-foreground"
                        onClick={() => onViewDetails(agent)}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        详情
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        className="gap-1"
                        onClick={() => onRent(agent)}
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        租用
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-between px-2">
        <p className="text-sm text-muted-foreground">
          第 {currentPage} 页，共 {totalPages} 页
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            上一页
          </Button>
          
          {/* Page numbers */}
          <div className="flex gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum: number;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "ghost"}
                  size="sm"
                  className="w-8 h-8 p-0"
                  onClick={() => onPageChange(pageNum)}
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="gap-1"
          >
            下一页
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
