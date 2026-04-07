import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import HomePage from './pages/HomePage'
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
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/" element={<HomePage />} />
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
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App