'use client';

import { Assessment } from '@/lib/types';
import { TextAreaField, SectionHeader } from '@/components/FormFields';
import PhotoUpload from '@/components/PhotoUpload';

interface Props {
  data: Assessment;
  onChange: (updates: Partial<Assessment>) => void;
  assessmentId?: string | null;
}

export default function Step7Notes({ data, onChange, assessmentId }: Props) {
  return (
    <div className="space-y-6">
      <SectionHeader
        icon="📝"
        title="Notes & Overall Impression"
        description="Final thoughts before you wrap up. This is your chance to capture anything that doesn't fit neatly into the other sections."
      />

      <TextAreaField
        label="Estimated Monthly Rent"
        hint="In your professional opinion, what would be a suitable monthly rent for this property?"
        value={data.estimated_monthly_rent}
        onChange={(v) => onChange({ estimated_monthly_rent: v })}
        placeholder="e.g. £2,500 pcm — well-presented 3-bed in strong rental area"
        rows={3}
      />

      <TextAreaField
        label="Overall Impression"
        hint="In your own words — what's your gut feeling about this property? Would you live here? What stood out (good or bad)?"
        value={data.overall_impression}
        onChange={(v) => onChange({ overall_impression: v })}
        placeholder="e.g. Well-maintained 3-bed in a quiet street. Kitchen is dated but everything else is in good shape. Great natural light throughout. The garden is a real selling point."
        rows={5}
      />

      <TextAreaField
        label="General Notes"
        hint="Anything else the team should know? Questions for the landlord? Things to follow up on?"
        value={data.general_notes}
        onChange={(v) => onChange({ general_notes: v })}
        placeholder="e.g. Need to confirm lease length remaining. Landlord mentioned a new boiler was fitted in 2023. Loft conversion potential..."
        rows={5}
      />

      <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-5 space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">📷</span>
          <h3 className="text-base font-semibold text-white">Photo Requirements</h3>
        </div>
        <p className="text-sm text-slate-300">
          Photos must be submitted before you complete this assessment. Upload photos for each category below — the Letly team reviews these alongside your written report.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-400">
          <div className="flex items-start gap-1.5"><span className="text-red-400 mt-0.5">●</span> Front &amp; rear exterior</div>
          <div className="flex items-start gap-1.5"><span className="text-red-400 mt-0.5">●</span> Parking area</div>
          <div className="flex items-start gap-1.5"><span className="text-red-400 mt-0.5">●</span> Kitchen</div>
          <div className="flex items-start gap-1.5"><span className="text-red-400 mt-0.5">●</span> All bathrooms &amp; en-suites</div>
          <div className="flex items-start gap-1.5"><span className="text-red-400 mt-0.5">●</span> All bedrooms</div>
          <div className="flex items-start gap-1.5"><span className="text-red-400 mt-0.5">●</span> Living areas</div>
          <div className="flex items-start gap-1.5"><span className="text-red-400 mt-0.5">●</span> Boiler, fuse box &amp; meters</div>
          <div className="flex items-start gap-1.5"><span className="text-slate-500 mt-0.5">●</span> Defects / issues (if any)</div>
        </div>
      </div>
      <PhotoUpload assessmentId={assessmentId ?? null} />
    </div>
  );
}
