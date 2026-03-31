'use client';

import { Assessment, HEATING_TYPES, HOT_WATER_OPTIONS, INSULATION_OPTIONS, BROADBAND_OPTIONS } from '@/lib/types';
import { ConditionRatingField, SelectField, MultiSelectField, SectionHeader } from '@/components/FormFields';

interface Props {
  data: Assessment;
  onChange: (updates: Partial<Assessment>) => void;
}

export default function Step4Systems({ data, onChange }: Props) {
  return (
    <div className="space-y-4">
      <SectionHeader
        icon="⚙️"
        title="Building Systems"
        description="Check the key systems that keep the property running. Don't worry if you're not sure about some — just pick the closest option."
      />

      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4 space-y-4">
        <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wide">Heating</h3>
        <MultiSelectField
          label="Heating Type"
          hint="Select all that apply — some properties have more than one system"
          value={data.systems_heating_type}
          onChange={(v) => onChange({ systems_heating_type: v })}
          options={HEATING_TYPES}
        />
        <ConditionRatingField
          label="Heating Condition"
          hint="Are radiators working? Is the boiler modern (under 10 years old)? Any strange noises?"
          value={data.systems_heating_condition}
          onChange={(v) => onChange({ systems_heating_condition: v as Assessment['systems_heating_condition'] })}
          notesValue={data.systems_heating_notes}
          onNotesChange={(v) => onChange({ systems_heating_notes: v })}
        />
      </div>

      <SelectField
        label="Hot Water System"
        hint="Combi boiler = instant hot water, no tank. System boiler = has a separate hot water cylinder."
        value={data.systems_hot_water}
        onChange={(v) => onChange({ systems_hot_water: v })}
        options={HOT_WATER_OPTIONS}
      />

      <ConditionRatingField
        label="Electrics"
        hint="Is the fuse box modern (has RCD switches)? Any exposed wiring, broken sockets, or flickering lights?"
        value={data.systems_electrics_condition}
        onChange={(v) => onChange({ systems_electrics_condition: v as Assessment['systems_electrics_condition'] })}
        notesValue={data.systems_electrics_notes}
        onNotesChange={(v) => onChange({ systems_electrics_notes: v })}
      />

      <ConditionRatingField
        label="Plumbing"
        hint="Turn taps on/off. Check water pressure. Look under sinks for leaks. Any damp patches on walls/ceilings?"
        value={data.systems_plumbing_condition}
        onChange={(v) => onChange({ systems_plumbing_condition: v as Assessment['systems_plumbing_condition'] })}
        notesValue={data.systems_plumbing_notes}
        onNotesChange={(v) => onChange({ systems_plumbing_notes: v })}
      />

      <SelectField
        label="Insulation"
        hint="Double glazing? Loft insulation visible? Cavity wall insulation? Well-insulated homes have lower energy bills."
        value={data.systems_insulation}
        onChange={(v) => onChange({ systems_insulation: v })}
        options={INSULATION_OPTIONS}
      />

      <SelectField
        label="Broadband Availability"
        hint="Check the listing or ask. Fibre broadband adds value, especially for working from home."
        value={data.systems_broadband}
        onChange={(v) => onChange({ systems_broadband: v })}
        options={BROADBAND_OPTIONS}
      />
    </div>
  );
}
