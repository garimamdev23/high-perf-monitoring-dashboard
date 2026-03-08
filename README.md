# 🚀 VULCAN_ENGINE v4 | High-Frequency Data Monitoring

[Live Demo Link](https://vercel.com/garimamdev23s-projects/high-perf-monitoring-dashboard-garima) | [Source Code](https://github.com/garimamdev23/high-perf-monitoring-dashboard)

## 📋 Project Overview
A performance-optimized monitoring dashboard built to handle high-density data streams (40Hz+) without UI jank. This project serves as a technical case study on **Main Thread Optimization** and **Memory Management** in modern frontend architectures.

## 🚀 Key Engineering Solutions

### 1. Throttled Buffer Strategy (The "Pressure Valve")
* **The Problem:** React state updates at 40Hz+ saturate the Event Loop, causing "jank."
* **The Solution:** I implemented a decoupling layer. Incoming data is collected in a non-reactive `useRef` buffer and "flushed" to the global **Zustand** store at a sustainable 10Hz. This ensures the UI remains at a consistent 60FPS.

### 2. Memory Leak Prevention
* **The Problem:** Continuous data streams can lead to infinite array growth and browser crashes.
* **The Solution:** Utilized **Rolling Window Logic** (`.slice(-60)`) to ensure the data array maintains a constant size, providing a predictable memory footprint for long-running sessions.

### 3. Visual Anomaly Detection
* **The Challenge:** High data volume makes it hard to spot critical spikes manually.
* **The Solution:** Integrated heuristic analysis that triggers **Visual Regressions** (red color shifts and pulse animations) when values exceed an 80% threshold.

## 🛠️ Tech Stack
- **Framework:** React 18 + TypeScript (Strict Mode)
- **State:** Zustand (Granular re-renders)
- **Styling:** Tailwind CSS v4 (Engine-first CSS)
- **Icons:** Lucide React
- **Build Tool:** Vite

## 📦 Getting Started
1. `npm install`
2. `npm run dev`