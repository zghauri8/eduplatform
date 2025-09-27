import { AuthForm } from "@/components/AuthForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  
  const handleToggleMode = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-white">Create an account</CardTitle>
          <CardDescription className="text-center text-gray-300">
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AuthForm mode="signup" onToggleMode={handleToggleMode} />
        </CardContent>
      </Card>
    </div>
  );
}
