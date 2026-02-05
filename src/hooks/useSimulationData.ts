import { useState, useEffect, useCallback } from "react";
import { SimulatedAgent, TradeRecord } from "@/components/simulation/AgentSimulationCard";

const INITIAL_BALANCE = 10000;
const COINS = ['BTC', 'ETH', 'SOL', 'AVAX', 'MATIC', 'DOT'];

function generateTrades(agentId: number, count: number): TradeRecord[] {
  const trades: TradeRecord[] = [];
  let balance = INITIAL_BALANCE;
  
  for (let i = 0; i < count; i++) {
    const action = Math.random() > 0.5 ? '买入' : '卖出';
    const coin = COINS[Math.floor(Math.random() * COINS.length)];
    const price = coin === 'BTC' ? 65000 + Math.random() * 5000 
      : coin === 'ETH' ? 3200 + Math.random() * 400
      : 50 + Math.random() * 200;
    const amount = Math.random() * 0.5;
    const total = price * amount;
    
    if (action === '买入') {
      balance -= total * 0.01;
    } else {
      balance += total * 0.01;
    }
    
    const hour = Math.floor(Math.random() * 24);
    const minute = Math.floor(Math.random() * 60);
    const second = Math.floor(Math.random() * 60);
    
    trades.push({
      id: agentId * 1000 + i,
      timestamp: `2024-01-${15 + Math.floor(i / 3)} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`,
      action,
      coin,
      price: Math.round(price * 100) / 100,
      amount: Math.round(amount * 10000) / 10000,
      total: Math.round(total * 100) / 100,
      balanceAfter: Math.round(balance * 100) / 100,
      status: i === 0 ? '执行中' : Math.random() > 0.1 ? '已完成' : '已撤销'
    });
  }
  
  return trades.reverse();
}

function generateSparklineData(baseValue: number, variance: number, points: number): number[] {
  const data: number[] = [];
  let current = baseValue;
  
  for (let i = 0; i < points; i++) {
    current += (Math.random() - 0.48) * variance;
    current = Math.max(baseValue * 0.9, Math.min(baseValue * 1.2, current));
    data.push(Math.round(current * 100) / 100);
  }
  
  return data;
}

const initialAgents: SimulatedAgent[] = [
  {
    id: 101,
    name: "趋势捕手 AI",
    balance: 10456.78,
    initialBalance: INITIAL_BALANCE,
    profit: 456.78,
    roi: 4.57,
    testDuration: 48,
    totalTestDuration: 168,
    sparklineData: generateSparklineData(10000, 100, 24),
    status: 'running',
    trades: generateTrades(101, 12)
  },
  {
    id: 102,
    name: "网格交易机器人",
    balance: 10234.56,
    initialBalance: INITIAL_BALANCE,
    profit: 234.56,
    roi: 2.35,
    testDuration: 72,
    totalTestDuration: 168,
    sparklineData: generateSparklineData(10000, 80, 24),
    status: 'running',
    trades: generateTrades(102, 18)
  },
  {
    id: 103,
    name: "套利猎手 Pro",
    balance: 10089.12,
    initialBalance: INITIAL_BALANCE,
    profit: 89.12,
    roi: 0.89,
    testDuration: 24,
    totalTestDuration: 120,
    sparklineData: generateSparklineData(10000, 50, 24),
    status: 'running',
    trades: generateTrades(103, 8)
  },
  {
    id: 104,
    name: "DCA 定投大师",
    balance: 9876.54,
    initialBalance: INITIAL_BALANCE,
    profit: -123.46,
    roi: -1.23,
    testDuration: 96,
    totalTestDuration: 336,
    sparklineData: generateSparklineData(10000, 60, 24),
    status: 'running',
    trades: generateTrades(104, 15)
  },
  {
    id: 105,
    name: "波段冲浪者",
    balance: 10678.90,
    initialBalance: INITIAL_BALANCE,
    profit: 678.90,
    roi: 6.79,
    testDuration: 120,
    totalTestDuration: 168,
    sparklineData: generateSparklineData(10000, 120, 24),
    status: 'running',
    trades: generateTrades(105, 22)
  }
];

export function useSimulationData() {
  const [agents, setAgents] = useState<SimulatedAgent[]>(initialAgents);

  // Simulate real-time updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setAgents(prevAgents => 
        prevAgents.map(agent => {
          if (agent.status !== 'running') return agent;

          // Random price movement
          const change = (Math.random() - 0.48) * 50;
          const newBalance = Math.max(agent.initialBalance * 0.8, agent.balance + change);
          const newProfit = newBalance - agent.initialBalance;
          const newRoi = (newProfit / agent.initialBalance) * 100;

          // Update sparkline data
          const newSparklineData = [...agent.sparklineData.slice(1), newBalance];

          // Occasionally add a new trade
          let newTrades = agent.trades;
          if (Math.random() > 0.7) {
            const action = Math.random() > 0.5 ? '买入' : '卖出';
            const coin = COINS[Math.floor(Math.random() * COINS.length)];
            const price = coin === 'BTC' ? 65000 + Math.random() * 5000 
              : coin === 'ETH' ? 3200 + Math.random() * 400
              : 50 + Math.random() * 200;
            const amount = Math.random() * 0.5;
            const total = price * amount;

            const now = new Date();
            const newTrade: TradeRecord = {
              id: Date.now(),
              timestamp: `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`,
              action: action as '买入' | '卖出',
              coin,
              price: Math.round(price * 100) / 100,
              amount: Math.round(amount * 10000) / 10000,
              total: Math.round(total * 100) / 100,
              balanceAfter: Math.round(newBalance * 100) / 100,
              status: '已完成'
            };

            // Update previous "执行中" to "已完成"
            newTrades = agent.trades.map(t => 
              t.status === '执行中' ? { ...t, status: '已完成' as const } : t
            );
            newTrades = [newTrade, ...newTrades.slice(0, 19)];
          }

          return {
            ...agent,
            balance: Math.round(newBalance * 100) / 100,
            profit: Math.round(newProfit * 100) / 100,
            roi: Math.round(newRoi * 100) / 100,
            sparklineData: newSparklineData,
            trades: newTrades
          };
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const stopAgent = useCallback((agentId: number) => {
    setAgents(prevAgents =>
      prevAgents.map(agent =>
        agent.id === agentId ? { ...agent, status: 'completed' as const } : agent
      )
    );
  }, []);

  const exportAgentData = useCallback((agentId: number) => {
    const agent = agents.find(a => a.id === agentId);
    if (!agent) return;

    const data = {
      agent: {
        id: agent.id,
        name: agent.name,
        initialBalance: agent.initialBalance,
        finalBalance: agent.balance,
        profit: agent.profit,
        roi: agent.roi,
        testDuration: agent.testDuration,
        status: agent.status
      },
      trades: agent.trades
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `agent-${agent.id}-${agent.name}-data.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [agents]);

  const totalPnL = agents.reduce((sum, agent) => sum + agent.profit, 0);
  const totalROI = agents.length > 0 
    ? agents.reduce((sum, agent) => sum + agent.roi, 0) / agents.length 
    : 0;
  const activeAgents = agents.filter(a => a.status === 'running').length;

  return {
    agents,
    totalPnL,
    totalROI,
    activeAgents,
    stopAgent,
    exportAgentData
  };
}
