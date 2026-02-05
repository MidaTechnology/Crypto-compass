interface CryptoCardProps {
  name: string;
  symbol: string;
  price: string;
  change: string;
  changeType: "positive" | "negative";
  icon: string;
  holdings?: string;
  value?: string;
}

export function CryptoCard({ name, symbol, price, change, changeType, icon, holdings, value }: CryptoCardProps) {
  return (
    <div className="card-glow rounded-xl p-5 hover:glow-sm transition-all duration-300 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xl">
            {icon}
          </div>
          <div>
            <p className="font-medium text-foreground">{name}</p>
            <p className="text-sm text-muted-foreground">{symbol}</p>
          </div>
        </div>
        <div className={`text-sm px-2 py-1 rounded-md ${
          changeType === "positive" 
            ? "bg-success/10 text-success" 
            : "bg-destructive/10 text-destructive"
        }`}>
          {changeType === "positive" ? "+" : ""}{change}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">价格</span>
          <span className="text-foreground font-medium">{price}</span>
        </div>
        {holdings && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">持有量</span>
            <span className="text-foreground">{holdings}</span>
          </div>
        )}
        {value && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">价值</span>
            <span className="text-primary font-medium">{value}</span>
          </div>
        )}
      </div>
    </div>
  );
}
