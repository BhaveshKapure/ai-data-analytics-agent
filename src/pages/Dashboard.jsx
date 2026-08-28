import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Database,
  BarChart2,
  Bot,
  FileText,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
  ChevronRight,
  Clock,
  Plus,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { AnimatedNumber } from '../components/animations/AnimatedNumber';
import { LineChartComponent } from '../components/charts/LineChartComponent';
import { PieChartComponent } from '../components/charts/PieChartComponent';
import { BarChartComponent } from '../components/charts/BarChartComponent';
import { ScatterChartComponent } from '../components/charts/ScatterChartComponent';
import { mockStats, mockRevenueTrends, mockRevenueSources, mockActivityLogs, mockDatasets } from '../data/mockData';

export const Dashboard = () => {
  const navigate = useNavigate();

  const getIcon = (name) => {
    switch (name) {
      case 'Users': return Users;
      case 'Database': return Database;
      case 'BarChart2': return BarChart2;
      case 'Bot': return Bot;
      case 'FileText': return FileText;
      default: return TrendingUp;
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Welcome Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 text-white shadow-xl border border-navy-700 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/30 text-brand-cyan text-xs font-bold border border-brand-cyan/40">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Autonomous Engine Active</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Welcome back, Dr. Alex Vance
          </h2>
          <p className="text-slate-300 text-xs md:text-sm max-w-xl">
            4 datasets processed cleanly today. Automated statistical profiling detected 3 high-impact correlation trends in <strong className="text-brand-cyan">Global_Sales_Q3.csv</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3 z-10">
          <Button
            variant="primary"
            icon={Plus}
            onClick={() => navigate('/dataset-management')}
          >
            Upload Dataset
          </Button>
          <Button
            variant="navy"
            icon={Bot}
            onClick={() => navigate('/ai-analyst')}
          >
            Ask AI Analyst
          </Button>
        </div>
      </div>

      {/* 5 Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {mockStats.map((stat) => {
          const Icon = getIcon(stat.iconName);
          return (
            <Card key={stat.id} className="p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                  {stat.title}
                </span>
                <div className="w-8 h-8 rounded-xl bg-brand-light text-brand-blue flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="mt-4">
                <div className="text-2xl font-extrabold text-navy-900 tracking-tight">
                  <AnimatedNumber value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </div>
                <div className="flex items-center gap-1.5 mt-1.5 text-xs font-semibold text-emerald-600">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>{stat.change}</span>
                  <span className="text-text-secondary font-normal text-[11px] ml-1">{stat.description}</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main Analytics Grid: Line/Area & Revenue Source Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-8 p-6">
          <CardHeader>
            <div>
              <CardTitle>Quarterly Revenue & Predictive AI Trend</CardTitle>
              <CardDescription>Actual revenue performance overlaid with AI forecast model</CardDescription>
            </div>
            <Badge variant="ai">AI Model v4.2 Active</Badge>
          </CardHeader>
          <LineChartComponent data={mockRevenueTrends} height={320} />
        </Card>

        <Card className="lg:col-span-4 p-6">
          <CardHeader>
            <div>
              <CardTitle>Revenue Source Breakdown</CardTitle>
              <CardDescription>Percentage share by product module</CardDescription>
            </div>
          </CardHeader>
          <PieChartComponent data={mockRevenueSources} height={320} />
        </Card>
      </div>

      {/* Visualizations Gallery Overview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-navy-900 tracking-tight">Visualizations Showcase</h3>
          <Button
            variant="ghost"
            size="sm"
            icon={ChevronRight}
            iconPosition="right"
            onClick={() => navigate('/visualizations')}
          >
            Open Visualization Studio
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Regional Quarterly Sales</CardTitle>
              <Badge variant="info">Bar Chart</Badge>
            </CardHeader>
            <BarChartComponent height={240} />
          </Card>

          <Card className="p-6">
            <CardHeader>
              <CardTitle>Ad Spend vs Conversions ROAS</CardTitle>
              <Badge variant="info">Scatter Plot</Badge>
            </CardHeader>
            <ScatterChartComponent height={240} />
          </Card>
        </div>
      </div>

      {/* Recent Activity & Active Datasets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-7 p-6">
          <CardHeader>
            <CardTitle>Recent Activity Feed</CardTitle>
            <CardDescription>Live audit trail of system events & AI runs</CardDescription>
          </CardHeader>

          <div className="space-y-4">
            {mockActivityLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-slate-100">
                <div className="p-2 rounded-xl bg-brand-light text-brand-blue mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-navy-900">{log.user}</p>
                    <span className="text-[11px] text-slate-400 font-medium">{log.time}</span>
                  </div>
                  <p className="text-xs text-text-secondary mt-0.5">{log.action}: <strong className="text-navy-900 font-semibold">{log.target}</strong></p>
                </div>
                <Badge variant={log.type === 'ai' ? 'ai' : 'info'}>{log.badge}</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Active Datasets Inventory Preview */}
        <Card className="lg:col-span-5 p-6">
          <CardHeader>
            <CardTitle>Active Datasets Inventory</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/dataset-management')}
            >
              View All
            </Button>
          </CardHeader>

          <div className="space-y-3">
            {mockDatasets.map((ds) => (
              <div key={ds.id} className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:shadow-xs transition-all flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center font-bold text-xs">
                    {ds.fileType}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-navy-900 truncate max-w-[160px]">{ds.fileName}</p>
                    <p className="text-[11px] text-text-secondary">{ds.rowCount.toLocaleString()} rows • {ds.size}</p>
                  </div>
                </div>
                <Badge variant={ds.status === 'Ready' ? 'active' : 'pending'}>{ds.status}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
