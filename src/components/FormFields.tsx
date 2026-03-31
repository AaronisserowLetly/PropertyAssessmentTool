'use client';

import React from 'react';

interface SelectFieldProps {
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
}

export function SelectField({ label, hint, value, onChange, options, placeholder }: SelectFieldProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-slate-200">{label}</label>
      {hint && <p className="text-xs text-slate-400">{hint}</p>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-3 py-2.5 text-sm text-white placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors"
      >
        <option value="">{placeholder || 'Select...'}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

interface TextFieldProps {
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}

export function TextField({ label, hint, value, onChange, placeholder, type = 'text' }: TextFieldProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-slate-200">{label}</label>
      {hint && <p className="text-xs text-slate-400">{hint}</p>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-3 py-2.5 text-sm text-white placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors"
      />
    </div>
  );
}

interface NumberFieldProps {
  label: string;
  hint?: string;
  value: number | null;
  onChange: (value: number | null) => void;
  placeholder?: string;
  min?: number;
  max?: number;
}

export function NumberField({ label, hint, value, onChange, placeholder, min, max }: NumberFieldProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-slate-200">{label}</label>
      {hint && <p className="text-xs text-slate-400">{hint}</p>}
      <input
        type="number"
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value === '' ? null : Number(e.target.value))}
        placeholder={placeholder}
        min={min}
        max={max}
        className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-3 py-2.5 text-sm text-white placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors"
      />
    </div>
  );
}

interface TextAreaFieldProps {
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

export function TextAreaField({ label, hint, value, onChange, placeholder, rows = 3 }: TextAreaFieldProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-slate-200">{label}</label>
      {hint && <p className="text-xs text-slate-400">{hint}</p>}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-3 py-2.5 text-sm text-white placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors resize-y"
      />
    </div>
  );
}

interface ConditionRatingFieldProps {
  label: string;
  hint: string;
  value: string;
  onChange: (value: string) => void;
  notesValue: string;
  onNotesChange: (value: string) => void;
}

export function ConditionRatingField({ label, hint, value, onChange, notesValue, onNotesChange }: ConditionRatingFieldProps) {
  const ratings = [
    { value: 'good', label: 'Good', color: 'border-emerald-500 bg-emerald-500/20 text-emerald-300', activeColor: 'border-emerald-400 bg-emerald-500/30 text-emerald-200 ring-2 ring-emerald-500/50' },
    { value: 'fair', label: 'Fair', color: 'border-yellow-500 bg-yellow-500/20 text-yellow-300', activeColor: 'border-yellow-400 bg-yellow-500/30 text-yellow-200 ring-2 ring-yellow-500/50' },
    { value: 'poor', label: 'Poor', color: 'border-red-500 bg-red-500/20 text-red-300', activeColor: 'border-red-400 bg-red-500/30 text-red-200 ring-2 ring-red-500/50' },
  ];

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4 space-y-3">
      <div>
        <h4 className="text-sm font-medium text-slate-200">{label}</h4>
        <p className="text-xs text-slate-400 mt-0.5">{hint}</p>
      </div>
      <div className="flex gap-2">
        {ratings.map((r) => (
          <button
            key={r.value}
            type="button"
            onClick={() => onChange(r.value === value ? '' : r.value)}
            className={`flex-1 rounded-lg border py-2 px-3 text-sm font-medium transition-all ${
              value === r.value ? r.activeColor : 'border-slate-600 bg-slate-700/30 text-slate-400 hover:bg-slate-700/50'
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>
      {(value === 'fair' || value === 'poor') && (
        <input
          type="text"
          value={notesValue}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="What did you notice? (optional)"
          className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-3 py-2 text-sm text-white placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors"
        />
      )}
    </div>
  );
}

interface RedFlagFieldProps {
  label: string;
  hint: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  notesValue: string;
  onNotesChange: (value: string) => void;
}

export function RedFlagField({ label, hint, checked, onChange, notesValue, onNotesChange }: RedFlagFieldProps) {
  return (
    <div className={`rounded-xl border p-4 space-y-2 transition-all ${
      checked ? 'border-red-500/50 bg-red-500/10' : 'border-slate-700 bg-slate-800/50'
    }`}>
      <label className="flex items-start gap-3 cursor-pointer">
        <div className="pt-0.5">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="h-5 w-5 rounded border-slate-500 bg-slate-700 text-red-500 focus:ring-red-500/50 focus:ring-offset-0 cursor-pointer"
          />
        </div>
        <div>
          <span className="text-sm font-medium text-slate-200">{label}</span>
          <p className="text-xs text-slate-400 mt-0.5">{hint}</p>
        </div>
      </label>
      {checked && (
        <input
          type="text"
          value={notesValue}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Describe what you see..."
          className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-3 py-2 text-sm text-white placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none ml-8"
        />
      )}
    </div>
  );
}

interface SectionHeaderProps {
  title: string;
  description: string;
  icon: string;
}

export function SectionHeader({ title, description, icon }: SectionHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">{icon}</span>
        <h2 className="text-xl font-semibold text-white">{title}</h2>
      </div>
      <p className="text-sm text-slate-400">{description}</p>
    </div>
  );
}
