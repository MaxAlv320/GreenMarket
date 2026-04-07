import { AuthProvider } from './context/authContext';
import AppNavigator from './views/AppNavigator';

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  )
}