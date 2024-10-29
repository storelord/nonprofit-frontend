import { createBrowserRouter } from 'react-router-dom';
import ChatPage from './chat.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello world!</div>,
  },
  {
    path: '/chat',
    element: <ChatPage />,
  },
]);

export default router;
