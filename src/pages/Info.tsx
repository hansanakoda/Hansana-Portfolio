import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Eye,
  Monitor,
  Smartphone,
  Clock,
  Globe,
  MousePointerClick,
  LogOut,
  Lock,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell } from "recharts";

const CORRECT_PASSWORD = "0250";
const SESSION_KEY = "hansa_info_auth";

// Mock analytics data
const mockData = {
  totalVisitors: 1_284,
  totalSessions: 2_731,
  avgTimeOnSite: "2m 34s",
  deviceBreakdown: [
    { name: "Desktop", value: 742, fill: "hsl(210 60% 55%)" },
    { name: "Mobile", value: 489, fill: "hsl(195 50% 50%)" },
    { name: "Tablet", value: 53, fill: "hsl(240 30% 50%)" },
  ],
  topCountries: [
    { country: "Sri Lanka", visits: 612 },
    { country: "United States", visits: 203 },
    { country: "United Kingdom", visits: 127 },
    { country: "India", visits: 98 },
    { country: "Australia", visits: 74 },
  ],
  pagesVisited: [
    { page: "Home / Hero", views: 2_731 },
    { page: "About", views: 1_890 },
    { page: "Skills", views: 1_456 },
    { page: "Experience", views: 1_203 },
    { page: "Contact", views: 987 },
    { page: "Services", views: 845 },
  ],
  clickedSections: [
    { section: "Contact Cards", clicks: 423 },
    { section: "LinkedIn", clicks: 312 },
    { section: "Skills Tabs", clicks: 287 },
    { section: "Services", clicks: 198 },
    { section: "Resume Download", clicks: 156 },
  ],
  recentVisits: [
    { time: "2 min ago", location: "Colombo, LK", device: "Mobile", page: "Home" },
    { time: "8 min ago", location: "New York, US", device: "Desktop", page: "About" },
    { time: "15 min ago", location: "London, UK", device: "Desktop", page: "Skills" },
    { time: "22 min ago", location: "Mumbai, IN", device: "Mobile", page: "Contact" },
    { time: "34 min ago", location: "Sydney, AU", device: "Desktop", page: "Experience" },
  ],
};

const chartConfig = {
  views: { label: "Views", color: "hsl(210 60% 55%)" },
  clicks: { label: "Clicks", color: "hsl(195 50% 50%)" },
};

function PasswordGate({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "1");
      onSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <Lock className="text-primary" size={20} />
            </div>
            <CardTitle className="text-lg font-display tracking-wider text-foreground">
              Restricted Access
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              Enter the password to continue.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-secondary/50 border-border focus:border-primary"
                autoFocus
              />
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-destructive text-sm text-center"
                  >
                    Incorrect password
                  </motion.p>
                )}
              </AnimatePresence>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full text-muted-foreground"
                onClick={() => navigate("/")}
              >
                Back to site
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
}) {
  return (
    <Card className="border-border/50 bg-card/80">
      <CardContent className="p-4 flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <Icon className="text-primary" size={18} />
        </div>
        <div>
          <p className="text-muted-foreground text-xs">{label}</p>
          <p className="text-foreground text-xl font-semibold font-display tracking-wide">
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 sticky top-0 z-50 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="font-display text-lg tracking-wider gradient-text font-bold">
            hansa. analytics
          </h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-muted-foreground hover:text-foreground gap-2"
          >
            <LogOut size={16} />
            Logout
          </Button>
        </div>
      </header>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="container mx-auto px-4 py-8 space-y-8"
      >
        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Users} label="Total Visitors" value={mockData.totalVisitors} />
          <StatCard icon={Eye} label="Total Sessions" value={mockData.totalSessions} />
          <StatCard icon={Clock} label="Avg. Time on Site" value={mockData.avgTimeOnSite} />
          <StatCard icon={Globe} label="Top Country" value="Sri Lanka" />
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Device breakdown */}
          <Card className="border-border/50 bg-card/80">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Monitor size={14} />
                Device Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[220px] w-full">
                <PieChart>
                  <Pie
                    data={mockData.deviceBreakdown}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    strokeWidth={2}
                    stroke="hsl(225 15% 8%)"
                  >
                    {mockData.deviceBreakdown.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
              <div className="flex justify-center gap-6 mt-2">
                {mockData.deviceBreakdown.map((d) => (
                  <div key={d.name} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: d.fill }} />
                    {d.name} ({d.value})
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pages visited */}
          <Card className="border-border/50 bg-card/80">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Eye size={14} />
                Pages Visited
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[220px] w-full">
                <BarChart data={mockData.pagesVisited} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="page"
                    width={90}
                    tick={{ fill: "hsl(220 10% 60%)", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="views" fill="hsl(210 60% 55%)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top countries */}
          <Card className="border-border/50 bg-card/80">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Globe size={14} />
                Top Countries
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockData.topCountries.map((c) => (
                <div key={c.country} className="flex items-center justify-between text-sm">
                  <span className="text-foreground">{c.country}</span>
                  <span className="text-muted-foreground tabular-nums">{c.visits}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Most clicked */}
          <Card className="border-border/50 bg-card/80">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <MousePointerClick size={14} />
                Most Clicked
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockData.clickedSections.map((s) => (
                <div key={s.section} className="flex items-center justify-between text-sm">
                  <span className="text-foreground">{s.section}</span>
                  <span className="text-muted-foreground tabular-nums">{s.clicks}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent visits */}
          <Card className="border-border/50 bg-card/80">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Smartphone size={14} />
                Recent Visits
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockData.recentVisits.map((v, i) => (
                <div key={i} className="text-sm space-y-0.5">
                  <div className="flex justify-between">
                    <span className="text-foreground">{v.location}</span>
                    <span className="text-muted-foreground text-xs">{v.time}</span>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    {v.device} · {v.page}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <p className="text-center text-muted-foreground/40 text-xs pb-4">
          Mock data — connect a real analytics provider to see live metrics.
        </p>
      </motion.main>
    </div>
  );
}

export default function Info() {
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === "1"
  );

  if (!authenticated) {
    return <PasswordGate onSuccess={() => setAuthenticated(true)} />;
  }

  return <Dashboard />;
}
