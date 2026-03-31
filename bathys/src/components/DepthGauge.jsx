import React from 'react';
import { useScrollDepth } from '../hooks/useScrollDepth';

export default function DepthGauge() {
  const depth = useScrollDepth();

  return (
    <div className="depth-gauge">
      {depth.toLocaleString()}m
    </div>
  );
}
