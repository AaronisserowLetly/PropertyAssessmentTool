'use client';

import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <div className="space-y-6 max-w-md w-full">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Letly Property Assessment Tool
            </h1>
            <p className="text-slate-400">Complete your property visit report below</p>
          </div>

          <button
            onClick={() => router.push('/assessment/new')}
            className="w-full rounded-xl bg-blue-600 px-6 py-4 text-base font-semibold text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20"
          >
            Start New Assessment
          </button>
        </div>
      </main>

      <footer className="pb-6 text-center">
        <button
          onClick={() => router.push('/admin')}
          className="text-xs text-slate-600 hover:text-slate-400 transition-colors"
        >
          Admin Login →
        </button>
      </footer>
    </div>
  );
}
