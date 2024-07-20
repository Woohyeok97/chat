// src/components/MyForm.tsx
import React, { useState } from 'react';
import { socket } from '../socket';

export function MyForm() {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    socket.emit('sendMessage', value);
    setValue('');
  };

  return (
    <form onSubmit={onSubmit}>
      <input value={value} onChange={e => setValue(e.target.value)} />
      <button type="submit" disabled={isLoading}>
        Submit
      </button>
    </form>
  );
}
