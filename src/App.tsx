import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { Dashboard } from "./components/Dashboard";
import { ADOFDashboard } from "./components/ADOFDashboard";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

const queryClient = new QueryClient();

// Protected Route Component
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// Layout wrapper that conditionally renders the Layout component
const RouteWithLayout = ({ children, showLayout = true }: { children: React.ReactNode; showLayout?: boolean }) => {
  return showLayout ? <Layout>{children}</Layout> : <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes with Layout */}
            <Route path="/" element={<RouteWithLayout showLayout={true}><Index /></RouteWithLayout>} />
            <Route path="/courses" element={<RouteWithLayout showLayout={true}><Courses /></RouteWithLayout>} />
            <Route path="/about" element={<RouteWithLayout showLayout={true}><About /></RouteWithLayout>} />
            <Route path="/contact" element={<RouteWithLayout showLayout={true}><Contact /></RouteWithLayout>} />
            
            {/* Auth Routes without Layout */}
            <Route path="/login" element={<RouteWithLayout showLayout={false}><Login /></RouteWithLayout>} />
            <Route path="/signup" element={<RouteWithLayout showLayout={false}><Signup /></RouteWithLayout>} />
            
            {/* Protected Routes with Layout */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <RouteWithLayout showLayout={false}>
                    <Dashboard />
                  </RouteWithLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/adof-dashboard"
              element={
                <ProtectedRoute>
                  <RouteWithLayout showLayout={false}>
                    <ADOFDashboard />
                  </RouteWithLayout>
                </ProtectedRoute>
              }
            />
            
            {/* 404 Route */}
            <Route path="*" element={<RouteWithLayout showLayout={true}><NotFound /></RouteWithLayout>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
