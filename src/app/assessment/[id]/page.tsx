'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Assessment, EMPTY_ASSESSMENT, STEP_LABELS } from '@/lib/types';
import { calculateOverallScore } from '@/lib/scoring';
import { supabase } from '@/lib/supabase';
import Step1PropertyDetails from '@/components/steps/Step1PropertyDetails';
import Step2Exterior from '@/components/steps/Step2Exterior';
import Step3Interior from '@/components/steps/Step3Interior';
import Step4Systems from '@/components/steps/Step4Systems';
import Step5RedFlags from '@/components/steps/Step5RedFlags';
import Step6Location from '@/components/steps/Step6Location';
import Step7Notes from '@/components/steps/Step7Notes';
import Step8Summary from '@/components/steps/Step8Summary';

export default function EditAssessmentPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<Assessment>({ ...EMPTY_ASSESSMENT });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    async function load() {
      const { data: row, error } = await supabase
        .from('assessments')
        .select('*')
        .eq('id', id)
        .single();
      if (error || !row) {
        alert('Assessment not found');
        router.push('/admin');
        return;
      }
      setData({ ...EMPTY_ASSESSMENT, ...row });
      setLoading(false);
    }
    load();
  }, [id, router]);

  const handleChange = useCallback((updates: Partial<Assessment>) => {
    setData((prev) => ({ ...prev, ...updates }));
  }, []);

  const saveToDatabase = async (status?: Assessment['status']) => {
    setSaving(true);
    try {
      const score = calculateOverallScore(data);
      const { id: _id, created_at: _ca, updated_at: _ua, ...payload } = data as Assessment & { id?: string; created_at?: string; updated_at?: string };
      const { error } = await supabase
        .from('assessments')
        .update({ ...payload, overall_condition_score: score, ...(status ? { status } : {}) })
        .eq('id', id);
      if (error) throw error;
      setLastSaved(new Date());
    } catch (err) {
      console.error('Save failed:', err);
      alert('Failed to save — try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleNext = () => {
    if (currentStep < STEP_LABELS.length - 1) {
      setCurrentStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  const handleSubmit = async () => {
    await saveToDatabase('completed');
    router.push('/admin');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <Step1PropertyDetails data={data} onChange={handleChange} />;
      case 1: return <Step2Exterior data={data} onChange={handleChange} />;
      case 2: return <Step3Interior data={data} onChange={handleChange} />;
      case 3: return <Step4Systems data={data} onChange={handleChange} />;
      case 4: return <Step5RedFlags data={data} onChange={handleChange} />;
      case 5: return <Step6Location data={data} onChange={handleChange} />;
      case 6: return <Step7Notes data={data} onChange={handleChange} assessmentId={id} />;
      case 7: return <Step8Summary data={data} />;
      default: return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-slate-400">Loading assessment...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-700 bg-slate-900/95 backdrop-blur-sm">
        <div className="mx-auto max-w-3xl px-4 py-3">
          <div className="flex items-center justify-between">
            <button onClick={() => router.push('/')} className="text-sm text-slate-400 hover:text-white transition-colors">
              ← Dashboard
            </button>
            <div className="flex items-center gap-3">
              {lastSaved && <span className="text-xs text-slate-500">Saved {lastSaved.toLocaleTimeString()}</span>}
              <button onClick={() => saveToDatabase()} disabled={saving} className="rounded-lg border border-slate-600 bg-slate-700 px-3 py-1.5 text-sm text-slate-200 hover:bg-slate-600 transition-colors disabled:opacity-50">
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="border-b border-slate-800">
        <div className="mx-auto max-w-3xl px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-400">Step {currentStep + 1} of {STEP_LABELS.length}</span>
            <span className="text-xs text-slate-500">{Math.round(((currentStep + 1) / STEP_LABELS.length) * 100)}% Complete</span>
          </div>
          <div className="flex gap-1">
            {STEP_LABELS.map((label, i) => (
              <button key={label} onClick={() => { setCurrentStep(i); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`flex-1 h-2 rounded-full transition-all ${i <= currentStep ? (i === currentStep ? 'bg-blue-500' : 'bg-blue-500/50') : 'bg-slate-700'}`} />
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {STEP_LABELS.map((label, i) => (
              <button key={label} onClick={() => { setCurrentStep(i); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`text-[10px] transition-colors ${i === currentStep ? 'text-blue-400 font-medium' : 'text-slate-500 hover:text-slate-400'}`}
                style={{ width: `${100 / STEP_LABELS.length}%` }}>{label}</button>
            ))}
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-3xl px-4 py-6">{renderStep()}</main>

      <div className="sticky bottom-0 border-t border-slate-700 bg-slate-900/95 backdrop-blur-sm">
        <div className="mx-auto max-w-3xl px-4 py-4 flex justify-between">
          <button onClick={handleBack} disabled={currentStep === 0}
            className="rounded-lg border border-slate-600 bg-slate-800 px-5 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
            ← Back
          </button>
          {currentStep === STEP_LABELS.length - 1 ? (
            <button onClick={handleSubmit} disabled={saving}
              className="rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-emerald-500 transition-colors disabled:opacity-50 shadow-lg shadow-emerald-600/20">
              {saving ? 'Submitting...' : 'Submit Assessment'}
            </button>
          ) : (
            <button onClick={handleNext}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20">
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
