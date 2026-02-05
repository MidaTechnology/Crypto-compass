import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SimulationStats } from "@/components/simulation/SimulationStats";
import { AgentSimulationCard, SimulatedAgent } from "@/components/simulation/AgentSimulationCard";
import { AgentDetailPanel } from "@/components/simulation/AgentDetailPanel";
import { useSimulationData } from "@/hooks/useSimulationData";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function Simulation() {
  const { agents, totalPnL, totalROI, activeAgents, stopAgent, exportAgentData } = useSimulationData();
  const [selectedAgent, setSelectedAgent] = useState<SimulatedAgent | null>(null);

  const handleStopAgent = (agentId: number) => {
    stopAgent(agentId);
    toast.success("模拟测试已停止");
  };

  const handleExportData = (agentId: number) => {
    exportAgentData(agentId);
    toast.success("数据导出成功");
  };

  const handleSelectAgent = (agent: SimulatedAgent) => {
    // Find the latest version of the agent from the state
    const currentAgent = agents.find(a => a.id === agent.id);
    setSelectedAgent(currentAgent || agent);
  };

  // Keep selected agent data in sync
  const currentSelectedAgent = selectedAgent 
    ? agents.find(a => a.id === selectedAgent.id) || selectedAgent
    : null;

  return (
    <DashboardLayout>
      {/* Page Title */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-semibold text-foreground mb-2">模拟区</h1>
        <p className="text-muted-foreground">在安全环境中测试您的交易策略，初始资金 10,000 USDT</p>
      </motion.div>

      {/* Stats Overview */}
      <SimulationStats 
        activeAgents={activeAgents}
        totalPnL={totalPnL}
        totalROI={totalROI}
      />

      {/* Agent List */}
      <div className="mb-4">
        <h2 className="text-lg font-medium text-foreground">智能体测试列表</h2>
        <p className="text-sm text-muted-foreground">点击查看详细任务明细和收益曲线</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {agents.map((agent, index) => (
          <AgentSimulationCard
            key={agent.id}
            agent={agent}
            index={index}
            onSelect={handleSelectAgent}
            onStop={handleStopAgent}
            onExport={handleExportData}
          />
        ))}
      </div>

      {/* Detail Panel */}
      {currentSelectedAgent && (
        <AgentDetailPanel
          agent={currentSelectedAgent}
          onClose={() => setSelectedAgent(null)}
        />
      )}
    </DashboardLayout>
  );
}
