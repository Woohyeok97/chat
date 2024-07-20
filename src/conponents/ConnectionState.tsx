// src/components/ConnectionState.tsx
import React from 'react';

interface ConnectionStateProps {
  isConnected: boolean;
}

export function ConnectionState({ isConnected }: ConnectionStateProps) {
  return <p>State: {isConnected ? 'Connected' : 'Disconnected'}</p>;
}
