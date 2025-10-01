import { IconButton } from "@/components/IconButton";
import { InputWithIcon } from "@/components/InputWithIcon";
import { Loader } from "@/components/Loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { registerUser } from "@/lib/api";
import type { AuthResponse } from "@/types/Auth";
import { Lock, Mail, User as UserIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notif, setNotif] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Show toast for notif
  useEffect(() => {
    if (notif) {
      toast[notif.type](notif.message, {
        position: "bottom-right",
        duration: 5000,
      });
    }
  }, [notif]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNotif(null);
    setLoading(true);
    registerUser(email, password)
      .then((data: AuthResponse) => {
        setNotif({ type: "success", message: "Registration successful!" });
        localStorage.setItem("access_token", data.access_token);
        navigate("/dashboard");
      })
      .catch((err: unknown) => {
        setNotif({
          type: "error",
          message: err instanceof Error ? err.message : "Registration failed",
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-50">
      <Card className="w-full max-w-md p-2">
        <CardHeader className="flex flex-col items-center">
          <CardTitle className="text-2xl font-bold text-center">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Toast handled by Sonner */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <InputWithIcon
              id="name"
              type="text"
              label="Name"
              placeholder="Enter your name"
              icon={<UserIcon className="h-5 w-5 text-blue-400" />}
              {...{
                value: name,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value),
                required: true,
              }}
            />
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
              icon={<UserIcon className="h-5 w-5" />}
              {...{ type: "submit", disabled: loading }}
            >
              {loading ? <Loader className="h-5 w-5 animate-spin" /> : "Sign Up"}
            </IconButton>
          </form>
          <div className="mt-4 text-center">
            <Link to="/signin" className="text-blue-600 hover:underline">
              Already have an account? Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
