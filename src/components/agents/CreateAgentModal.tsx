import { useState } from "react";
import { Bot, ChevronRight, ChevronLeft, Settings, TrendingUp, Shield, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CreateAgentModalProps {
  children: React.ReactNode;
  onAgentCreated?: (agent: AgentFormData) => void;
}

interface AgentFormData {
  // 基本信息
  name: string;
  description: string;
  // 策略配置
  strategyType: string;
  tradingPair: string;
  timeframe: string;
  // 风险管理
  maxPositionSize: number;
  stopLoss: number;
  takeProfit: number;
  maxDailyTrades: number;
  // 高级设置
  enableAutoRebalance: boolean;
  enableNotifications: boolean;
  initialCapital: string;
}

const steps = [
  { id: 1, title: "基本信息", icon: Bot },
  { id: 2, title: "策略配置", icon: Settings },
  { id: 3, title: "风险管理", icon: Shield },
  { id: 4, title: "确认创建", icon: Check },
];

const strategyTypes = [
  { value: "grid", label: "网格交易", description: "适合震荡行情" },
  { value: "trend", label: "趋势跟踪", description: "适合单边行情" },
  { value: "arbitrage", label: "套利策略", description: "跨市场价差" },
  { value: "dca", label: "定投策略", description: "长期投资" },
  { value: "swing", label: "波段交易", description: "中期持仓" },
];

const tradingPairs = [
  "BTC/USDT", "ETH/USDT", "BNB/USDT", "SOL/USDT", "XRP/USDT", "ADA/USDT"
];

const timeframes = [
  { value: "1m", label: "1分钟" },
  { value: "5m", label: "5分钟" },
  { value: "15m", label: "15分钟" },
  { value: "1h", label: "1小时" },
  { value: "4h", label: "4小时" },
  { value: "1d", label: "1天" },
];

export function CreateAgentModal({ children, onAgentCreated }: CreateAgentModalProps) {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<AgentFormData>({
    name: "",
    description: "",
    strategyType: "",
    tradingPair: "",
    timeframe: "",
    maxPositionSize: 10,
    stopLoss: 5,
    takeProfit: 15,
    maxDailyTrades: 10,
    enableAutoRebalance: true,
    enableNotifications: true,
    initialCapital: "1000",
  });

  const updateFormData = (field: keyof AgentFormData, value: AgentFormData[keyof AgentFormData]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleCreate = () => {
    onAgentCreated?.(formData);
    setOpen(false);
    setCurrentStep(1);
    setFormData({
      name: "",
      description: "",
      strategyType: "",
      tradingPair: "",
      timeframe: "",
      maxPositionSize: 10,
      stopLoss: 5,
      takeProfit: 15,
      maxDailyTrades: 10,
      enableAutoRebalance: true,
      enableNotifications: true,
      initialCapital: "1000",
    });
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim().length > 0;
      case 2:
        return formData.strategyType && formData.tradingPair && formData.timeframe;
      case 3:
        return true;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="glass-card border-border max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">创建新智能体</DialogTitle>
        </DialogHeader>

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-6 px-2">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                    currentStep >= step.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/50 text-muted-foreground"
                  )}
                >
                  <step.icon className="w-5 h-5" />
                </div>
                <span className={cn(
                  "text-xs mt-2",
                  currentStep >= step.id ? "text-primary" : "text-muted-foreground"
                )}>
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={cn(
                  "w-12 h-0.5 mx-2 mt-[-16px]",
                  currentStep > step.id ? "bg-primary" : "bg-muted/50"
                )} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="min-h-[300px] py-4">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">智能体名称 *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateFormData("name", e.target.value)}
                  placeholder="为您的智能体起一个名称"
                  className="bg-muted/30 border-border"
                  maxLength={50}
                />
                <p className="text-xs text-muted-foreground">名称将用于识别您的智能体</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">描述</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => updateFormData("description", e.target.value)}
                  placeholder="描述您的智能体策略和目标..."
                  className="bg-muted/30 border-border min-h-[100px]"
                  maxLength={500}
                />
                <p className="text-xs text-muted-foreground">{formData.description.length}/500</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="capital">初始资金 (USDT)</Label>
                <Input
                  id="capital"
                  type="number"
                  value={formData.initialCapital}
                  onChange={(e) => updateFormData("initialCapital", e.target.value)}
                  placeholder="输入初始资金"
                  className="bg-muted/30 border-border"
                  min="100"
                />
              </div>
            </div>
          )}

          {/* Step 2: Strategy Config */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>策略类型 *</Label>
                <div className="grid grid-cols-2 gap-3">
                  {strategyTypes.map((strategy) => (
                    <div
                      key={strategy.value}
                      onClick={() => updateFormData("strategyType", strategy.value)}
                      className={cn(
                        "p-4 rounded-lg border cursor-pointer transition-all hover:border-primary/50",
                        formData.strategyType === strategy.value
                          ? "border-primary bg-primary/10"
                          : "border-border bg-muted/20"
                      )}
                    >
                      <p className="font-medium">{strategy.label}</p>
                      <p className="text-xs text-muted-foreground">{strategy.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>交易对 *</Label>
                  <Select
                    value={formData.tradingPair}
                    onValueChange={(value) => updateFormData("tradingPair", value)}
                  >
                    <SelectTrigger className="bg-muted/30 border-border">
                      <SelectValue placeholder="选择交易对" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      {tradingPairs.map((pair) => (
                        <SelectItem key={pair} value={pair}>{pair}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>时间周期 *</Label>
                  <Select
                    value={formData.timeframe}
                    onValueChange={(value) => updateFormData("timeframe", value)}
                  >
                    <SelectTrigger className="bg-muted/30 border-border">
                      <SelectValue placeholder="选择周期" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      {timeframes.map((tf) => (
                        <SelectItem key={tf.value} value={tf.value}>{tf.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Risk Management */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>最大持仓比例</Label>
                    <Badge variant="outline">{formData.maxPositionSize}%</Badge>
                  </div>
                  <Slider
                    value={[formData.maxPositionSize]}
                    onValueChange={([value]) => updateFormData("maxPositionSize", value)}
                    max={100}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground mt-1">单次交易最大使用资金比例</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>止损比例</Label>
                    <Badge variant="outline" className="text-destructive">{formData.stopLoss}%</Badge>
                  </div>
                  <Slider
                    value={[formData.stopLoss]}
                    onValueChange={([value]) => updateFormData("stopLoss", value)}
                    max={50}
                    min={1}
                    step={0.5}
                    className="w-full"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>止盈比例</Label>
                    <Badge variant="outline" className="text-primary">{formData.takeProfit}%</Badge>
                  </div>
                  <Slider
                    value={[formData.takeProfit]}
                    onValueChange={([value]) => updateFormData("takeProfit", value)}
                    max={100}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>每日最大交易次数</Label>
                    <Badge variant="outline">{formData.maxDailyTrades} 次</Badge>
                  </div>
                  <Slider
                    value={[formData.maxDailyTrades]}
                    onValueChange={([value]) => updateFormData("maxDailyTrades", value)}
                    max={100}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>自动再平衡</Label>
                    <p className="text-xs text-muted-foreground">自动调整仓位以维持策略配置</p>
                  </div>
                  <Switch
                    checked={formData.enableAutoRebalance}
                    onCheckedChange={(checked) => updateFormData("enableAutoRebalance", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>交易通知</Label>
                    <p className="text-xs text-muted-foreground">接收交易执行和重要事件通知</p>
                  </div>
                  <Switch
                    checked={formData.enableNotifications}
                    onCheckedChange={(checked) => updateFormData("enableNotifications", checked)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/30">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                    <Bot className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{formData.name || "未命名智能体"}</h3>
                    <p className="text-sm text-muted-foreground">{formData.description || "暂无描述"}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-background/50">
                    <p className="text-xs text-muted-foreground">策略类型</p>
                    <p className="font-medium">
                      {strategyTypes.find(s => s.value === formData.strategyType)?.label || "未选择"}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-background/50">
                    <p className="text-xs text-muted-foreground">交易对</p>
                    <p className="font-medium">{formData.tradingPair || "未选择"}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-background/50">
                    <p className="text-xs text-muted-foreground">时间周期</p>
                    <p className="font-medium">
                      {timeframes.find(t => t.value === formData.timeframe)?.label || "未选择"}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-background/50">
                    <p className="text-xs text-muted-foreground">初始资金</p>
                    <p className="font-medium">${formData.initialCapital}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                <div className="p-3 rounded-lg bg-muted/30 text-center">
                  <p className="text-lg font-semibold text-primary">{formData.maxPositionSize}%</p>
                  <p className="text-xs text-muted-foreground">最大持仓</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/30 text-center">
                  <p className="text-lg font-semibold text-destructive">{formData.stopLoss}%</p>
                  <p className="text-xs text-muted-foreground">止损</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/30 text-center">
                  <p className="text-lg font-semibold text-primary">{formData.takeProfit}%</p>
                  <p className="text-xs text-muted-foreground">止盈</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/30 text-center">
                  <p className="text-lg font-semibold">{formData.maxDailyTrades}</p>
                  <p className="text-xs text-muted-foreground">日交易数</p>
                </div>
              </div>

              <div className="flex gap-2">
                {formData.enableAutoRebalance && (
                  <Badge variant="secondary" className="bg-primary/20 text-primary">自动再平衡</Badge>
                )}
                {formData.enableNotifications && (
                  <Badge variant="secondary" className="bg-accent/20 text-accent">通知开启</Badge>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <Button
            variant="ghost"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            上一步
          </Button>

          {currentStep < steps.length ? (
            <Button
              variant="wallet"
              onClick={nextStep}
              disabled={!isStepValid()}
              className="gap-2"
            >
              下一步
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              variant="wallet"
              onClick={handleCreate}
              className="gap-2"
            >
              <Check className="w-4 h-4" />
              确认创建
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
