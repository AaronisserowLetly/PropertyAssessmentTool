'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';

interface Photo {
  id: string;
  file_path: string;
  caption: string;
  publicUrl: string;
}

interface Props {
  assessmentId: string | null;
}

export default function PhotoUpload({ assessmentId }: Props) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (assessmentId) {
      fetchPhotos();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assessmentId]);

  async function fetchPhotos() {
    if (!assessmentId) return;
    const { data, error } = await supabase
      .from('assessment_photos')
      .select('*')
      .eq('assessment_id', assessmentId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Failed to load photos:', error);
      return;
    }

    const photosWithUrls = (data || []).map((row) => {
      const { data: urlData } = supabase.storage
        .from('assessment-photos')
        .getPublicUrl(row.file_path);
      return {
        id: row.id,
        file_path: row.file_path,
        caption: row.caption || '',
        publicUrl: urlData.publicUrl,
      };
    });

    setPhotos(photosWithUrls);
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!assessmentId || !e.target.files || e.target.files.length === 0) return;
    setUploading(true);
    setError(null);

    const files = Array.from(e.target.files);
    const uploadedPhotos: Photo[] = [];

    try {
      for (const file of files) {
        const path = `${assessmentId}/${Date.now()}_${file.name}`;

        const { error: uploadError } = await supabase.storage
          .from('assessment-photos')
          .upload(path, file);

        if (uploadError) {
          throw new Error(`Failed to upload ${file.name}: ${uploadError.message}`);
        }

        const { data: urlData } = supabase.storage
          .from('assessment-photos')
          .getPublicUrl(path);

        const { data: dbRow, error: dbError } = await supabase
          .from('assessment_photos')
          .insert({
            assessment_id: assessmentId,
            category: 'general',
            file_path: path,
            caption: '',
          })
          .select('id')
          .single();

        if (dbError) {
          throw new Error(`Failed to save photo record: ${dbError.message}`);
        }

        uploadedPhotos.push({
          id: dbRow.id,
          file_path: path,
          caption: '',
          publicUrl: urlData.publicUrl,
        });
      }

      setPhotos((prev) => [...prev, ...uploadedPhotos]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  async function handleDelete(photo: Photo) {
    try {
      await supabase.storage.from('assessment-photos').remove([photo.file_path]);
      await supabase.from('assessment_photos').delete().eq('id', photo.id);
      setPhotos((prev) => prev.filter((p) => p.id !== photo.id));
    } catch (err) {
      setError('Failed to delete photo');
      console.error(err);
    }
  }

  if (!assessmentId) {
    return (
      <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4 text-sm text-slate-400">
        Save your draft first to enable photo uploads.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Upload button */}
      <div className="flex items-center gap-3">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
          disabled={uploading}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? 'Uploading...' : 'Upload Photos'}
        </button>
        {photos.length > 0 && (
          <span className="text-xs text-slate-400">{photos.length} photo{photos.length !== 1 ? 's' : ''} uploaded</span>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-300">
          {error}
        </div>
      )}

      {/* Photo grid */}
      {photos.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {photos.map((photo) => (
            <div key={photo.id} className="relative group rounded-lg overflow-hidden border border-slate-700 bg-slate-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.publicUrl}
                alt="Assessment photo"
                className="w-full h-32 object-cover"
              />
              <button
                type="button"
                onClick={() => handleDelete(photo)}
                className="absolute top-1.5 right-1.5 rounded-full bg-slate-900/80 text-slate-300 hover:text-red-400 hover:bg-slate-900 opacity-0 group-hover:opacity-100 transition-all w-6 h-6 flex items-center justify-center text-xs font-bold"
                title="Delete photo"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
