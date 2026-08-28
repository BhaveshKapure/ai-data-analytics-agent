import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  BrainCircuit,
  ArrowRight,
  Sparkles,
  Bot,
  Database,
  BarChart3,
  TrendingUp,
  FileText,
  ShieldCheck,
  Zap,
  Layers,
  Search,
  CheckCircle2,
  Lock,
  ChevronRight,
  Activity,
  Send,
} from 'lucide-react';
import { AnalyticsCore3D } from '../components/3d/AnalyticsCore3D';
import { ScrollReveal } from '../components/animations/ScrollReveal';
import { BarChartComponent } from '../components/charts/BarChartComponent';
import { LineChartComponent } from '../components/charts/LineChartComponent';
import { PieChartComponent } from '../components/charts/PieChartComponent';
import { ScatterChartComponent } from '../components/charts/ScatterChartComponent';
import { mockRevenueTrends } from '../data/mockData';

export const Landing = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [activePipelineStep, setActivePipelineStep] = useState(0);

  // Chat Demo State
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'user',
      text: 'Why did Q3 sales increase by 24% compared to Q2?',
    },
    {
      sender: 'ai',
      text: 'Q3 revenue growth (+24%) was driven primarily by strong Enterprise Renewal conversion (+14.8%) and a 12.4% reduction in churn score following our July release.',
      hasChart: true,
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pipelineStages = [
    { title: 'Data Ingestion', desc: 'Connect raw CSV, Excel, SQL, and JSON telemetry automatically.', icon: Database },
    { title: 'Automated Profiling', desc: 'Detect column data types, missing values, outliers, and schema drift.', icon: Layers },
    { title: 'AI Statistical Reasoning', desc: 'Multi-variable correlation analysis & automated anomaly scoring.', icon: Bot },
    { title: 'Visual Intelligence', desc: 'Generate executive chart galleries & interactive data dashboards.', icon: BarChart3 },
    { title: 'Predictive Forecasting', desc: 'Forecast sales, demand, and churn with 95% confidence bands.', icon: TrendingUp },
    { title: 'Executive Reporting', desc: 'Export high-impact executive PDF summaries with 1 click.', icon: FileText },
  ];

  const handleSendPrompt = (promptText) => {
    const query = promptText || chatInput;
    if (!query.trim()) return;

    const userMsg = { sender: 'user', text: query };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `Analyzing dataset for query: "${query}". Based on statistical regression, we detected a 0.88 correlation with primary growth factors.`,
          hasChart: false,
        },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-navy-950 text-white font-sans selection:bg-brand-cyan selection:text-navy-950 relative overflow-x-hidden">
      {/* 10.1 NAVBAR */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-navy-900/90 backdrop-blur-md border-b border-navy-700/80 py-3 shadow-lg'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-blue to-brand-cyan flex items-center justify-center shadow-glow">
              <BrainCircuit className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold tracking-tight text-base text-white">
                AI DATA ANALYTICS
              </span>
              <span className="text-[10px] font-bold text-brand-cyan tracking-widest uppercase">
                AGENT SAAS
              </span>
            </div>
          </NavLink>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300">
            <a href="#hero" className="hover:text-brand-cyan transition-colors">Home</a>
            <a href="#pipeline" className="hover:text-brand-cyan transition-colors">How It Works</a>
            <a href="#visuals" className="hover:text-brand-cyan transition-colors">Analytics</a>
            <a href="#ai-analyst" className="hover:text-brand-cyan transition-colors">AI Analyst</a>
            <a href="#features" className="hover:text-brand-cyan transition-colors">Features</a>
            <a href="#security" className="hover:text-brand-cyan transition-colors">Security</a>
          </div>

          <div className="flex items-center gap-3">
            <NavLink
              to="/login"
              className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors"
            >
              Sign In
            </NavLink>
            <NavLink
              to="/dashboard"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan text-white font-bold text-sm shadow-glow hover:brightness-110 transition-all flex items-center gap-2"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </NavLink>
          </div>
        </div>
      </nav>

      {/* 10.2 HERO SECTION */}
      <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-8 z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/20 border border-brand-cyan/40 text-brand-cyan text-xs font-bold uppercase tracking-wider shadow-xs">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>Next-Gen Autonomous Analytics Engine</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-none">
              Turn Your Data Into{' '}
              <span className="text-gradient-cyan">Intelligent Decisions.</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
              AI Data Analytics Agent transforms raw datasets into automated profiling, interactive visualizations, statistical forecasts, and actionable executive insights.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => navigate('/dashboard')}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-brand-blue via-brand-cyan to-blue-500 text-white font-extrabold text-base shadow-glow hover:scale-105 transition-all flex items-center gap-3 cursor-pointer"
              >
                <span>Explore Platform</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => navigate('/ai-analyst')}
                className="px-8 py-4 rounded-xl bg-navy-800 hover:bg-navy-700 text-white font-bold text-base border border-navy-600 transition-all flex items-center gap-3 cursor-pointer"
              >
                <Bot className="w-5 h-5 text-brand-cyan" />
                <span>Try AI Analyst</span>
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-navy-800">
              <div>
                <p className="text-2xl font-extrabold text-white">100x</p>
                <p className="text-xs text-slate-400 font-medium mt-1">Faster Data Profiling</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-brand-cyan">98.4%</p>
                <p className="text-xs text-slate-400 font-medium mt-1">Forecast Accuracy</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-white">Instant</p>
                <p className="text-xs text-slate-400 font-medium mt-1">NL Q&A Reasoning</p>
              </div>
            </div>
          </div>

          {/* Hero Right: 3D Interactive AI Core */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="absolute inset-0 bg-brand-cyan/20 blur-3xl rounded-full pointer-events-none" />
            <AnalyticsCore3D className="h-[480px] w-full" />
          </div>
        </div>
      </section>

      {/* 10.3 DATA PROBLEM SECTION */}
      <section className="py-20 bg-navy-900 border-y border-navy-800 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <ScrollReveal>
            <span className="text-xs font-extrabold text-brand-cyan uppercase tracking-widest">
              The Data Challenge
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-2">
              Too much data. Not enough clarity.
            </h2>
            <p className="text-slate-400 text-base max-w-2xl mx-auto mt-4">
              Modern enterprises drown in raw CSV files, SQL databases, and JSON logs. Our AI agent cleans, profiles, and explains your data in seconds.
            </p>
          </ScrollReveal>

          {/* Data Flow Diagram */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 items-center">
            {['RAW DATA', 'DATA CLEANING', 'AI ANALYSIS', 'VISUALIZATION', 'PREDICTION', 'EXECUTIVE REPORT'].map((stage, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-navy-800/80 border border-navy-700 text-center hover:border-brand-cyan/60 transition-all group"
              >
                <div className="w-8 h-8 rounded-full bg-brand-blue/20 text-brand-cyan font-bold text-xs flex items-center justify-center mx-auto mb-2 group-hover:bg-brand-cyan group-hover:text-navy-950 transition-colors">
                  {idx + 1}
                </div>
                <p className="text-xs font-bold text-slate-200">{stage}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10.4 AI PROCESSING PIPELINE SECTION */}
      <section id="pipeline" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-extrabold text-brand-cyan uppercase tracking-widest">
            Autonomous Pipeline
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-2">
            End-to-End AI Analytics Story
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Pipeline Interactive Tabs */}
          <div className="lg:col-span-5 space-y-3">
            {pipelineStages.map((stage, idx) => {
              const Icon = stage.icon;
              const isSelected = activePipelineStep === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActivePipelineStep(idx)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                    isSelected
                      ? 'bg-gradient-to-r from-navy-800 to-navy-700 border-brand-cyan text-white shadow-glow'
                      : 'bg-navy-900/60 border-navy-800 text-slate-400 hover:bg-navy-800/60'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-brand-blue text-white' : 'bg-navy-800 text-slate-400'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{stage.title}</h3>
                    <p className="text-xs text-slate-300 mt-1">{stage.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pipeline Stage Preview */}
          <div className="lg:col-span-7 p-8 rounded-3xl bg-navy-900 border border-navy-700 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 bg-brand-cyan/10 rounded-bl-2xl border-l border-b border-brand-cyan/20 text-brand-cyan text-xs font-bold">
              Stage {activePipelineStep + 1} Active
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-brand-blue/20 flex items-center justify-center text-brand-cyan font-bold text-lg">
                  0{activePipelineStep + 1}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{pipelineStages[activePipelineStep].title}</h3>
                  <p className="text-xs text-slate-400">Automated AI Task execution status: <span className="text-emerald-400 font-semibold">Complete</span></p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-navy-950 font-mono text-xs text-emerald-400 border border-navy-800 space-y-2">
                <p>&gt; initializing_engine({pipelineStages[activePipelineStep].title.toLowerCase().replace(/\s+/g, '_')})...</p>
                <p>&gt; status: 142,500 records parsed cleanly</p>
                <p>&gt; confidence: 99.2% | zero critical anomaly vectors</p>
              </div>

              {/* Sample Chart Preview */}
              <div className="pt-2">
                <BarChartComponent height={220} color="#2F9BF4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10.5 ANALYTICS VISUALIZATION SECTION */}
      <section id="visuals" className="py-24 bg-navy-900 border-y border-navy-800 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center">
            <span className="text-xs font-extrabold text-brand-cyan uppercase tracking-widest">
              Visual Intelligence
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-2">
              From Data to Visual Intelligence
            </h2>
            <p className="text-slate-400 text-base max-w-xl mx-auto mt-3">
              Generate interactive, publication-ready charts automatically tuned to your dataset's statistical distribution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-navy-950 border border-navy-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">Revenue & Forecast Trends</h3>
                <span className="text-xs text-brand-cyan font-semibold">Area Chart</span>
              </div>
              <LineChartComponent data={mockRevenueTrends} height={250} />
            </div>

            <div className="p-6 rounded-2xl bg-navy-950 border border-navy-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">Revenue Source Breakdown</h3>
                <span className="text-xs text-brand-cyan font-semibold">Donut Chart</span>
              </div>
              <PieChartComponent height={250} />
            </div>
          </div>
        </div>
      </section>

      {/* 10.6 ASK YOUR DATA SECTION */}
      <section id="ai-analyst" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-extrabold text-brand-cyan uppercase tracking-widest">
              Natural Language Q&A
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              Ask your data questions in plain English.
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              No SQL or complex Python code required. Simply type your question and let our AI Analyst parse schemas, calculate stats, and write explanations.
            </p>

            {/* Query Chips */}
            <div className="space-y-2 pt-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Try example queries:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Why did Q3 sales increase?",
                  "Detect anomalies in logistics",
                  "Forecast Q4 revenue",
                  "Find top 5 customer segments",
                ].map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendPrompt(chip)}
                    className="px-3 py-1.5 rounded-lg bg-navy-800 hover:bg-brand-blue text-xs text-slate-300 hover:text-white border border-navy-700 transition-all cursor-pointer"
                  >
                    "{chip}"
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Chat Window */}
          <div className="lg:col-span-7 p-6 rounded-3xl bg-navy-900 border border-navy-700 shadow-2xl flex flex-col h-[480px]">
            <div className="flex items-center justify-between pb-4 border-b border-navy-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-cyan/20 text-brand-cyan flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">AI Data Analyst</h3>
                  <p className="text-[10px] text-emerald-400 font-semibold">Online & Connected to Global_Sales_Q3.csv</p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 py-4 overflow-y-auto space-y-4 custom-scrollbar">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-md p-4 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-brand-blue text-white rounded-tr-none'
                        : 'bg-navy-800 text-slate-200 border border-navy-700 rounded-tl-none space-y-3'
                    }`}
                  >
                    <p>{msg.text}</p>
                    {msg.hasChart && (
                      <div className="pt-2 border-t border-navy-700">
                        <BarChartComponent height={140} color="#2F9BF4" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-navy-800 text-brand-cyan p-3 rounded-2xl text-xs border border-navy-700 flex items-center gap-2">
                    <Bot className="w-4 h-4 animate-spin" />
                    <span>AI Agent is analyzing dataset schema...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendPrompt();
              }}
              className="flex items-center gap-2 pt-3 border-t border-navy-800"
            >
              <input
                type="text"
                placeholder="Ask any question about your data..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 bg-navy-950 border border-navy-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-brand-blue hover:bg-brand-cyan text-white transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 10.7 FEATURES MATRIX */}
      <section id="features" className="py-24 bg-navy-900 border-y border-navy-800 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center">
            <span className="text-xs font-extrabold text-brand-cyan uppercase tracking-widest">
              Core Capabilities
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-2">
              Everything Needed for Autonomous Analytics
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'AI-Powered Analysis', desc: 'Automated statistical summary, mean, std, and min/max profiling.', icon: Bot },
              { title: 'Automated Data Profiling', desc: 'Detect missing values, column data types, and schema drift.', icon: Layers },
              { title: 'Natural Language Queries', desc: 'Ask questions in plain English and receive instant AI answers.', icon: Search },
              { title: 'Interactive Visualizations', desc: 'Custom bar, line, pie, scatter, and heatmap visualization gallery.', icon: BarChart3 },
              { title: 'Predictive Analytics', desc: 'Machine learning forecasting with 95% confidence bands.', icon: TrendingUp },
              { title: 'Anomaly Detection', desc: 'Identify statistical outliers and unexpected revenue spikes.', icon: Zap },
              { title: 'Automated Reports', desc: 'Generate multi-page PDF executive summaries with 1 click.', icon: FileText },
              { title: 'Analysis History', desc: 'Complete audit log and conversation history tracking.', icon: Activity },
            ].map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-navy-950 border border-navy-800 hover:border-brand-cyan/50 transition-all hover:-translate-y-1 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-blue/20 text-brand-cyan flex items-center justify-center mb-4 group-hover:bg-brand-cyan group-hover:text-navy-950 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{feat.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10.10 SECURITY SECTION */}
      <section id="security" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 border border-navy-700 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Enterprise Data Governance</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              Bank-Grade Security & Isolation
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Your datasets remain strictly isolated in memory. We support role-based access control (RBAC), end-to-end encryption, and persistent audit logs.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2 text-xs font-semibold text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Dataset Isolation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Role-Based Access (RBAC)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Full Audit Trail History</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Encrypted Memory Storage</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-48 h-48 rounded-full bg-brand-blue/10 border-4 border-brand-cyan/30 flex items-center justify-center relative shadow-glow">
              <Lock className="w-20 h-20 text-brand-cyan animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* 10.11 FINAL CTA */}
      <section className="py-20 bg-gradient-to-b from-navy-900 to-navy-950 border-t border-navy-800 text-center px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white">
            Ready to Discover What Your Data Is Telling You?
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            Join thousands of analysts and enterprise leaders leveraging autonomous AI data intelligence.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan text-white font-extrabold text-base shadow-glow hover:scale-105 transition-all cursor-pointer"
            >
              Start Analyzing Now
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 bg-navy-950 border-t border-navy-900 text-center text-xs text-slate-500">
        <p>© 2026 AI Data Analytics Agent. Autonomous Enterprise Data SaaS Platform.</p>
      </footer>
    </div>
  );
};

export default Landing;
