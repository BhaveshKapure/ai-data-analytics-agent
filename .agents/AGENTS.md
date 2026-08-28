# AI Data Analytics Agent — Repository Architecture & Memory

This project is a commercial-grade, modern AI Data Analytics SaaS platform built with React 18, Vite, Tailwind CSS v4, Three.js (`@react-three/fiber`, `@react-three/drei`), Recharts, Lucide React icons, and Framer Motion.

---

## 🎨 Global Design System
- **Colors**:
  - Deep Navy: `#071A33` (`navy-900`)
  - Dark Navy: `#0B2447` (`navy-800`)
  - Primary Blue: `#1677D2` (`brand-blue`)
  - Bright Blue / Cyan: `#2F9BF4` / `#00F0FF` (`brand-cyan` / `brand-accent`)
  - Workspace Background: `#F5F9FD` (`bg-main`)
  - Card Surface: `#FFFFFF` (`bg-card`)
  - Text Primary / Secondary: `#102033` / `#64748B`
  - Status Indicators: Emerald (`#22A06B`), Amber (`#F59E0B`), Rose (`#E05252`)
- **Typography**: Plus Jakarta Sans & Inter
- **Theme & Motion**: Glassmorphic panels (`glass-panel`), custom scrollbars, subtle ambient 3D particle background (`DataParticlesBG`), page transitions (`PageTransition`), and reduced motion preference toggles.

---

## 📐 Data Story Lifecycle
**RAW DATA → DATA PROCESSING → AI ANALYSIS → VISUALIZATION → INSIGHTS → PREDICTION → REPORT**

---

## 🧭 Page Routes & Modules (`src/pages/`)
1. `/`: **Landing Page** — 3D interactive AI core hero (`AnalyticsCore3D`), scroll-driven pipeline stages, animated charts, ask-your-data AI chat preview, feature cards, and enterprise security section.
2. `/login` & `/register`: **Authentication** — Centered card with 3D AI orb background (`AIOrb3D`), input validation, and session auth context.
3. `/dashboard`: **Dashboard Overview** — Welcome banner, 5 animated KPI cards (`AnimatedNumber`), revenue trend line/area chart, revenue source breakdown pie chart, visualization gallery preview, and recent activity feed.
4. `/user-management`: **User Management** — Search/role/status filters, user table, Add User modal, and User Detail slide-over drawer.
5. `/dataset-management`: **Dataset Management & Schemas** — Drag-and-drop file uploader (CSV, XLSX, JSON) with upload progress state, dataset inventory table, and Schema Inspector drawer.
6. `/data-analysis`: **Data Analysis Workshop** — Statistical summary cards (mean, median, std, min/max), Pearson correlation matrix heatmap (`HeatmapComponent`), and automated AI insight cards.
7. `/ai-analyst`: **AI Analyst Workspace** — Multi-turn chat interface with dataset selection, typing indicator, suggested prompt chips, response actions (copy, like/dislike, export), chart previews, and right-side AI recommendations.
8. `/visualizations`: **Visualization Studio** — Interactive chart builder (Line, Bar, Pie, Scatter, Heatmap) with live Recharts rendering and saved chart gallery with full-resolution expand modal.
9. `/predictions`: **Predictions & Forecasting** — Historical vs. predicted forecast line charts, 95% confidence bands toggle, anomaly detection cards, and AI forecast executive brief.
10. `/reports`: **Executive Report Center** — Filterable reports table and multi-step report generator animation modal.
11. `/history`: **System Activity & Audit Trail** — Chronological audit timeline with event type filters.
12. `/settings`: **Settings & Preferences** — Profile details, password security, notification toggles, theme settings, and reduced-motion toggle.

---

## 💻 Tech Stack & Key Files
- `src/App.jsx`: Master router with `AuthProvider` and `ProtectedLayout`.
- `src/context/AuthContext.jsx`: Authentication & preference state.
- `src/data/mockData.js`: Centralized mock data engine for datasets, users, AI chat, forecasts, reports, and logs.
- `src/components/3d/`: `AnalyticsCore3D.jsx`, `AIOrb3D.jsx`, `DataParticlesBG.jsx`.
- `src/components/charts/`: `BarChartComponent.jsx`, `LineChartComponent.jsx`, `PieChartComponent.jsx`, `ScatterChartComponent.jsx`, `HeatmapComponent.jsx`.
- `src/components/ui/`: `Card.jsx`, `Button.jsx`, `Badge.jsx`, `Input.jsx`, `Select.jsx`, `Modal.jsx`, `Drawer.jsx`, `Table.jsx`, `Skeleton.jsx`, `Tooltip.jsx`.
- `src/components/layout/`: `Sidebar.jsx`, `Topbar.jsx`, `AppLayout.jsx`.
