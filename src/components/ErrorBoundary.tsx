import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-950 p-4">
          <div className="bg-white dark:bg-stone-900 p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-stone-200 dark:border-stone-800">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-red-600 dark:text-red-400">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold font-bengali text-stone-800 dark:text-stone-100 mb-2">
              দুঃখিত, একটি সমস্যা হয়েছে
            </h1>
            <p className="text-stone-500 dark:text-stone-400 font-bengali mb-6">
              অ্যাপটি লোড করতে সমস্যা হচ্ছে। অনুগ্রহ করে রিলোড করুন।
            </p>
            
            {/* Dev Info */}
            {process.env.NODE_ENV === 'development' && (
              <div className="bg-stone-100 dark:bg-stone-800 p-4 rounded-lg text-left mb-6 overflow-auto max-h-40">
                <p className="text-xs font-mono text-red-500">{this.state.error?.toString()}</p>
              </div>
            )}

            <button
              onClick={() => window.location.reload()}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors w-full font-bengali"
            >
              <RefreshCw className="w-5 h-5" />
              রিলোড করুন
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
