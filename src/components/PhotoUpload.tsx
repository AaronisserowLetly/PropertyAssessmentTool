'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';

interface PhotoCategory {
  key: string;
  label: string;
  description: string;
  required: boolean;
}

const PHOTO_CATEGORIES: PhotoCategory[] = [
  {
    key: 'exterior-front',
    label: 'Exterior — Front of Property',
    description: 'Front of the property from the street. Step back to get the full building in frame.',
    required: true,
  },
  {
    key: 'exterior-rear',
    label: 'Exterior — Rear & Sides',
    description: 'Rear and both sides of the property.',
    required: true,
  },
  {
    key: 'parking',
    label: 'Parking Area',
    description: 'All parking spaces, driveway, garage, or bicycle storage. Show condition and availability.',
    required: true,
  },
  {
    key: 'garden',
    label: 'Garden / Outdoor Space',
    description: 'Garden, balcony, roof terrace, or communal outdoor areas. Include any outbuildings or fencing.',
    required: false,
  },
  {
    key: 'communal',
    label: 'Communal Areas',
    description: 'Hallways, stairwells, communal lounges, or shared facilities if applicable.',
    required: false,
  },
  {
    key: 'kitchen',
    label: 'Kitchen',
    description: 'All angles — worktops, appliances, cabinets, sink. Capture any wear, damage, or standout features.',
    required: true,
  },
  {
    key: 'bathrooms',
    label: 'Bathrooms & En-Suites',
    description: 'Each bathroom and en-suite — shower, bath, toilet, taps, tiling. Note any mould or damage.',
    required: true,
  },
  {
    key: 'bedrooms',
    label: 'Bedrooms',
    description: 'Each bedroom showing size, condition, windows, and built-in storage.',
    required: true,
  },
  {
    key: 'living-areas',
    label: 'Living Areas',
    description: 'Living room and any reception rooms. Show light, size, and overall condition.',
    required: true,
  },
  {
    key: 'boiler-utility',
    label: 'Boiler, Meters & Utility',
    description: 'Boiler, fuse box, gas meter, water meter, and electric meter. Include the utility/airing cupboard.',
    required: true,
  },
  {
    key: 'defects',
    label: 'Defects & Issues',
    description: 'Any damage, damp, cracks, mould, or concerns noted during the visit. Close-up shots preferred.',
    required: false,
  },
];

interface Photo {
  id: string;
  file_path: string;
  publicUrl: string;
}

interface Props {
  assessmentId: string | null;
}

