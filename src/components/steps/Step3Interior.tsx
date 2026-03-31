'use client';

import { Assessment, FLOORING_TYPES, NATURAL_LIGHT_RATINGS, ROOM_SIZES } from '@/lib/types';
import { ConditionRatingField, NumberField, SelectField, TextAreaField, SectionHeader } from '@/components/FormFields';

interface Props {
  data: Assessment;
  onChange: (updates: Partial<Assessment>) => void;
}

export default function Step3Interior({ data, onChange }: Props) {
  return (
    <div className="space-y-4">
      <SectionHeader
        icon="🛋️"
        title="Interior Condition"
        description="Go room by room. Rate the overall condition and note anything that stands out — good or bad."
      />

      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4 space-y-4">
        <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wide">Kitchen</h3>
        <ConditionRatingField
          label="Kitchen Condition"
          hint="Check worktops, cabinets, appliances, tiling, sink, and taps. Are they modern or dated?"
          value={data.interior_kitchen_condition}
          onChange={(v) => onChange({ interior_kitchen_condition: v as Assessment['interior_kitchen_condition'] })}
          notesValue={data.interior_kitchen_notes}
          onNotesChange={(v) => onChange({ interior_kitchen_notes: v })}
        />
        <SelectField
          label="Kitchen Size"
          hint="Relative to the property"
          value={data.interior_kitchen_size}
          onChange={(v) => onChange({ interior_kitchen_size: v })}
          options={ROOM_SIZES}
        />
      </div>

      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4 space-y-4">
        <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wide">Bathrooms</h3>
        <NumberField
          label="Number of Bathrooms"
          hint="Include en-suites, shower rooms, and WCs"
          value={data.interior_bathroom_count}
          onChange={(v) => onChange({ interior_bathroom_count: v })}
          placeholder="e.g. 2"
          min={0}
          max={10}
        />
        <ConditionRatingField
          label="Bathroom Condition"
          hint="Check fixtures, tiling, grouting, ventilation, water pressure. Any mould around the bath/shower?"
          value={data.interior_bathroom_condition}
          onChange={(v) => onChange({ interior_bathroom_condition: v as Assessment['interior_bathroom_condition'] })}
          notesValue={data.interior_bathroom_notes}
          onNotesChange={(v) => onChange({ interior_bathroom_notes: v })}
        />
      </div>

      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4 space-y-4">
        <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wide">Bedrooms</h3>
        <div className="grid grid-cols-2 gap-4">
          <NumberField
            label="Number of Bedrooms"
            value={data.interior_bedroom_count}
            onChange={(v) => onChange({ interior_bedroom_count: v })}
            placeholder="e.g. 3"
            min={0}
            max={20}
          />
          <SelectField
            label="Bedroom Sizes"
            hint="Overall impression"
            value={data.interior_bedroom_sizes}
            onChange={(v) => onChange({ interior_bedroom_sizes: v })}
            options={ROOM_SIZES}
          />
        </div>
        <ConditionRatingField
          label="Bedroom Condition"
          hint="General state of the bedrooms — walls, ceilings, flooring, fitted wardrobes."
          value={data.interior_bedroom_condition}
          onChange={(v) => onChange({ interior_bedroom_condition: v as Assessment['interior_bedroom_condition'] })}
          notesValue={data.interior_bedroom_notes}
          onNotesChange={(v) => onChange({ interior_bedroom_notes: v })}
        />
      </div>

      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4 space-y-4">
        <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wide">Living Areas</h3>
        <ConditionRatingField
          label="Living Room / Reception"
          hint="Layout, size, general condition. Does it feel spacious or cramped?"
          value={data.interior_living_condition}
          onChange={(v) => onChange({ interior_living_condition: v as Assessment['interior_living_condition'] })}
          notesValue={data.interior_living_notes}
          onNotesChange={(v) => onChange({ interior_living_notes: v })}
        />
        <SelectField
          label="Natural Light"
          hint="How bright do the rooms feel? Large windows facing south = best."
          value={data.interior_living_natural_light}
          onChange={(v) => onChange({ interior_living_natural_light: v })}
          options={NATURAL_LIGHT_RATINGS}
        />
      </div>

      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4 space-y-4">
        <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wide">General Interior</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            label="Main Flooring Type"
            value={data.interior_flooring_type}
            onChange={(v) => onChange({ interior_flooring_type: v })}
            options={FLOORING_TYPES}
          />
          <ConditionRatingField
            label="Flooring Condition"
            hint="Worn? Stained? Damaged? Or well-maintained?"
            value={data.interior_flooring_condition}
            onChange={(v) => onChange({ interior_flooring_condition: v as Assessment['interior_flooring_condition'] })}
            notesValue={''}
            onNotesChange={() => {}}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ConditionRatingField
            label="Walls & Paintwork"
            hint="Cracks, stains, peeling paint, damp patches?"
            value={data.interior_walls_condition}
            onChange={(v) => onChange({ interior_walls_condition: v as Assessment['interior_walls_condition'] })}
            notesValue={''}
            onNotesChange={() => {}}
          />
          <ConditionRatingField
            label="Ceilings"
            hint="Stains (potential leaks), cracks, sagging, artex/textured coating?"
            value={data.interior_ceilings_condition}
            onChange={(v) => onChange({ interior_ceilings_condition: v as Assessment['interior_ceilings_condition'] })}
            notesValue={''}
            onNotesChange={() => {}}
          />
        </div>
        <TextAreaField
          label="General Interior Notes"
          hint="Anything else worth noting? Storage space, layout flow, general feel?"
          value={data.interior_general_notes}
          onChange={(v) => onChange({ interior_general_notes: v })}
          placeholder="e.g. Good storage throughout, but the hallway is narrow..."
        />
      </div>
    </div>
  );
}
