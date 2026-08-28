import React, { useState } from 'react';
import {
  PieChart,
  BarChart2,
  TrendingUp,
  Grid,
  Maximize2,
  Trash2,
  Download,
  Plus,
  Sliders,
  Database,
  Sparkles,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { BarChartComponent } from '../components/charts/BarChartComponent';
import { LineChartComponent } from '../components/charts/LineChartComponent';
import { PieChartComponent } from '../components/charts/PieChartComponent';
import { ScatterChartComponent } from '../components/charts/ScatterChartComponent';
import { HeatmapComponent } from '../components/charts/HeatmapComponent';
import { mockDatasets, mockRevenueTrends } from '../data/mockData';

export const Visualizations = () => {
  const [chartType, setChartType] = useState('line');
  const [datasetId, setDatasetId] = useState(mockDatasets[0].id);
  const [expandedChart, setExpandedChart] = useState(null);

  const renderActiveChart = (type, h = 320) => {
    switch (type) {
      case 'line': return <LineChartComponent data={mockRevenueTrends} height={h} />;
      case 'bar': return <BarChartComponent height={h} color="#1677D2" />;
      case 'pie': return <PieChartComponent height={h} />;
      case 'scatter': return <ScatterChartComponent height={h} />;
      case 'heatmap': return <HeatmapComponent />;
      default: return <BarChartComponent height={h} />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-navy-900 tracking-tight">Visualization Studio & Gallery</h2>
          <p className="text-xs text-text-secondary mt-0.5">Design, customize, and export publication-ready interactive charts</p>
        </div>
        <Badge variant="ai">Auto-Scale Renderer</Badge>
      </div>

      {/* Interactive Chart Designer Workshop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Studio Controls */}
        <Card className="lg:col-span-4 p-6 space-y-5">
          <CardHeader className="pb-2 border-b border-slate-100 mb-0">
            <CardTitle className="text-base flex items-center gap-2">
              <Sliders className="w-4 h-4 text-brand-blue" />
              Chart Configuration
            </CardTitle>
          </CardHeader>

          <Select
            label="Dataset Source"
            options={mockDatasets.map((d) => ({ label: d.fileName, value: d.id }))}
            value={datasetId}
            onChange={(e) => setDatasetId(e.target.value)}
            icon={Database}
          />

          <Select
            label="Chart Visualization Type"
            options={[
              { label: 'Line / Area Chart (Trend)', value: 'line' },
              { label: 'Bar Chart (Categorical)', value: 'bar' },
              { label: 'Pie / Donut Chart (Proportion)', value: 'pie' },
              { label: 'Scatter Plot (Correlation)', value: 'scatter' },
              { label: 'Heatmap Matrix (Multivariate)', value: 'heatmap' },
            ]}
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            icon={PieChart}
          />

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
            <span className="font-bold text-navy-900">AI Recommendation:</span>
            <p className="text-text-secondary">
              For <strong>Global_Sales_Q3.csv</strong>, a <strong className="text-brand-blue">{chartType.toUpperCase()}</strong> chart best represents numeric variance across categories.
            </p>
          </div>

          <Button
            variant="primary"
            className="w-full justify-center"
            icon={Download}
            onClick={() => alert("Chart SVG/PNG exported successfully.")}
          >
            Export Chart Graphic
          </Button>
        </Card>

        {/* Right Live Canvas */}
        <Card className="lg:col-span-8 p-6 space-y-4">
          <CardHeader>
            <div>
              <CardTitle>Live Interactive Canvas</CardTitle>
              <CardDescription>Real-time rendering of configured visualization</CardDescription>
            </div>
            <button
              onClick={() => setExpandedChart({ title: 'Configured Chart', type: chartType })}
              className="p-1.5 rounded-lg text-slate-400 hover:text-navy-900 hover:bg-slate-100"
              title="Expand Canvas"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </CardHeader>

          <div className="p-4 rounded-2xl border border-slate-100 bg-white">
            {renderActiveChart(chartType, 340)}
          </div>
        </Card>
      </div>

      {/* Saved Visualizations Gallery Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-navy-900 tracking-tight">Saved Visualization Gallery</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Quarterly Revenue Velocity', type: 'line' },
            { title: 'Regional Product Breakdown', type: 'bar' },
            { title: 'Channel ROAS Matrix', type: 'scatter' },
          ].map((item, idx) => (
            <Card key={idx} className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-navy-900 truncate">{item.title}</h4>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setExpandedChart(item)}
                    className="p-1 text-slate-400 hover:text-navy-900"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="p-2 rounded-xl border border-slate-100 bg-slate-50">
                {renderActiveChart(item.type, 180)}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Expand Modal */}
      {expandedChart && (
        <Modal
          isOpen={Boolean(expandedChart)}
          onClose={() => setExpandedChart(null)}
          title={expandedChart.title}
          subtitle="Full-resolution interactive preview"
          maxWidth="max-w-4xl"
        >
          <div className="p-4 bg-white rounded-2xl">
            {renderActiveChart(expandedChart.type, 450)}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Visualizations;
