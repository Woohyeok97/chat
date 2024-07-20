// src/components/Events.tsx
import React from 'react';

interface EventsProps {
  events: string[];
}

export function Events({ events }: EventsProps) {
  return (
    <ul>
      {events.map((event, index) => (
        <li key={index}>{event}</li>
      ))}
    </ul>
  );
}
