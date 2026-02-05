import { useRef } from "react";
import { ChevronLeft, ChevronRight, Crown, Flame, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeaturedAgentCard } from "./FeaturedAgentCard";
import { cn } from "@/lib/utils";

interface FeaturedAgent {
  id: string;
  name: string;
  creator: string;
  profitRate: string;
  tvl: string;
  renters: number;
  rent: string;
  trend: number[];
}

interface FeaturedSectionProps {
  starAgents: FeaturedAgent[];
  hotAgents: FeaturedAgent[];
  newAgents: FeaturedAgent[];
  onViewDetails?: (agent: FeaturedAgent) => void;
  onRent?: (agent: FeaturedAgent) => void;
}

function CategoryRow({ 
  title, 
  icon: Icon, 
  agents, 
  category, 
  onViewDetails, 
  onRent 
}: { 
  title: string;
  icon: React.ElementType;
  agents: FeaturedAgent[];
  category: "star" | "hot" | "new";
  onViewDetails?: (agent: FeaturedAgent) => void;
  onRent?: (agent: FeaturedAgent) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };
  
  const iconColors = {
    star: "text-yellow-400",
    hot: "text-red-400",
    new: "text-blue-400",
  };
  
  return (
    <div className="mb-6 last:mb-0">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon className={cn("w-5 h-5", iconColors[category])} />
          <h3 className="font-semibold text-foreground">{title}</h3>
          <span className="text-xs text-muted-foreground">({agents.length})</span>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {agents.map((agent) => (
          <FeaturedAgentCard
            key={agent.id}
            agent={agent}
            category={category}
            onViewDetails={onViewDetails}
            onRent={onRent}
          />
        ))}
      </div>
    </div>
  );
}

export function FeaturedSection({ starAgents, hotAgents, newAgents, onViewDetails, onRent }: FeaturedSectionProps) {
  return (
    <div className="space-y-2">
      <CategoryRow
        title="明星智能体"
        icon={Crown}
        agents={starAgents}
        category="star"
        onViewDetails={onViewDetails}
        onRent={onRent}
      />
      <CategoryRow
        title="热门智能体"
        icon={Flame}
        agents={hotAgents}
        category="hot"
        onViewDetails={onViewDetails}
        onRent={onRent}
      />
      <CategoryRow
        title="最新智能体"
        icon={Sparkles}
        agents={newAgents}
        category="new"
        onViewDetails={onViewDetails}
        onRent={onRent}
      />
    </div>
  );
}
