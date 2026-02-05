import { useMemo } from "react";

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  className?: string;
}

export function Sparkline({ data, width = 100, height = 32, className = "" }: SparklineProps) {
  const pathD = useMemo(() => {
    if (data.length < 2) return "";
    
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * (height - 4) - 2;
      return `${x},${y}`;
    });
    
    return `M ${points.join(" L ")}`;
  }, [data, width, height]);

  const isPositive = data.length >= 2 && data[data.length - 1] >= data[0];

  return (
    <svg width={width} height={height} className={className}>
      <defs>
        <linearGradient id={`gradient-${isPositive ? 'up' : 'down'}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={isPositive ? "hsl(var(--primary))" : "rgb(248, 113, 113)"} stopOpacity="0.3" />
          <stop offset="100%" stopColor={isPositive ? "hsl(var(--primary))" : "rgb(248, 113, 113)"} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={pathD}
        fill="none"
        stroke={isPositive ? "hsl(var(--primary))" : "rgb(248, 113, 113)"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
