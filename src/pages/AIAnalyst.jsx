import React, { useState } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  Database,
  ThumbsUp,
  ThumbsDown,
  Copy,
  RefreshCw,
  Download,
  MessageSquare,
  Plus,
  ArrowRight,
  TrendingUp,
  BarChart2,
  Check,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { Badge } from '../components/ui/Badge';
import { BarChartComponent } from '../components/charts/BarChartComponent';
import { mockAIChatHistory, mockSamplePrompts, mockDatasets } from '../data/mockData';

export const AIAnalyst = () => {
  const [selectedDataset, setSelectedDataset] = useState(mockDatasets[0].id);
  const [messages, setMessages] = useState(mockAIChatHistory);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const handleSendMessage = (promptText) => {
    const text = promptText || inputQuery;
    if (!text.trim()) return;

    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: `Analysis complete for "${text}". Statistical regression over dataset **Global_Sales_Q3_2026.csv** confirms a 98.4% confidence match. Enterprise renewal metrics surged by +14.8% following the Q3 product optimization rollout.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        chartData: [
          { factor: 'Enterprise Renewals', lift: 14.8 },
          { factor: 'Churn Mitigation', lift: 12.4 },
          { factor: 'Ad Efficiency', lift: 6.2 },
        ],
        confidence: '98.4% Confidence',
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-7rem)]">
      {/* Left Column: Chat History & Dataset Context */}
      <Card className="lg:col-span-3 p-4 flex flex-col h-full overflow-hidden">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-brand-blue" />
            <span className="text-xs font-bold text-navy-900 uppercase tracking-wider">Conversations</span>
          </div>
          <button
            onClick={() => setMessages([])}
            className="p-1 rounded-lg text-slate-400 hover:text-navy-900 hover:bg-slate-100"
            title="New Chat"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Dataset Context Selector */}
        <div className="py-3 border-b border-slate-100">
          <label className="block text-[11px] font-bold uppercase text-text-secondary mb-1">Active Dataset Context</label>
          <Select
            options={mockDatasets.map((d) => ({ label: d.fileName, value: d.id }))}
            value={selectedDataset}
            onChange={(e) => setSelectedDataset(e.target.value)}
            icon={Database}
            className="text-xs font-semibold"
          />
        </div>

        {/* History List */}
        <div className="flex-1 py-3 overflow-y-auto space-y-1.5 custom-scrollbar">
          {['Sales Q3 Growth Driver', 'Churn Risk Diagnostic', 'Logistics Latency Outliers'].map((chatTitle, idx) => (
            <div
              key={idx}
              className={`p-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                idx === 0 ? 'bg-brand-light text-brand-blue border border-blue-200' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <p className="truncate">{chatTitle}</p>
              <span className="text-[10px] font-normal text-slate-400">Today • 10:42 AM</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Center Column: Multi-Turn Conversation */}
      <Card className="lg:col-span-6 p-6 flex flex-col h-full overflow-hidden">
        {/* Workspace Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-brand-blue to-brand-cyan text-white flex items-center justify-center shadow-glow">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-navy-900">AI Data Analyst</h3>
              <p className="text-[11px] text-text-secondary">Powered by Autonomous Data Intelligence Engine</p>
            </div>
          </div>
          <Badge variant="ai">Context Attached</Badge>
        </div>

        {/* Conversation Stream */}
        <div className="flex-1 py-4 overflow-y-auto space-y-4 custom-scrollbar">
          {messages.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <Bot className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-sm font-bold text-navy-900">Start a Conversation with AI Analyst</p>
              <p className="text-xs text-text-secondary max-w-xs mx-auto">Ask questions in plain English to discover trends, anomalies, and statistics.</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-lg p-4 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-brand-blue to-brand-cyan text-white rounded-tr-none shadow-sm font-medium'
                      : 'bg-slate-50 border border-slate-200/90 text-navy-900 rounded-tl-none space-y-3 shadow-xs'
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.text}</div>

                  {/* Chart embed if provided */}
                  {msg.chartData && (
                    <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-navy-900">Lifting Factor Contribution</span>
                        <span className="text-[10px] text-brand-blue font-semibold">{msg.confidence}</span>
                      </div>
                      <BarChartComponent height={150} color="#1677D2" />
                    </div>
                  )}

                  {/* Actions for AI responses */}
                  {msg.sender === 'ai' && (
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200/80 text-[11px] text-slate-500">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopy(msg.id, msg.text)}
                          className="hover:text-navy-900 flex items-center gap-1"
                        >
                          {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                        </button>
                        <button className="hover:text-navy-900 flex items-center gap-1">
                          <ThumbsUp className="w-3.5 h-3.5" />
                        </button>
                        <button className="hover:text-navy-900 flex items-center gap-1">
                          <ThumbsDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button className="hover:text-brand-blue flex items-center gap-1 font-semibold">
                        <Download className="w-3.5 h-3.5" /> Export Insight
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-100 text-brand-blue p-3 rounded-2xl text-xs border border-slate-200 flex items-center gap-2 font-medium">
                <Bot className="w-4 h-4 animate-spin text-brand-cyan" />
                <span>AI Agent is running statistical regression...</span>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Chips */}
        <div className="py-2 flex items-center gap-2 overflow-x-auto custom-scrollbar">
          <span className="text-[11px] font-bold text-slate-400 shrink-0">Prompts:</span>
          {mockSamplePrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-brand-light text-[11px] text-navy-900 hover:text-brand-blue whitespace-nowrap transition-colors"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2 pt-2 border-t border-slate-100"
        >
          <input
            type="text"
            placeholder="Ask AI Analyst any question about dataset..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-navy-900 placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:bg-white"
          />
          <Button type="submit" variant="primary" icon={Send} />
        </form>
      </Card>

      {/* Right Column: AI Recommendations Panel */}
      <Card className="lg:col-span-3 p-4 flex flex-col h-full overflow-y-auto space-y-4">
        <CardHeader className="pb-2 mb-0 border-none">
          <CardTitle className="text-sm flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-brand-cyan" />
            AI Recommendations
          </CardTitle>
        </CardHeader>

        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">Recommended Chart</span>
            <p className="text-xs font-bold text-navy-900">Scatter Plot for Discount vs Churn</p>
            <p className="text-[11px] text-text-secondary">Visually highlights non-linear retention dropoffs above 25% discount.</p>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Predictive Opportunity</span>
            <p className="text-xs font-bold text-navy-900">Q4 Enterprise Forecast +18%</p>
            <p className="text-[11px] text-text-secondary">Extrapolating current organic acquisition vectors.</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AIAnalyst;
