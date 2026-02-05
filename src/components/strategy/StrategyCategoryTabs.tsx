import { motion } from "framer-motion";

interface StrategyCategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function StrategyCategoryTabs({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}: StrategyCategoryTabsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className="relative px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          {activeCategory === category && (
            <motion.div
              layoutId="activeCategory"
              className="absolute inset-0 bg-primary/20 border border-primary/30 rounded-lg"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className={`relative z-10 ${
            activeCategory === category 
              ? "text-primary" 
              : "text-muted-foreground hover:text-foreground"
          }`}>
            {category}
          </span>
        </button>
      ))}
    </div>
  );
}
