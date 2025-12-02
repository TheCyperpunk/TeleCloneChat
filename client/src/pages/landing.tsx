import { useState } from "react";
import landingBg from "@/assets/landing-bg.png";

interface LandingPageProps {
  onConnectWallet: () => void;
}

export function LandingPage({ onConnectWallet }: LandingPageProps) {
  const [showEmailLogin, setShowEmailLogin] = useState(false);
  const [email, setEmail] = useState("");

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email login:", email);
    onConnectWallet();
  };

  return (
    <div className="h-screen w-full relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${landingBg})` }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-end pb-20 px-6">
        <div className="w-full max-w-md space-y-6">
          {!showEmailLogin ? (
            <>
              {/* Connect Wallet Button */}
              <button
                onClick={onConnectWallet}
                className="w-full py-4 px-6 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-black font-bold text-lg rounded-xl shadow-[0_0_30px_rgba(34,197,94,0.5)] hover:shadow-[0_0_40px_rgba(34,197,94,0.7)] transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                Connect Wallet
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-white/20" />
                <span className="text-white/60 text-sm">or</span>
                <div className="flex-1 h-px bg-white/20" />
              </div>

              {/* Email Login Button */}
              <button
                onClick={() => setShowEmailLogin(true)}
                className="w-full py-4 px-6 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold text-lg rounded-xl border border-white/20 transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                Login with Email
              </button>
            </>
          ) : (
            <>
              {/* Email Form */}
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full py-4 px-6 bg-white/10 backdrop-blur-md text-white placeholder:text-white/50 font-medium text-lg rounded-xl border border-white/20 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/50 transition-all"
                />
                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-black font-bold text-lg rounded-xl shadow-[0_0_30px_rgba(34,197,94,0.5)] hover:shadow-[0_0_40px_rgba(34,197,94,0.7)] transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  Continue
                </button>
              </form>

              {/* Back Button */}
              <button
                onClick={() => setShowEmailLogin(false)}
                className="w-full py-3 text-white/70 hover:text-white text-sm transition-colors"
              >
                ← Back to options
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
