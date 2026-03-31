'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Assessment } from '@/lib/types';
import { getScoreColor, getScoreLabel, getRedFlagCount } from '@/lib/scoring';

export default function Dashboard() {
  const router = useRouter();
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbReady, setDbReady] = useState(true);

  useEffect(() => {
    loadAssessments();
  }, []);

  async function loadAssessments() {
    const { data, error } = await supabase
      .from('assessments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      if (error.code === 'PGRST205') {
        setDbReady(false);
      }
      console.error('Load error:', error);
    } else {
      setAssessments(data || []);
    }
    setLoading(false);
  }

  async function deleteAssessment(id: string, e: React.MouseEvent) {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this assessment?')) return;
    const { error } = await supabase.from('assessments').delete().eq('id', id);
    if (!error) {
      setAssessments((prev) => prev.filter((a) => a.id !== id));
    }
  }

  const statusColors: Record<string, string> = {
    draft: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
    in_progress: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    completed: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  };

  const statusLabels: Record<string, string> = {
    draft: 'Draft',
    in_progress: 'In Progress',
    completed: 'Completed',
  };

  if (!dbReady) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="max-w-lg w-full rounded-2xl border border-amber-500/30 bg-amber-500/5 p-8 text-center space-y-4">
          <div className="text-4xl">⚠️</div>
          <h1 className="text-xl font-semibold text-white">Database Setup Required</h1>
          <p className="text-sm text-slate-300">
            The database tables haven&apos;t been created yet. Please run the SQL from{' '}
            <code className="bg-slate-800 px-1.5 py-0.5 rounded text-amber-300">supabase-setup.sql</code>{' '}
            in your Supabase Dashboard SQL Editor.
          </p>
          <ol className="text-left text-sm text-slate-400 space-y-2">
            <li>1. Go to your <strong className="text-slate-200">Supabase Dashboard</strong></li>
            <li>2. Navigate to <strong className="text-slate-200">SQL Editor</strong></li>
            <li>3. Paste and run the contents of <code className="bg-slate-800 px-1 py-0.5 rounded text-xs">supabase-setup.sql</code></li>
            <li>4. Refresh this page</li>
          </ol>
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Letly Property Assessment Tool</h1>
              <p className="text-sm text-slate-400 mt-0.5">Property Assessment & Valuation Tool</p>
            </div>
            <button
              onClick={() => router.push('/assessment/new')}
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20"
            >
              + New Assessment
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
            <div className="text-2xl font-bold text-white">{assessments.length}</div>
            <div className="text-xs text-slate-400">Total Assessments</div>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
            <div className="text-2xl font-bold text-blue-400">
              {assessments.filter((a) => a.status !== 'completed').length}
            </div>
            <div className="text-xs text-slate-400">In Progress</div>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
            <div className="text-2xl font-bold text-emerald-400">
              {assessments.filter((a) => a.status === 'completed').length}
            </div>
            <div className="text-xs text-slate-400">Completed</div>
          </div>
        </div>

        {/* Assessment List */}
        {loading ? (
          <div className="text-center py-12 text-slate-400">Loading assessments...</div>
        ) : assessments.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <div className="text-5xl">🏠</div>
            <h2 className="text-lg font-medium text-white">No assessments yet</h2>
            <p className="text-sm text-slate-400">Start your first property assessment to get going.</p>
            <button
              onClick={() => router.push('/assessment/new')}
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-500 transition-colors"
            >
              + New Assessment
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {assessments.map((assessment) => {
              const a = assessment as Assessment & { id: string; created_at: string };
              const redFlags = getRedFlagCount(a);
              return (
                <button
                  key={a.id}
                  onClick={() => router.push(`/assessment/${a.id}`)}
                  className="w-full text-left rounded-xl border border-slate-700 bg-slate-800/50 p-4 hover:bg-slate-800 hover:border-slate-600 transition-all group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-medium text-white truncate">
                          {a.property_address || 'Untitled Assessment'}
                        </h3>
                        <span className={`inline-block rounded-full border px-2 py-0.5 text-[10px] font-medium ${statusColors[a.status]}`}>
                          {statusLabels[a.status]}
                        </span>
                        {redFlags > 0 && (
                          <span className="inline-block rounded-full border border-red-500/30 bg-red-500/20 px-2 py-0.5 text-[10px] font-medium text-red-300">
                            {redFlags} flag{redFlags > 1 ? 's' : ''}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400">
                        {[a.property_city, a.property_postcode, a.property_type].filter(Boolean).join(' · ') || 'No details yet'}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {a.created_at ? new Date(a.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}
                        {a.interior_bedroom_count ? ` · ${a.interior_bedroom_count} bed` : ''}
                        {a.interior_bathroom_count ? ` · ${a.interior_bathroom_count} bath` : ''}
                        {a.floor_area ? ` · ${a.floor_area} ${a.floor_area_unit}` : ''}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 ml-4">
                      {a.overall_condition_score !== null && a.overall_condition_score !== undefined && (
                        <div className="text-right">
                          <div className={`text-xl font-bold ${getScoreColor(a.overall_condition_score)}`}>
                            {Number(a.overall_condition_score).toFixed(1)}
                          </div>
                          <div className={`text-[10px] ${getScoreColor(a.overall_condition_score)}`}>
                            {getScoreLabel(a.overall_condition_score)}
                          </div>
                        </div>
                      )}
                      <button
                        onClick={(e) => deleteAssessment(a.id, e)}
                        className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition-all p-1"
                        title="Delete assessment"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </main>

      <footer className="border-t border-slate-800 mt-auto">
        <div className="mx-auto max-w-5xl px-4 py-4 text-center">
          <p className="text-xs text-slate-600">PropertyAssess v1.0 — Internal Assessment Tool</p>
        </div>
      </footer>
    </div>
  );
}
