import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Download,
  Eye,
  Trash2,
  Sparkles,
  Loader2,
  CheckCircle2,
  FileSpreadsheet,
  Calendar,
  Database,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { Badge } from '../components/ui/Badge';
import { Table } from '../components/ui/Table';
import { Modal } from '../components/ui/Modal';
import { mockReports, mockDatasets } from '../data/mockData';

export const Reports = () => {
  const [reports, setReports] = useState(mockReports);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState(mockDatasets[0].id);
  const [reportType, setReportType] = useState('Executive AI Brief');

  // Multi-step Generation Animation State
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);

  const generationSteps = [
    'Parsing & validating raw dataset schema...',
    'Running multi-variable statistical profiling...',
    'Generating AI executive insight summaries...',
    'Formatting high-impact PDF layout...',
    'Report generation complete!',
  ];

  const handleCreateReport = (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setGenerationStep(0);

    const stepInterval = setInterval(() => {
      setGenerationStep((prev) => {
        if (prev >= 4) {
          clearInterval(stepInterval);
          setTimeout(() => {
            setIsGenerating(false);
            setIsGenerateModalOpen(false);

            const dsObj = mockDatasets.find((d) => d.id === selectedDataset) || mockDatasets[0];
            const newRep = {
              id: `rep-${Date.now()}`,
              name: `Executive_${reportType.replace(/\s+/g, '_')}_${Date.now().toString().slice(-4)}.pdf`,
              dataset: dsObj.fileName,
              type: reportType,
              createdBy: 'Dr. Alex Vance',
              createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
              status: 'Completed',
              fileSize: '3.6 MB',
            };
            setReports([newRep, ...reports]);
          }, 600);
          return 4;
        }
        return prev + 1;
      });
    }, 700);
  };

  const columns = [
    {
      key: 'name',
      header: 'Report Name',
      sortable: true,
      render: (val, row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-light text-brand-blue flex items-center justify-center">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-navy-900 text-xs">{val}</p>
            <p className="text-[11px] text-text-secondary">{row.type} • {row.fileSize}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'dataset',
      header: 'Source Dataset',
      sortable: true,
      render: (val) => <span className="text-xs text-text-secondary">{val}</span>,
    },
    {
      key: 'createdBy',
      header: 'Created By',
      sortable: true,
      render: (val) => <span className="text-xs text-text-secondary">{val}</span>,
    },
    {
      key: 'createdAt',
      header: 'Created At',
      sortable: true,
      render: (val) => <span className="text-xs text-text-secondary">{val}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (status) => (
        <Badge variant="active" dot>
          {status}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (_, row) => (
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <Button
            variant="secondary"
            size="sm"
            icon={Download}
            onClick={() => alert(`Downloading ${row.name}...`)}
          >
            Download PDF
          </Button>

          <button
            onClick={() => setReports(reports.filter((r) => r.id !== row.id))}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title="Delete Report"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-navy-900 tracking-tight">Executive Report Center</h2>
          <p className="text-xs text-text-secondary mt-0.5">Generate, view, and export PDF executive summaries powered by AI</p>
        </div>
        <Button variant="primary" icon={Plus} onClick={() => setIsGenerateModalOpen(true)}>
          Create New Report
        </Button>
      </div>

      {/* Reports Table */}
      <Table columns={columns} data={reports} pageSize={5} />

      {/* Generate Report Modal */}
      <Modal
        isOpen={isGenerateModalOpen}
        onClose={() => !isGenerating && setIsGenerateModalOpen(false)}
        title="AI Executive Report Generator"
        subtitle="Configure and compile an automated statistical summary PDF"
      >
        {!isGenerating ? (
          <form onSubmit={handleCreateReport} className="space-y-4">
            <Select
              label="Select Source Dataset"
              options={mockDatasets.map((d) => ({ label: d.fileName, value: d.id }))}
              value={selectedDataset}
              onChange={(e) => setSelectedDataset(e.target.value)}
              icon={Database}
            />

            <Select
              label="Choose Report Template"
              options={[
                'Executive AI Brief',
                'Anomaly & Retention Report',
                'Predictive Forecast Summary',
                'Full Statistical Profiling PDF',
              ]}
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            />

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <span className="font-bold text-navy-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-brand-blue" />
                Included AI Content:
              </span>
              <p className="text-text-secondary">
                Executive summary, automated KPI charts, multi-variable correlation heatmaps, and 95% confidence predictions.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <Button variant="outline" onClick={() => setIsGenerateModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" icon={Sparkles}>
                Generate Executive Report
              </Button>
            </div>
          </form>
        ) : (
          <div className="py-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-brand-light text-brand-blue flex items-center justify-center mx-auto shadow-glow">
              {generationStep === 4 ? (
                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              ) : (
                <Loader2 className="w-8 h-8 animate-spin text-brand-blue" />
              )}
            </div>

            <div className="space-y-2">
              <h4 className="text-base font-bold text-navy-900">
                {generationSteps[generationStep]}
              </h4>
              <p className="text-xs text-text-secondary">Please wait while the AI agent compiles your report...</p>
            </div>

            {/* Step Indicators */}
            <div className="flex justify-center items-center gap-2 max-w-xs mx-auto">
              {[0, 1, 2, 3, 4].map((stepIdx) => (
                <div
                  key={stepIdx}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    stepIdx <= generationStep ? 'w-8 bg-brand-blue' : 'w-2 bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Reports;
