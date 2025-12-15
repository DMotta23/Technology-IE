import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { LeafIcon, GoogleIcon } from '../components/Icons';

interface AuthPageProps {
    onDemoLogin?: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onDemoLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        // App.tsx handles the session update via onAuthStateChange
      } else {
        const { data, error } = await supabase.auth.signUp({ 
            email, 
            password,
        });
        if (error) throw error;
        
        if (data.session) {
            // Session created successfully, App.tsx will handle the redirect
        } else if (data.user) {
             // User created but no session. This usually means email confirmation is required by the project.
             // We acknowledge the account creation and switch to login.
             setMessage("Account created! Please sign in with your credentials.");
             setIsLogin(true);
        }
      }
    } catch (err: any) {
      setError(err.error_description || err.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
        await supabase.auth.signInWithOAuth({
        provider: 'google',
        });
    } catch (err: any) {
        setError("Google sign in failed. Please try demo mode.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover" style={{backgroundImage: "url('https://images.unsplash.com/photo-1492944548465-d41ce1f65514?q=80&w=2070&auto=format&fit=crop')"}}>
        <div className="absolute inset-0 bg-earth-green/70"></div>
        <div className="relative max-w-md w-full mx-auto p-8 bg-cream/90 backdrop-blur-sm rounded-2xl shadow-2xl">
            <div className="text-center mb-8">
                <LeafIcon className="w-12 h-12 text-earth-green mx-auto"/>
                <h1 className="text-3xl font-extrabold text-forest-green mt-2">Welcome to Harvest & Home</h1>
                <p className="text-stone-600 mt-2">{isLogin ? "Sign in to continue" : "Create your account"}</p>
            </div>
            
            <form onSubmit={handleAuth} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-forest-green mb-1">
                        Email Address
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-earth-green focus:border-earth-green transition text-forest-green"
                        placeholder="you@example.com"
                    />
                </div>
                 <div>
                    <label htmlFor="password"className="block text-sm font-semibold text-forest-green mb-1">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-earth-green focus:border-earth-green transition text-forest-green"
                        placeholder="••••••••"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 bg-earth-green text-white font-bold rounded-lg hover:bg-forest-green transition-colors disabled:bg-stone-400"
                >
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                    ) : (isLogin ? 'Sign In' : 'Sign Up')}
                </button>
            </form>

            {error && <p className="mt-4 text-center text-red-600 bg-red-100 p-2 rounded-lg">{error}</p>}
            {message && <p className="mt-4 text-center text-earth-green bg-green-100 p-2 rounded-lg">{message}</p>}

            <div className="mt-6 text-center">
                <button onClick={() => { setIsLogin(!isLogin); setError(null); setMessage(null); }} className="text-sm text-warm-brown hover:underline">
                    {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                </button>
            </div>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-stone-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-cream text-stone-500">OR</span>
                </div>
            </div>

            <div className="space-y-3">
                <button
                    onClick={signInWithGoogle}
                    className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white text-forest-green font-semibold border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors"
                >
                    <GoogleIcon className="w-6 h-6"/>
                    <span>Sign in with Google</span>
                </button>
                
                {onDemoLogin && (
                    <button
                        onClick={onDemoLogin}
                        className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-sun-yellow/50 text-forest-green font-bold border border-yellow-400 rounded-lg hover:bg-sun-yellow hover:border-yellow-500 transition-colors"
                    >
                        <span>Continue as Guest (Demo)</span>
                    </button>
                )}
            </div>
        </div>
    </div>
  );
};

export default AuthPage;