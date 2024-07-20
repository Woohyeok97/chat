import { Navigate, Route, Routes } from 'react-router-dom';
import Chat from './pages/Chat';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Chat />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}
