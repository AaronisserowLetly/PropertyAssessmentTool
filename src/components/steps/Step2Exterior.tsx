'use client';

import { Assessment, WINDOW_TYPES, PARKING_OPTIONS } from '@/lib/types';
import { ConditionRatingField, SelectField, MultiSelectField, SectionHeader } from '@/components/FormFields';

interface Props {
  data: Assessment;
  onChange: (updates: Partial<Assessment>) => void;
}

export default function Step2Exterior({ data, onChange }: Props) {
  return (
    <div className="space-y-4">
      <SectionHeader
        icon="🏗️"
        title="Exterior Condition"
        description="Walk around the outside of the property. Rate each area — if something isn't perfect, mark it Fair or Poor and note what you see."
      />

      <ConditionRatingField
        label="Roof"
        hint="Look for sagging, missing tiles/slates, moss buildup, or visible damage. Stand back to get a good view."
        value={data.exterior_roof_condition}
        onChange={(v) => onChange({ exterior_roof_condition: v as Assessment['exterior_roof_condition'] })}
        notesValue={data.exterior_roof_notes}
        onNotesChange={(v) => onChange({ exterior_roof_notes: v })}
      />

      <ConditionRatingField
        label="External Walls"
        hint="Look for cracks, staining, peeling paint, damaged render, or crumbling mortar between bricks."
        value={data.exterior_walls_condition}
        onChange={(v) => onChange({ exterior_walls_condition: v as Assessment['exterior_walls_condition'] })}
        notesValue={data.exterior_walls_notes}
        onNotesChange={(v) => onChange({ exterior_walls_notes: v })}
      />

      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4 space-y-3">
        <ConditionRatingField
          label="Windows"
          hint="Check for condensation between panes (failed seals), rotten frames, difficulty opening/closing."
          value={data.exterior_windows_condition}
          onChange={(v) => onChange({ exterior_windows_condition: v as Assessment['exterior_windows_condition'] })}
          notesValue={data.exterior_windows_notes}
          onNotesChange={(v) => onChange({ exterior_windows_notes: v })}
        />
        <SelectField
          label="Window Type"
          hint="Double glazed is standard. Single glazed = older property, likely poor insulation."
          value={data.exterior_windows_type}
          onChange={(v) => onChange({ exterior_windows_type: v })}
          options={WINDOW_TYPES}
        />
      </div>

      <ConditionRatingField
        label="External Doors"
        hint="Do they close properly? Any warping, rot, or security concerns? Check front and back doors."
        value={data.exterior_doors_condition}
        onChange={(v) => onChange({ exterior_doors_condition: v as Assessment['exterior_doors_condition'] })}
        notesValue={data.exterior_doors_notes}
        onNotesChange={(v) => onChange({ exterior_doors_notes: v })}
      />

      <ConditionRatingField
        label="Gutters & Drainage"
        hint="Look for blocked, leaking, or missing sections. Check downpipes. Any standing water near the building?"
        value={data.exterior_gutters_condition}
        onChange={(v) => onChange({ exterior_gutters_condition: v as Assessment['exterior_gutters_condition'] })}
        notesValue={data.exterior_gutters_notes}
        onNotesChange={(v) => onChange({ exterior_gutters_notes: v })}
      />

      <ConditionRatingField
        label="Garden / Grounds"
        hint="General condition — overgrown? Fences/walls intact? Paving in good shape? Usable outdoor space?"
        value={data.exterior_garden_condition}
        onChange={(v) => onChange({ exterior_garden_condition: v as Assessment['exterior_garden_condition'] })}
        notesValue={data.exterior_garden_notes}
        onNotesChange={(v) => onChange({ exterior_garden_notes: v })}
      />

      <MultiSelectField
        label="Parking"
        hint="Select all that apply"
        value={data.exterior_parking}
        onChange={(v) => onChange({ exterior_parking: v })}
        options={PARKING_OPTIONS}
      />
    </div>
  );
}
