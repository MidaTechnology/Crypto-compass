import { Home, Wallet, Bot, Trophy, Target, BarChart3 } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const navItems = [
  { title: "开始", url: "/", icon: Home },
  { title: "资产", url: "/assets", icon: Wallet },
  { title: "智能体", url: "/agents", icon: Bot },
  { title: "排行榜", url: "/leaderboard", icon: Trophy },
  { title: "任务", url: "/quests", icon: Target },
  { title: "模拟区", url: "/simulation", icon: BarChart3 },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">智</span>
          </div>
          <div>
            <h1 className="text-foreground font-semibold text-lg leading-tight">加密智囊团</h1>
            <p className="text-muted-foreground text-xs">Crypto Think Tank</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            end={item.url === "/"}
            className="nav-item"
            activeClassName="nav-item-active"
          >
            <item.icon className="w-5 h-5" />
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="text-xs text-muted-foreground text-center">
          v1.0.0 • 加密智囊团
        </div>
      </div>
    </aside>
  );
}
