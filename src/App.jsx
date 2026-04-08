import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import HomePage from './pages/HomePage'
import UserHomePage from './pages/UserHomePage'
import WelcomePage from './pages/WelcomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AdminLayout from './components/admin/AdminLayout'
import DashboardPage from './pages/admin/DashboardPage'
import EmpresasPage from './pages/admin/EmpresasPage'
import ContatosPage from './pages/admin/ContatosPage'
import TarefasPage from './pages/admin/TarefasPage'
import CalendarioPage from './pages/admin/CalendarioPage'
import FinanceiroPage from './pages/admin/FinanceiroPage'
import PetmaxIAPage from './pages/admin/PetmaxIAPage'
import ConfiguracoesPage from './pages/admin/ConfiguracoesPage'
import LogsPage from './pages/admin/LogsPage'
import PerfilPage from './pages/admin/PerfilPage'
import NotFoundPage from './pages/NotFoundPage'
import PricingPage from './pages/PricingPage'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<UserHomePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="empresas" element={<EmpresasPage />} />
            <Route path="contatos" element={<ContatosPage />} />
            <Route path="tarefas" element={<TarefasPage />} />
            <Route path="calendario" element={<CalendarioPage />} />
            <Route path="financeiro" element={<FinanceiroPage />} />
            <Route path="petmax-ia" element={<PetmaxIAPage />} />
            <Route path="configuracoes" element={<ConfiguracoesPage />} />
            <Route path="logs" element={<LogsPage />} />
            <Route path="perfil" element={<PerfilPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App