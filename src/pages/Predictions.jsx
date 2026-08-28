import React, { useState } from 'react';
import {
  TrendingUp,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { LineChartComponent } from '../components/charts/LineChartComponent';
import { mockPredictions, mockRevenueTrends } from '../data/mockData';

export const Predictions = () => {
  const [showConfidence, setShowConfidence] = useState(true);

  const forecastCards = [
    { title: 'Q4 Revenue Forecast', value: '$450,000', change: '+22.4%', confidence: '98.4%', status: 'High Confidence' },
    { title: 'Demand Growth Rate', value: '+18.2%', change: '+4.1%', confidence: '96.2%', status: 'Stable' },
    { title: 'Customer Churn Risk', value: '4.2%', change: '-3.8%', confidence: '94.8%', status: 'Mitigated' },
    { title: 'Logistics Anomaly Score', value: '0.02', change: 'Normal', confidence: '99.1%', status: 'Optimal' },
  ];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 text-white border border-navy-700 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/20 text-brand-cyan text-xs font-bold border border-brand-cyan/40">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Predictive Intelligence Engine v4.8</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Predictions & Machine Learning Forecasting
          </h2>
          <p className="text-slate-300 text-xs md:text-sm max-w-xl">
            Machine learning extrapolation with 95% confidence bands and automated anomaly boundary checking.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant={showConfidence ? 'primary' : 'outline'}
            onClick={() => setShowConfidence(!showConfidence)}
          >
            {showConfidence ? 'Confidence Bands On' : 'Show Confidence Bands'}
          </Button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {forecastCards.map((card, idx) => (
          <Card key={idx} className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">{card.title}</span>
              <Badge variant="ai">{card.confidence}</Badge>
            </div>
            <div className="text-2xl font-extrabold text-navy-900 mt-2 tracking-tight">{card.value}</div>
            <div className="flex items-center justify-between mt-2 text-xs font-semibold">
              <span className="text-emerald-600 flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" />
                {card.change}
              </span>
              <span className="text-slate-400 font-medium">{card.status}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Historical vs Predicted Chart */}
      <Card className="p-6">
        <CardHeader>
          <div>
            <CardTitle>Historical Performance vs. AI Predicted Boundaries</CardTitle>
            <CardDescription>Dashed line denotes machine learning extrapolation beyond present month</CardDescription>
          </div>
          <Badge variant="active">Live Forecast Model</Badge>
        </CardHeader>

        <LineChartComponent data={mockRevenueTrends} predictKey="predicted" height={360} />
      </Card>

      {/* Anomaly Detection & AI Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-7 p-6 space-y-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              Automated Anomaly Detection
            </CardTitle>
            <CardDescription>Outliers and unexpected statistical deviations</CardDescription>
          </CardHeader>

          <div className="space-y-3">
            {[
              { date: '2026-08-14', title: 'Ad Spend ROAS Outlier (+3.4x)', severity: 'Low Risk', desc: 'Search ad campaign converted at 3.4x expected baseline.' },
              { date: '2026-08-10', title: 'Telemetry Latency Spike (42.8ms)', severity: 'Resolved', desc: 'Resolved automatically via load-balancer queue adjustment.' },
            ].map((anom, idx) => (
              <div key={idx} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-navy-900">{anom.title}</h4>
                    <span className="text-[10px] text-slate-400 font-mono">{anom.date}</span>
                  </div>
                  <p className="text-xs text-text-secondary mt-1">{anom.desc}</p>
                </div>
                <Badge variant={idx === 0 ? 'active' : 'info'}>{anom.severity}</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* AI Forecast Summary Card */}
        <Card className="lg:col-span-5 p-6 space-y-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-cyan" />
              AI Forecast Executive Brief
            </CardTitle>
          </CardHeader>

          <div className="p-4 rounded-2xl bg-navy-900 text-white text-xs space-y-3">
            <p className="leading-relaxed">
              Extrapolating 142,500 historical rows predicts a <strong>22.4% net revenue expansion</strong> through Q4 2026 with a tight standard error band of <strong>± 3.2%</strong>.
            </p>
            <div className="pt-2 border-t border-navy-700 space-y-1 font-mono text-[11px] text-brand-cyan">
              <p>&gt; confidence_interval: [ $410k , $450k ]</p>
              <p>&gt; model_fit_R2: 0.9842</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Predictions;
