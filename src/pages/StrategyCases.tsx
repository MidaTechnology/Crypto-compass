import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { StrategySearchBar } from "@/components/strategy/StrategySearchBar";
import { StrategyCategoryTabs } from "@/components/strategy/StrategyCategoryTabs";
import { StrategyCaseCard, StrategyCase } from "@/components/strategy/StrategyCaseCard";
import { StrategyDetailPanel } from "@/components/strategy/StrategyDetailPanel";

const categories = ["全部", "趋势跟踪", "对冲套利", "网格交易", "MEV 策略", "高频交易"];

// Mock strategy data
const mockStrategies: StrategyCase[] = [
  {
    id: "1",
    name: "双均线趋势追踪",
    difficulty: "初级",
    environment: "CEX",
    description: "通过 EMA12 与 EMA26 的金叉死叉信号，捕捉中期趋势行情，适合震荡市后的突破行情。",
    category: "趋势跟踪",
    hotScore: 92,
    roi: "+45.2%",
    principle: `## 策略原理

双均线策略是最经典的技术分析方法之一，核心逻辑基于价格趋势的惯性原理。

**关键参数：**
- 快线：EMA12（12日指数移动平均线）
- 慢线：EMA26（26日指数移动平均线）

**交易信号：**
1. **金叉买入**：当 EMA12 上穿 EMA26 时，表明短期动能强于长期趋势，产生买入信号
2. **死叉卖出**：当 EMA12 下穿 EMA26 时，表明短期动能转弱，产生卖出信号

**最佳应用场景：**
适用于明显趋势行情，在震荡市中可能产生较多假信号。建议配合 MACD 柱状图或 RSI 进行二次确认。`,
    backtestData: [10000, 10500, 11200, 10800, 12500, 13200, 14500, 13800, 15200, 16800, 18500, 19200],
    advantages: [
      "逻辑简单，易于理解和执行",
      "能有效捕捉大趋势行情",
      "参数优化空间大",
      "适合程序化自动交易"
    ],
    risks: [
      "震荡市容易频繁止损",
      "存在一定的信号滞后性",
      "需要较强的资金管理配合",
      "单一策略依赖性高"
    ],
    aiAdvice: "当前市场处于震荡整理期，BTC 正在关键支撑位附近盘整。建议暂时降低仓位或等待明确突破信号后再启用此策略。同时可考虑将止损设置为入场价的 3-5%，以控制假突破带来的损失。"
  },
  {
    id: "2",
    name: "现货-永续套利",
    difficulty: "中级",
    environment: "CEX/DEX",
    description: "利用现货与永续合约的价差进行低风险套利，年化收益稳定在 15-30%，适合稳健型投资者。",
    category: "对冲套利",
    hotScore: 88,
    roi: "+28.5%",
    principle: `## 策略原理

现货-永续套利是一种市场中性策略，通过同时持有现货多头和永续合约空头，赚取资金费率收益。

**核心机制：**
永续合约通过资金费率机制锚定现货价格。当市场看多情绪高涨时，多头需向空头支付资金费用。

**操作步骤：**
1. 在现货市场买入等值 BTC
2. 在永续合约市场开立等值空头头寸
3. 每 8 小时收取一次资金费率（若费率为正）
4. 当费率转负或套利空间消失时平仓

**收益来源：**
资金费率通常在 0.01% - 0.1% / 8小时，年化约 10-40%`,
    backtestData: [10000, 10200, 10450, 10680, 10920, 11150, 11400, 11620, 11880, 12100, 12350, 12850],
    advantages: [
      "市场中性，不受价格涨跌影响",
      "收益稳定可预测",
      "资金利用率较高",
      "可自动化执行"
    ],
    risks: [
      "资金费率可能转负",
      "需要同时管理两个头寸",
      "存在交易所风险",
      "极端行情可能触发强平"
    ],
    aiAdvice: "近期市场波动加剧，永续合约资金费率波动较大。当前 BTC 永续费率约为 0.015%/8h，处于中等偏高水平，套利空间尚可。建议分批建仓，并设置资金费率监控告警。"
  },
  {
    id: "3",
    name: "智能网格交易",
    difficulty: "初级",
    environment: "CEX",
    description: "在设定价格区间内自动低买高卖，适合震荡行情，可实现 24 小时无人值守交易。",
    category: "网格交易",
    hotScore: 95,
    roi: "+32.8%",
    principle: `## 策略原理

网格交易策略将资金分散在预设价格区间的多个网格中，通过自动化执行低买高卖实现收益。

**参数设置：**
- 价格上限：预期最高价格
- 价格下限：预期最低价格
- 网格数量：通常 10-50 格
- 每格资金：总资金 / 网格数量

**运行逻辑：**
1. 在每个网格价位设置限价买单和卖单
2. 价格下跌触发买入，价格上涨触发卖出
3. 每笔交易赚取固定网格利润
4. 循环往复，积少成多

**最佳区间：**
适合震荡幅度在 20-50% 的横盘行情`,
    backtestData: [10000, 10350, 10120, 10580, 10890, 11200, 10950, 11450, 11780, 12100, 12450, 13280],
    advantages: [
      "无需预测方向，双向获利",
      "24/7 自动运行",
      "收益稳定且频繁",
      "参数设置简单直观"
    ],
    risks: [
      "单边行情可能套牢",
      "需要较大初始资金",
      "网格密度影响收益效率",
      "交易手续费累积"
    ],
    aiAdvice: "当前 ETH 处于 $2,800-$3,500 的震荡区间，非常适合网格策略。建议设置 20-30 格，单格利润 1.2-1.5%。注意预留 20% 资金应对突破行情，并设置整体止损线。"
  },
  {
    id: "4",
    name: "三明治套利",
    difficulty: "专家",
    environment: "DEX",
    description: "利用链上交易的确定性，在大额交易前后进行夹击套利，需要深厚的技术功底和 Gas 优化能力。",
    category: "MEV 策略",
    hotScore: 78,
    roi: "+125.6%",
    principle: `## 策略原理

三明治攻击是一种 MEV（矿工可提取价值）策略，利用 AMM 的价格滑点机制获利。

**执行流程：**
1. 监控内存池（Mempool）中的大额 Swap 交易
2. 抢先发送高 Gas 买入交易（Front-run）
3. 等待目标交易执行，推高价格
4. 立即卖出获利（Back-run）

**技术要求：**
- 高性能节点基础设施
- 精准的 Gas 价格预估
- 极低延迟的交易广播
- 复杂的利润计算模型

**核心优势：**
无需持仓过夜，交易即结算，利润确定性高`,
    backtestData: [10000, 11200, 12800, 11500, 15200, 18500, 16200, 19800, 22500, 24800, 21500, 25600],
    advantages: [
      "单笔利润可观",
      "交易即结算，无持仓风险",
      "利润具有确定性",
      "无需预测市场方向"
    ],
    risks: [
      "技术门槛极高",
      "Gas 战争激烈",
      "存在监管灰色地带",
      "可能被其他 Bot 抢跑"
    ],
    aiAdvice: "MEV 赛道竞争已经白热化，建议新手谨慎入场。如果有技术实力，可考虑 Flashbots 联盟的合法 MEV 提取方式，避免直接参与三明治攻击。当前 Gas 成本约 30-50 Gwei，利润空间收窄。"
  },
  {
    id: "5",
    name: "做市商策略",
    difficulty: "专家",
    environment: "CEX/DEX",
    description: "通过提供双向流动性赚取买卖价差，需要精密的库存管理和风险对冲机制。",
    category: "高频交易",
    hotScore: 72,
    roi: "+52.3%",
    principle: `## 策略原理

做市策略通过在买卖两侧同时挂单，赚取买卖价差（Bid-Ask Spread）收益。

**核心逻辑：**
1. 在买一价格挂买单（Bid）
2. 在卖一价格挂卖单（Ask）
3. 当两边都成交时，赚取中间价差
4. 动态调整报价，管理库存风险

**关键参数：**
- 报价宽度（Spread）：买卖价差大小
- 挂单深度：每档价格的挂单量
- 库存上限：单边持仓的最大限制
- 对冲阈值：触发对冲的库存水平

**盈利模式：**
薄利多销，靠高频交易量积累收益`,
    backtestData: [10000, 10150, 10320, 10580, 10750, 11020, 11280, 11550, 11820, 12150, 12480, 15230],
    advantages: [
      "收益来源明确稳定",
      "可对冲市场风险",
      "资金周转率极高",
      "适合大资金运作"
    ],
    risks: [
      "需要专业技术团队",
      "库存管理复杂",
      "对延迟极度敏感",
      "极端行情风险大"
    ],
    aiAdvice: "做市策略适合专业机构或有丰富量化经验的团队。个人投资者不建议直接参与，可考虑将资金投入专业做市商的资管产品。目前 BTC/USDT 价差约 0.01%，盈利空间较小，需要高杠杆放大收益。"
  },
  {
    id: "6",
    name: "突破回踩策略",
    difficulty: "中级",
    environment: "CEX",
    description: "在关键价位突破后等待回踩确认再入场，提高胜率并降低追高风险，适合有一定经验的交易者。",
    category: "趋势跟踪",
    hotScore: 85,
    roi: "+38.7%",
    principle: `## 策略原理

突破回踩策略结合了趋势跟踪和支撑阻力理论，追求更高的入场确定性。

**核心思路：**
价格突破关键位置后，往往会回测该位置（阻力转支撑），此时入场风险更低。

**执行步骤：**
1. 识别关键价位（前高前低、整数关口、趋势线）
2. 等待价格有效突破（突破幅度 > 1%）
3. 等待价格回踩至突破位附近
4. 确认回踩有效后入场（K线形态确认）
5. 止损设在回踩低点下方

**成功率提升技巧：**
配合成交量分析，放量突破 + 缩量回踩是最佳形态`,
    backtestData: [10000, 10200, 10650, 11200, 10950, 11800, 12500, 12200, 13200, 14500, 13800, 15870],
    advantages: [
      "入场位置更优",
      "止损距离更近",
      "胜率相对更高",
      "逻辑清晰易执行"
    ],
    risks: [
      "可能错过快速行情",
      "需要耐心等待",
      "假突破判断困难",
      "回踩幅度不确定"
    ],
    aiAdvice: "当前 BTC 在 $65,000 形成明显阻力，若突破建议等待回踩至 $64,500-$65,000 区间再入场。注意观察突破时的成交量，有效突破通常伴随 1.5 倍以上的成交量放大。"
  },
];

