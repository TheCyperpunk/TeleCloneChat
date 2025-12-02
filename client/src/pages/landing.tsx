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
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-end pb-20 px-12">
        <div className="w-full max-w-sm space-y-3">
          {!showEmailLogin ? (
            <>
              {/* Connect Wallet Button */}
              <button
                onClick={onConnectWallet}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-black font-bold text-sm rounded-lg shadow-[0_0_20px_rgba(34,197,94,0.6),0_0_40px_rgba(34,197,94,0.4),0_0_60px_rgba(34,197,94,0.2)] hover:shadow-[0_0_25px_rgba(34,197,94,0.8),0_0_50px_rgba(34,197,94,0.6),0_0_75px_rgba(34,197,94,0.4)] transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                Connect Wallet
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-gray-400" />
                <span className="text-gray-600 text-sm font-medium">or</span>
                <div className="flex-1 h-px bg-gray-400" />
              </div>

              {/* Email Login Button */}
              <button
                onClick={() => setShowEmailLogin(true)}
                className="w-full py-2.5 px-4 bg-gray-500/20 hover:bg-gray-500/30 backdrop-blur-md text-black font-semibold text-sm rounded-lg border border-gray-400/30 transition-all duration-300 transform hover:scale-105 active:scale-95"
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
                  className="w-full py-2.5 px-4 bg-white/10 backdrop-blur-md text-black placeholder:text-black font-medium text-sm rounded-lg border border-white/20 focus:border-white/20 focus:outline-none transition-all"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-black font-bold text-sm rounded-lg shadow-[0_0_20px_rgba(34,197,94,0.6),0_0_40px_rgba(34,197,94,0.4),0_0_60px_rgba(34,197,94,0.2)] hover:shadow-[0_0_25px_rgba(34,197,94,0.8),0_0_50px_rgba(34,197,94,0.6),0_0_75px_rgba(34,197,94,0.4)] transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  Continue
                </button>
              </form>

              {/* Back Button */}
              <button
                onClick={() => setShowEmailLogin(false)}
                className="w-full py-3 text-gray-600 hover:text-gray-800 text-sm transition-colors"
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
