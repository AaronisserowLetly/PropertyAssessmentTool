'use client';

import { Assessment } from '@/lib/types';
import { TextAreaField, SectionHeader } from '@/components/FormFields';

interface Props {
  data: Assessment;
  onChange: (updates: Partial<Assessment>) => void;
}

export default function Step7Notes({ data, onChange }: Props) {
  return (
    <div className="space-y-6">
      <SectionHeader
        icon="📝"
        title="Notes & Overall Impression"
        description="Final thoughts before you wrap up. This is your chance to capture anything that doesn't fit neatly into the other sections."
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

      <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-4 text-sm text-blue-200">
        <strong>Reminder — Photos:</strong> Make sure you&apos;ve taken photos of:
        <ul className="mt-2 space-y-1 list-disc list-inside text-blue-300">
          <li>Front and rear of property</li>
          <li>Street scene</li>
          <li>Kitchen and all bathrooms</li>
          <li>Any defects or issues you flagged</li>
          <li>Garden/parking area</li>
          <li>Any standout features (period details, views, etc.)</li>
        </ul>
      </div>
    </div>
  );
}
