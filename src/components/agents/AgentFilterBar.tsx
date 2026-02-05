import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SortOption = "profitRate" | "tvl" | "renters" | "newest";

interface AgentFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export function AgentFilterBar({ 
  searchQuery, 
  onSearchChange, 
  sortBy, 
  onSortChange 
}: AgentFilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-card/50 border border-border mb-6">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="搜索智能体名称或编号..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-muted/30 border-border"
        />
      </div>
      
      {/* Sort Options */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <ArrowUpDown className="w-4 h-4" />
          <span className="text-sm hidden sm:inline">排序:</span>
        </div>
        
        <Select value={sortBy} onValueChange={(v) => onSortChange(v as SortOption)}>
          <SelectTrigger className="w-[140px] bg-muted/30 border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="profitRate">按收益率</SelectItem>
            <SelectItem value="tvl">按 TVL</SelectItem>
            <SelectItem value="renters">按用户数</SelectItem>
            <SelectItem value="newest">最新上架</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
