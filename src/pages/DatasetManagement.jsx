import React, { useState } from 'react';
import {
  Database,
  UploadCloud,
  FileSpreadsheet,
  FileCode,
  Search,
  Eye,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Layers,
  Sparkles,
  Server,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Table } from '../components/ui/Table';
import { Drawer } from '../components/ui/Drawer';
import { mockDatasets } from '../data/mockData';

export const DatasetManagement = () => {
  const [datasets, setDatasets] = useState(mockDatasets);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSchemaDataset, setSelectedSchemaDataset] = useState(null);
  const [isSchemaDrawerOpen, setIsSchemaDrawerOpen] = useState(false);

  // File Upload State
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleSimulatedUpload = (fileObj) => {
    setIsUploading(true);
    setUploadProgress(10);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);

          // Add uploaded dataset
          const newDs = {
            id: `ds-${Date.now()}`,
            fileName: fileObj.name || 'Marketing_Telemetry_Q3.csv',
            fileType: fileObj.name?.endsWith('.xlsx') ? 'Excel' : 'CSV',
            size: `${(fileObj.size / (1024 * 1024) || 12.4).toFixed(1)} MB`,
            owner: 'Dr. Alex Vance',
            uploadDate: new Date().toISOString().split('T')[0],
            status: 'Ready',
            rowCount: 85400,
            columnCount: 16,
            schema: [
              { column: 'Record_ID', type: 'UUID', nullCount: 0, uniqueValues: 85400, example: 'rec-90182' },
              { column: 'Customer_Segment', type: 'Categorical', nullCount: 4, uniqueValues: 6, example: 'Enterprise' },
              { column: 'Metric_Score', type: 'Float64', nullCount: 0, uniqueValues: 14200, example: '94.2' },
            ],
          };
          setDatasets([newDs, ...datasets]);
          return 0;
        }
        return prev + 25;
      });
    }, 300);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleSimulatedUpload(e.dataTransfer.files[0]);
    }
  };

  const handleDelete = (id) => {
    setDatasets(datasets.filter((d) => d.id !== id));
  };

  const filteredDatasets = datasets.filter((d) =>
    d.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.owner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      key: 'fileName',
      header: 'File Name',
      sortable: true,
      render: (val, row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-light text-brand-blue flex items-center justify-center font-bold text-xs">
            {row.fileType === 'CSV' ? <FileSpreadsheet className="w-5 h-5" /> : <FileCode className="w-5 h-5" />}
          </div>
          <div>
            <p className="font-bold text-navy-900 text-xs">{val}</p>
            <p className="text-[11px] text-text-secondary">{row.size} • {row.columnCount} columns</p>
          </div>
        </div>
      ),
    },
    {
      key: 'owner',
      header: 'Owner',
      sortable: true,
      render: (val) => <span className="text-xs text-text-secondary">{val}</span>,
    },
    {
      key: 'uploadDate',
      header: 'Upload Date',
      sortable: true,
      render: (val) => <span className="text-xs text-text-secondary">{val}</span>,
    },
    {
      key: 'rowCount',
      header: 'Rows Parsed',
      sortable: true,
      render: (val) => <span className="text-xs font-bold text-navy-900">{val.toLocaleString()}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (status) => (
        <Badge variant={status === 'Ready' ? 'active' : 'pending'} dot>
          {status}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Schema & Actions',
      render: (_, row) => (
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <Button
            variant="secondary"
            size="sm"
            icon={Eye}
            onClick={() => {
              setSelectedSchemaDataset(row);
              setIsSchemaDrawerOpen(true);
            }}
          >
            View Schema
          </Button>

          <button
            onClick={() => handleDelete(row.id)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title="Delete Dataset"
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
          <h2 className="text-xl font-bold text-navy-900 tracking-tight">Dataset Management & Schema Profiler</h2>
          <p className="text-xs text-text-secondary mt-0.5">Upload CSV, Excel, or JSON datasets for automated AI analysis</p>
        </div>
        <Button variant="navy" icon={Server} onClick={() => alert("Database connector wizard triggered: PostgreSQL/Snowflake ready.")}>
          Connect Remote Database
        </Button>
      </div>

      {/* Drag & Drop Upload Zone */}
      <Card className="p-8">
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`
            border-2 border-dashed rounded-2xl p-8 text-center transition-all flex flex-col items-center justify-center cursor-pointer
            ${isDragging ? 'border-brand-blue bg-blue-50/50 scale-[1.01]' : 'border-slate-300 hover:border-brand-blue bg-slate-50/50'}
          `}
          onClick={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.csv,.xlsx,.json';
            input.onchange = (e) => handleSimulatedUpload(e.target.files[0]);
            input.click();
          }}
        >
          <div className="w-14 h-14 rounded-2xl bg-brand-light text-brand-blue flex items-center justify-center mb-4 shadow-xs">
            <UploadCloud className="w-7 h-7" />
          </div>

          <h3 className="text-base font-bold text-navy-900">
            Drag & drop dataset file here, or <span className="text-brand-blue underline">browse files</span>
          </h3>
          <p className="text-xs text-text-secondary mt-1">Supports CSV, XLSX, and JSON files up to 250 MB</p>

          {/* Uploading Progress */}
          {isUploading && (
            <div className="w-full max-w-md mt-6 space-y-2">
              <div className="flex justify-between text-xs font-bold text-navy-900">
                <span>Parsing & Profiling Schema...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-blue to-brand-cyan transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Datasets Inventory Search */}
      <Card className="p-4">
        <Input
          placeholder="Search by dataset filename or uploader name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          icon={Search}
        />
      </Card>

      {/* Table */}
      <Table
        columns={columns}
        data={filteredDatasets}
        pageSize={5}
        onRowClick={(ds) => {
          setSelectedSchemaDataset(ds);
          setIsSchemaDrawerOpen(true);
        }}
      />

      {/* Schema Inspector Drawer */}
      {selectedSchemaDataset && (
        <Drawer
          isOpen={isSchemaDrawerOpen}
          onClose={() => setIsSchemaDrawerOpen(false)}
          title={`Schema Inspector: ${selectedSchemaDataset.fileName}`}
          subtitle={`${selectedSchemaDataset.rowCount.toLocaleString()} rows • ${selectedSchemaDataset.columnCount} columns`}
          width="max-w-xl"
        >
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-light text-brand-blue text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Automated Column Data Types</span>
            </div>

            {/* Schema Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 font-bold text-navy-900 border-b border-slate-200">
                  <tr>
                    <th className="p-3">Column</th>
                    <th className="p-3">Data Type</th>
                    <th className="p-3">Nulls</th>
                    <th className="p-3">Unique</th>
                    <th className="p-3">Example</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {selectedSchemaDataset.schema.map((col, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-navy-900">{col.column}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[11px]">
                          {col.type}
                        </span>
                      </td>
                      <td className="p-3 text-slate-500">{col.nullCount}</td>
                      <td className="p-3 text-slate-500">{col.uniqueValues.toLocaleString()}</td>
                      <td className="p-3 font-mono text-[11px] text-brand-blue">{col.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Drawer>
      )}
    </div>
  );
};

export default DatasetManagement;
