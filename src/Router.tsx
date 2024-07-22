import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:id" element={<Chat />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}
