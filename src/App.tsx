// src/App.tsx
import React from 'react';
// Components & UI Icons
import { 
  Activity, 
  Zap, 
  ShieldCheck, 
  Pause, 
  Play, 
  BarChart3, 
  AlertTriangle 
} from 'lucide-react';

// State & Logic Hooks
import { useDataStore } from './store';
import { useDataStream } from './hooks/useDataStream';

/**
 * High-Frequency Engineering Dashboard
 * Demonstrates: Throttled State Updates, Visual Regression for Anomalies, 
 * and Memory-Efficient Data Rendering.
 */
export default function App() {
  // Initialize the data stream logic
  useDataStream();

  // Pull state from Zustand
  const { points, isPaused, togglePause } = useDataStore();
  
  // Derived state for the UI
  const latest = points[points.length - 1];
  
  // Calculate Average Latency (Senior Flex: showing data processing in the UI)
  const avgLatency = points.length > 0 
    ? (points.reduce((acc, p) => acc + p.latency, 0) / points.length).toFixed(0)
    : "0";

  // Check for critical system load (> 80%)
  const isCritical = latest && latest.value > 80;

  return (
    <div className="h-screen w-screen p-6 flex flex-col gap-6 select-none">
      
      {/* HEADER SECTION */}
      <header className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-4">
          <div className={`p-2 rounded-lg transition-colors ${isCritical ? 'bg-red-500/20' : 'bg-emerald-500/10'}`}>
            <Activity className={isCritical ? 'text-red-500' : 'text-emerald-400'} size={28} />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-widest italic text-slate-100">VULCAN_ENGINE_v4</h1>
            <p className="text-[10px] text-slate-500 font-bold flex items-center gap-2">
              CORE_STATUS: 
              <span className={isPaused ? 'text-orange-500' : 'text-emerald-500'}>
                {isPaused ? '○ HALTED' : '● ACTIVE_STREAM'}
              </span>
            </p>
          </div>
        </div>
        
        <button 
          onClick={togglePause}
          className="flex items-center gap-2 bg-slate-900 border border-slate-800 hover:border-slate-700 px-5 py-2.5 rounded text-xs font-bold text-slate-300 transition-all active:scale-95"
        >
          {isPaused ? <Play size={14} fill="currentColor" /> : <Pause size={14} fill="currentColor" />}
          {isPaused ? 'RESUME_SYSTEM' : 'PAUSE_SYSTEM'}
        </button>
      </header>

      {/* METRICS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard 
          title="System Load" 
          value={`${latest?.value.toFixed(1) || 0}%`} 
          icon={<Zap size={16}/>} 
          color={isCritical ? "text-red-500 animate-pulse" : "text-yellow-400"} 
        />
        
        <MetricCard 
          title="Avg Latency" 
          value={`${avgLatency}ms`} 
          icon={<Activity size={16}/>} 
          color={Number(avgLatency) > 40 ? "text-orange-400" : "text-blue-400"} 
        />
        
        <MetricCard 
          title="Node Security" 
          value="ENCRYPTED" 
          icon={<ShieldCheck size={16}/>} 
          color="text-emerald-400" 
        />
      </div>

      {/* MAIN VISUALIZER */}
      <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-8 flex flex-col relative overflow-hidden shadow-inner">
        
        {/* Engineering Grid Background Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ 
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: '32px 32px' 
          }} 
        />
        
        <div className="flex justify-between items-center mb-10 z-10">
          <h2 className="text-xs text-slate-500 font-bold flex items-center gap-2 uppercase tracking-widest">
            <BarChart3 size={14} /> Kernel_Buffer_Feed
          </h2>
          
          {isCritical && (
            <div className="flex items-center gap-2 text-[10px] bg-red-500/10 text-red-500 border border-red-500/30 px-3 py-1.5 rounded-full font-black animate-bounce">
              <AlertTriangle size={12} /> CRITICAL_LOAD_OVERFLOW
            </div>
          )}
        </div>
        
        {/* The Bars */}
        <div className="flex-1 flex items-end gap-[4px] z-10">
          {points.map((p) => (
            <div
              key={p.id}
              style={{ height: `${p.value}%` }}
              className={`flex-1 transition-all duration-300 ease-out border-t-2 rounded-t-sm ${
                p.value > 80 
                ? "bg-red-500/40 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]" 
                : "bg-emerald-500/20 border-emerald-400/60"
              }`}
            />
          ))}
        </div>

        {/* X-Axis Label */}
        <div className="mt-4 flex justify-between text-[9px] text-slate-600 font-bold border-t border-slate-800 pt-2">
          <span>T-60_TICKS</span>
          <span>REALTIME_BUFFER_STREAM</span>
          <span>CURRENT_TIME</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Sub-component for individual metric cards
 */
interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

function MetricCard({ title, value, icon, color }: MetricCardProps) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-xl hover:bg-slate-900 transition-colors group">
      <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase mb-2 tracking-tighter group-hover:text-slate-400">
        {icon} {title}
      </div>
      <div className={`text-3xl font-black tracking-tight ${color}`}>
        {value}
      </div>
    </div>
  );
}