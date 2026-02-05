import { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

interface StrategySearchBarProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
}

export function StrategySearchBar({ onSearch, isSearching }: StrategySearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          {/* Scanning animation */}
          <AnimatePresence>
            {isSearching && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
                {/* Ripple effect */}
                <motion.div
                  className="absolute inset-0 border-2 border-primary/30 rounded-xl"
                  animate={{ scale: [1, 1.02, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative flex items-center">
            <div className="absolute left-4 flex items-center gap-2">
              <Sparkles className={`w-5 h-5 ${isSearching ? "text-primary animate-pulse" : "text-muted-foreground"}`} />
            </div>
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="AI 正在检索并整理经典策略..."
              className="w-full h-14 pl-12 pr-14 text-base bg-card/50 border-border/50 rounded-xl backdrop-blur-sm focus:border-primary/50 focus:ring-primary/20 transition-all"
            />
            <button
              type="submit"
              className="absolute right-3 w-10 h-10 rounded-lg bg-primary/20 hover:bg-primary/30 flex items-center justify-center transition-colors"
            >
              <Search className="w-5 h-5 text-primary" />
            </button>
          </div>
        </div>
      </form>

      {/* AI status text */}
      <AnimatePresence>
        {isSearching && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute -bottom-8 left-0 right-0 text-center"
          >
            <span className="text-sm text-primary/80 flex items-center justify-center gap-2">
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ●
              </motion.span>
              AI 正在分析市场数据并匹配最佳策略...
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
