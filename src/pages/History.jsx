import React, { useState } from 'react';
import {
  History as HistoryIcon,
  Search,
  Clock,
  Filter,
  Bot,
  Database,
  FileText,
  PieChart,
  Shield,
  CheckCircle2,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Badge } from '../components/ui/Badge';
import { mockActivityLogs } from '../data/mockData';

export const History = () => {
  const [logs, setLogs] = useState(mockActivityLogs);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const filteredLogs = logs.filter((l) => {
    const matchesSearch =
      l.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.target.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter ? l.type === typeFilter : true;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-navy-900 tracking-tight">System Activity & Audit History</h2>
          <p className="text-xs text-text-secondary mt-0.5">Chronological timeline of analysis runs, AI queries, dataset uploads, and security events</p>
        </div>
        <Badge variant="ai">Immutable Log Stream</Badge>
      </div>

      {/* Filter Toolbar */}
      <Card className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            placeholder="Search activity logs by user, action, or target..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={Search}
          />
          <Select
            options={[
              { label: 'All Event Types', value: '' },
              { label: 'Dataset Events', value: 'dataset' },
              { label: 'AI Agent Events', value: 'ai' },
              { label: 'Report Events', value: 'report' },
              { label: 'Visualization Events', value: 'visualization' },
              { label: 'Security & User Events', value: 'user' },
            ]}
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            placeholder="Filter by Event Type"
          />
        </div>
      </Card>

      {/* Timeline Feed */}
      <Card className="p-6">
        <div className="space-y-6 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-slate-200">
          {filteredLogs.map((log, idx) => (
            <div key={log.id} className="relative flex items-start gap-4 pl-10">
              {/* Timeline Icon Node */}
              <div className="absolute left-2 top-0.5 w-6 h-6 rounded-full bg-white border-2 border-brand-blue flex items-center justify-center text-brand-blue shadow-xs">
                <Clock className="w-3.5 h-3.5" />
              </div>

              {/* Event Content Card */}
              <div className="flex-1 p-4 rounded-2xl border border-slate-150 bg-slate-50/50 hover:bg-white hover:shadow-sm transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-navy-900">{log.user}</span>
                    <span className="text-[11px] text-slate-400">• {log.time}</span>
                  </div>
                  <p className="text-xs text-text-secondary mt-1">
                    {log.action}: <strong className="text-navy-900 font-semibold">{log.target}</strong>
                  </p>
                </div>

                <Badge variant={log.type === 'ai' ? 'ai' : 'info'}>
                  {log.badge}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default History;