export default function StrategyCases() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [activeCategory, setActiveCategory] = useState("全部");
  const [selectedStrategy, setSelectedStrategy] = useState<StrategyCase | null>(null);

  const handleSearch = (query: string) => {
    setIsSearching(true);
    setSearchQuery(query);
    // Simulate AI search delay
    setTimeout(() => {
      setIsSearching(false);
    }, 1500);
  };

  const filteredStrategies = useMemo(() => {
    return mockStrategies.filter((strategy) => {
      const matchesCategory = activeCategory === "全部" || strategy.category === activeCategory;
      const matchesSearch = 
        searchQuery === "" ||
        strategy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        strategy.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        strategy.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <DashboardLayout>
      {/* Background gradient for immersive feel */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/95" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            返回开始页面
          </Button>
        </motion.div>

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">策略案例库</h1>
          </div>
          <p className="text-muted-foreground">探索 AI 整理的经典交易策略，获取专业智囊建议</p>
        </motion.div>

        {/* AI Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <StrategySearchBar onSearch={handleSearch} isSearching={isSearching} />
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <StrategyCategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </motion.div>

        {/* Strategy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStrategies.map((strategy, index) => (
            <StrategyCaseCard
              key={strategy.id}
              strategy={strategy}
              onClick={() => setSelectedStrategy(strategy)}
              index={index}
            />
          ))}
        </div>

        {/* Empty state */}
        {filteredStrategies.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-muted-foreground">没有找到匹配的策略，请尝试其他关键词</p>
          </motion.div>
        )}
      </div>

      {/* Strategy Detail Panel */}
      <StrategyDetailPanel
        strategy={selectedStrategy}
        onClose={() => setSelectedStrategy(null)}
      />
    </DashboardLayout>
  );
}