export default function PhotoUpload({ assessmentId }: Props) {
  const [photosByCategory, setPhotosByCategory] = useState<Record<string, Photo[]>>({});
  const [uploading, setUploading] = useState<string | null>(null); // category key being uploaded
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    if (assessmentId) fetchPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assessmentId]);

  async function fetchPhotos() {
    if (!assessmentId) return;
    const { data, error } = await supabase
      .from('assessment_photos')
      .select('*')
      .eq('assessment_id', assessmentId)
      .order('created_at', { ascending: true });

    if (error) { console.error('Failed to load photos:', error); return; }

    const grouped: Record<string, Photo[]> = {};
    for (const row of data || []) {
      const { data: urlData } = supabase.storage
        .from('assessment-photos')
        .getPublicUrl(row.file_path);
      if (!grouped[row.category]) grouped[row.category] = [];
      grouped[row.category].push({ id: row.id, file_path: row.file_path, publicUrl: urlData.publicUrl });
    }
    setPhotosByCategory(grouped);
  }

  async function handleUpload(categoryKey: string, files: FileList | null) {
    if (!assessmentId || !files || files.length === 0) return;
    setUploading(categoryKey);
    setErrors((prev) => ({ ...prev, [categoryKey]: '' }));

    const uploaded: Photo[] = [];
    try {
      for (const file of Array.from(files)) {
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
        const path = `${assessmentId}/${categoryKey}/${Date.now()}_${safeName}`;

        const { error: uploadError } = await supabase.storage
          .from('assessment-photos')
          .upload(path, file);
        if (uploadError) throw new Error(`Failed to upload ${file.name}: ${uploadError.message}`);

        const { data: urlData } = supabase.storage.from('assessment-photos').getPublicUrl(path);

        const { data: dbRow, error: dbError } = await supabase
          .from('assessment_photos')
          .insert({ assessment_id: assessmentId, category: categoryKey, file_path: path, caption: '' })
          .select('id')
          .single();
        if (dbError) throw new Error(`Failed to save record: ${dbError.message}`);

        uploaded.push({ id: dbRow.id, file_path: path, publicUrl: urlData.publicUrl });
      }
      setPhotosByCategory((prev) => ({
        ...prev,
        [categoryKey]: [...(prev[categoryKey] || []), ...uploaded],
      }));
    } catch (err) {
      setErrors((prev) => ({ ...prev, [categoryKey]: err instanceof Error ? err.message : 'Upload failed' }));
    } finally {
      setUploading(null);
      const ref = fileInputRefs.current[categoryKey];
      if (ref) ref.value = '';
    }
  }

  async function handleDelete(categoryKey: string, photo: Photo) {
    await supabase.storage.from('assessment-photos').remove([photo.file_path]);
    await supabase.from('assessment_photos').delete().eq('id', photo.id);
    setPhotosByCategory((prev) => ({
      ...prev,
      [categoryKey]: (prev[categoryKey] || []).filter((p) => p.id !== photo.id),
    }));
  }

  const requiredCategories = PHOTO_CATEGORIES.filter((c) => c.required);
  const completedRequired = requiredCategories.filter((c) => (photosByCategory[c.key] || []).length > 0).length;

  if (!assessmentId) {
    return (
      <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4 text-sm text-slate-400">
        Save your draft first to enable photo uploads.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Progress summary */}
      <div className={`rounded-xl border p-4 flex items-center justify-between ${
        completedRequired === requiredCategories.length
          ? 'border-emerald-500/30 bg-emerald-500/10'
          : 'border-amber-500/30 bg-amber-500/10'
      }`}>
        <div>
          <p className={`text-sm font-medium ${completedRequired === requiredCategories.length ? 'text-emerald-300' : 'text-amber-300'}`}>
            {completedRequired === requiredCategories.length
              ? 'All required photos uploaded'
              : `${completedRequired} of ${requiredCategories.length} required categories complete`}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">Required categories are marked with a red dot</p>
        </div>
        <div className={`text-2xl font-bold ${completedRequired === requiredCategories.length ? 'text-emerald-400' : 'text-amber-400'}`}>
          {completedRequired}/{requiredCategories.length}
        </div>
      </div>

      {/* Categories */}
      {PHOTO_CATEGORIES.map((cat) => {
        const photos = photosByCategory[cat.key] || [];
        const isUploading = uploading === cat.key;
        const hasPhotos = photos.length > 0;
        const err = errors[cat.key];

        return (
          <div
            key={cat.key}
            className={`rounded-xl border p-4 space-y-3 transition-all ${
              hasPhotos
                ? 'border-slate-600 bg-slate-800/50'
                : cat.required
                ? 'border-slate-700 bg-slate-800/30'
                : 'border-slate-700/50 bg-slate-800/20'
            }`}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2">
                <span className={`mt-1.5 h-2 w-2 rounded-full flex-shrink-0 ${cat.required ? 'bg-red-400' : 'bg-slate-500'}`} />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium text-slate-200">{cat.label}</h4>
                    {hasPhotos && (
                      <span className="text-xs text-emerald-400 font-medium">✓ {photos.length} photo{photos.length !== 1 ? 's' : ''}</span>
                    )}
                    {!cat.required && (
                      <span className="text-[10px] text-slate-500 border border-slate-600 rounded px-1.5 py-0.5">Optional</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{cat.description}</p>
                </div>
              </div>
              <div>
                <input
                  ref={(el) => { fileInputRefs.current[cat.key] = el; }}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => handleUpload(cat.key, e.target.files)}
                  disabled={isUploading}
                />
                <button
                  type="button"
                  onClick={() => fileInputRefs.current[cat.key]?.click()}
                  disabled={isUploading}
                  className="rounded-lg border border-slate-600 bg-slate-700 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-600 transition-colors disabled:opacity-50 whitespace-nowrap"
                >
                  {isUploading ? 'Uploading...' : hasPhotos ? '+ Add More' : 'Upload'}
                </button>
              </div>
            </div>

            {/* Error */}
            {err && (
              <p className="text-xs text-red-400 bg-red-500/10 rounded-lg px-3 py-2">{err}</p>
            )}

            {/* Photo thumbnails */}
            {hasPhotos && (
              <div className="grid grid-cols-3 gap-2">
                {photos.map((photo) => (
                  <div key={photo.id} className="relative group rounded-lg overflow-hidden border border-slate-700 bg-slate-900 aspect-square">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photo.publicUrl} alt={cat.label} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleDelete(cat.key, photo)}
                      className="absolute top-1 right-1 rounded-full bg-slate-900/80 text-slate-300 hover:text-red-400 hover:bg-slate-900 opacity-0 group-hover:opacity-100 transition-all w-5 h-5 flex items-center justify-center text-[10px] font-bold"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
