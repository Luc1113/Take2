import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { Lock, User } from "lucide-react";

export function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // Placeholder only — no auth wired up yet.
  };

  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-black px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md border border-white/10 bg-[#0a0a0a] p-8 shadow-[0_16px_60px_rgba(0,0,0,0.4)]"
      >
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center border border-red-600/40 bg-red-600/10">
            <Lock className="h-5 w-5 text-red-500" />
          </div>
          <h1 className="font-['Bebas_Neue'] text-4xl tracking-wider text-white">Admin Login</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
            Username
            <div className="relative mt-2">
              <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Username"
                autoComplete="off"
                className="h-11 w-full border border-white/12 bg-black pl-10 pr-4 text-sm normal-case tracking-normal text-white outline-none transition placeholder:text-white/25 focus:border-red-600"
              />
            </div>
          </label>

          <label className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
            Password
            <div className="relative mt-2">
              <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                autoComplete="off"
                className="h-11 w-full border border-white/12 bg-black pl-10 pr-4 text-sm normal-case tracking-normal text-white outline-none transition placeholder:text-white/25 focus:border-red-600"
              />
            </div>
          </label>

          <button
            type="submit"
            disabled
            className="mt-2 h-11 w-full bg-red-600 font-['Oswald'] text-sm uppercase tracking-[0.14em] text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/30"
          >
            Sign In
          </button>
        </form>
      </motion.div>
    </div>
  );
}
