import { useEffect, useRef } from 'react';
import { useDataStore } from '../store';
import type { DataPoint } from '../types';

export const useDataStream = () => {
  const { addBatch, isPaused } = useDataStore();
  const buffer = useRef<DataPoint[]>([]);

  useEffect(() => {
    if (isPaused) return;

    // SIMULATION: A message arrives every 25ms (40 messages per second)
    const socketInterval = setInterval(() => {
      const newPoint: DataPoint = {
        id: crypto.randomUUID(),
        // Generates a fluctuating wave value
        value: 30 + Math.random() * 40 + (Math.sin(Date.now() / 1000) * 20),
        latency: Math.floor(Math.random() * 50) + 10,
        timestamp: Date.now(),
      };
      buffer.current.push(newPoint);
    }, 25);

    // PRESSURE VALVE: We only update the React UI every 100ms (10 updates per second)
    // This keeps the Main Thread free for smooth animations.
    const flushInterval = setInterval(() => {
      if (buffer.current.length > 0) {
        addBatch(buffer.current);
        buffer.current = [];
      }
    }, 100);

    return () => {
      clearInterval(socketInterval);
      clearInterval(flushInterval);
    };
  }, [addBatch, isPaused]);
};