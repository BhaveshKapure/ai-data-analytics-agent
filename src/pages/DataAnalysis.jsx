import React, { useState } from 'react';
import {
  BarChart3,
  Sparkles,
  Zap,
  TrendingUp,
  Activity,
  Layers,
  Database,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { Badge } from '../components/ui/Badge';
import { HeatmapComponent } from '../components/charts/HeatmapComponent';
import { BarChartComponent } from '../components/charts/BarChartComponent';
import { mockDatasets } from '../data/mockData';

export const DataAnalysis = () => {
  const [selectedDatasetId, setSelectedDatasetId] = useState(mockDatasets[0].id);
  const [isProfiling, setIsProfiling] = useState(false);
  const [activeTab, setActiveTab] = useState('summary');

  const selectedDs = mockDatasets.find((d) => d.id === selectedDatasetId) || mockDatasets[0];

  const handleRunProfiling = () => {
    setIsProfiling(true);
    setTimeout(() => {
      setIsProfiling(false);
    }, 900);
  };

  const statisticalMetrics = [
    { label: 'Mean Sales Amount', value: '$2,190.45', change: '+8.4%', std: '± $340.20' },
    { label: 'Median Sales Amount', value: '$1,850.00', change: '+5.2%', std: 'N/A' },
    { label: 'Standard Deviation', value: '428.12', change: '-2.1%', std: 'Low Variance' },
    { label: 'Min / Max Range', value: '$120 - $14,800', change: 'Normal', std: '0.04 Outliers' },
  ];

  const aiInsights = [
    {
      title: 'Strong ROAS to Sales Amount Correlation (r = +0.88)',
      category: 'Correlation Discovery',
      description: 'Ad Spend on search channels shows a 0.88 linear coefficient with enterprise customer renewal conversion. Reallocating 15% budget is recommended.',
      impact: 'High Impact',
    },
    {
      title: 'Discount Rate Anomaly Threshold (> 25%)',
      category: 'Anomaly Warning',
      description: 'Transactions with discount rates over 25% exhibit a 3.4x higher churn rate within 60 days. Recommend capping self-service discount codes.',
      impact: 'Action Required',
    },
    {
      title: 'Logistics Telemetry Latency Spike Detected',
      category: 'System Health',
      description: 'Node e4a9 exhibited a temporary latency jump to 42.8ms during peak batch execution. Auto-recovery cleared queue.',
      impact: 'Resolved',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Workshop Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-navy-900 tracking-tight">Data Analysis Workshop</h2>
            <Badge variant="ai">AI Engine Active</Badge>
          </div>
          <p className="text-xs text-text-secondary">Run statistical profiling, correlation heatmaps, and automated AI insight generation</p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Select
            options={mockDatasets.map((d) => ({ label: d.fileName, value: d.id }))}
            value={selectedDatasetId}
            onChange={(e) => setSelectedDatasetId(e.target.value)}
            icon={Database}
            className="w-64 text-xs font-semibold"
          />

          <Button
            variant="primary"
            icon={Sparkles}
            isLoading={isProfiling}
            onClick={handleRunProfiling}
          >
            Run Profiling
          </Button>
        </div>
      </div>

      {/* Statistical Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statisticalMetrics.map((metric, idx) => (
          <Card key={idx} className="p-5">
            <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">{metric.label}</span>
            <div className="text-2xl font-extrabold text-navy-900 mt-2 tracking-tight">{metric.value}</div>
            <div className="flex items-center justify-between mt-2 text-xs">
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" />
                {metric.change}
              </span>
              <span className="text-slate-400 font-medium">{metric.std}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Correlation Matrix & AI Insights Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Heatmap Correlation Matrix */}
        <Card className="lg:col-span-7 p-6">
          <CardHeader>
            <div>
              <CardTitle>Feature Correlation Matrix</CardTitle>
              <CardDescription>Multi-variable Pearson correlation coefficients (r)</CardDescription>
            </div>
            <Badge variant="info">Matrix Heatmap</Badge>
          </CardHeader>

          <HeatmapComponent />
        </Card>

        {/* AI Insight Discovery Cards */}
        <Card className="lg:col-span-5 p-6 space-y-4">
          <CardHeader>
            <div>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-cyan" />
                Automated AI Insights
              </CardTitle>
              <CardDescription>Discovered patterns from {selectedDs.fileName}</CardDescription>
            </div>
          </CardHeader>

          <div className="space-y-3">
            {aiInsights.map((insight, idx) => (
              <div key={idx} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2 hover:bg-white transition-all">
                <div className="flex items-center justify-between">
                  <Badge variant={idx === 0 ? 'active' : idx === 1 ? 'warning' : 'info'}>
                    {insight.category}
                  </Badge>
                  <span className="text-[11px] font-bold text-brand-blue">{insight.impact}</span>
                </div>
                <h4 className="text-xs font-bold text-navy-900 leading-snug">{insight.title}</h4>
                <p className="text-xs text-text-secondary leading-relaxed">{insight.description}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bar Distribution Overview */}
      <Card className="p-6">
        <CardHeader>
          <CardTitle>Statistical Distribution Bar Chart</CardTitle>
          <CardDescription>Frequency metrics parsed from active dataset</CardDescription>
        </CardHeader>
        <BarChartComponent height={260} />
      </Card>
    </div>
  );
};

export default DataAnalysis;
