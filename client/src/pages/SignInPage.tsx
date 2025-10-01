import { Lock, Mail } from "lucide-react";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

import { IconButton } from "@/components/IconButton";
import { InputWithIcon } from "@/components/InputWithIcon";
import { Loader } from "@/components/Loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { loginUser } from "@/lib/api";
import type { AuthResponse } from "@/types/Auth";
export default function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  // Show toast for error
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-right",
        duration: 5000,
      });
    }
  }, [error]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    loginUser(email, password)
      .then((data: AuthResponse) => {
        localStorage.setItem("access_token", data.access_token);
        navigate("/dashboard");
      })
      .catch((err) => {
        setError(err.message || "Login failed");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-50">
      <Card className="w-full max-w-md p-2">
        <CardHeader className="flex flex-col items-center">
          <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Error toast handled by Sonner */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <InputWithIcon
              id="email"
              type="email"
              label="Email"
              placeholder="Enter your email"
              icon={<Mail className="h-5 w-5 text-blue-400" />}
              {...{
                value: email,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
                required: true,
              }}
            />
            <InputWithIcon
              id="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
              icon={<Lock className="h-5 w-5 text-blue-400" />}
              {...{
                value: password,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
                required: true,
              }}
            />
            <IconButton
              className="w-full"
              icon={<Lock className="h-5 w-5" />}
              {...{ type: "submit", disabled: loading }}
            >
              {loading ? <Loader className="h-5 w-5 animate-spin" /> : "Sign In"}
            </IconButton>
          </form>
          <div className="mt-4 text-center">
            <Link to="/signup" className="text-blue-600 hover:underline">
              Don't have an account? Sign Up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
