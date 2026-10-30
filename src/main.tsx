import React, { Component, ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.clear();
    } catch {
      // ignore
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#030604] text-[#f2f7f4] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-[#07110bcc] border border-[#16271c] rounded-3xl p-8 text-center shadow-2xl">
            <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-[#19e05f22] border border-[#19e05f] flex items-center justify-center text-[#19e05f] font-bold text-xl">
              PB
            </div>
            <h1 className="text-xl font-semibold mb-2">Something went wrong</h1>
            <p className="text-xs text-[#9aaaa0] mb-6">
              The application encountered a client-side issue. Click below to reset local state and reload.
            </p>
            <button
              onClick={this.handleReset}
              className="w-full py-3 px-4 rounded-full bg-[#19e05f] text-[#031007] text-sm font-bold hover:bg-[#15c853] transition-all cursor-pointer shadow-lg shadow-[#19e05f44]"
            >
              Reset &amp; Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
