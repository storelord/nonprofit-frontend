import "@/App.css";
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import router from './pages/router';
import { store } from './store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
