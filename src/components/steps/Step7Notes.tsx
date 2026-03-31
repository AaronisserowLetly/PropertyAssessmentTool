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

      <SectionHeader
        icon="📷"
        title="Photos"
        description="Upload photos from your visit. These are stored securely and visible only to the Letly team."
      />
      <PhotoUpload assessmentId={assessmentId ?? null} />
    </div>
  );
}
