import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setToken, isAuthenticated } from "@/lib/auth";

export default function Login() {
  const [apiKey, setApiKeyValue] = useState("");
  const navigate = useNavigate();

  if (isAuthenticated()) {
    navigate("/");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!apiKey.trim()) {
      alert("יש להזין API key");
      return;
    }

    setToken(apiKey.trim());
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-4">API Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={apiKey}
            onChange={(e) => setApiKeyValue(e.target.value)}
            placeholder="Enter API key..."
            className="w-full p-2 rounded bg-background border border-border"
          />

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-2 rounded"
          >
            כניסה
          </button>
        </form>
      </div>
    </div>
  );
}