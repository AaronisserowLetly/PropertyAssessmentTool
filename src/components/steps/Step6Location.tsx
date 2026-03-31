'use client';

import { Assessment, PROXIMITY_RATINGS, NEIGHBOURHOOD_RATINGS } from '@/lib/types';
import { SelectField, TextAreaField, TextField, SectionHeader } from '@/components/FormFields';

interface Props {
  data: Assessment;
  onChange: (updates: Partial<Assessment>) => void;
}

export default function Step6Location({ data, onChange }: Props) {
  return (
    <div className="space-y-4">
      <SectionHeader
        icon="📍"
        title="Location & Surroundings"
        description="Location is one of the biggest factors in property value. Take a quick look around the neighbourhood."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField
          label="Public Transport"
          hint="Bus stops, train/tube stations — how close are they?"
          value={data.location_transport}
          onChange={(v) => onChange({ location_transport: v })}
          options={PROXIMITY_RATINGS}
        />
        <SelectField
          label="Schools"
          hint="Primary and secondary schools nearby?"
          value={data.location_schools}
          onChange={(v) => onChange({ location_schools: v })}
          options={PROXIMITY_RATINGS}
        />
        <SelectField
          label="Shops & Supermarkets"
          hint="Daily essentials within easy reach?"
          value={data.location_shops}
          onChange={(v) => onChange({ location_shops: v })}
          options={PROXIMITY_RATINGS}
        />
        <SelectField
          label="Amenities"
          hint="Parks, gyms, restaurants, healthcare?"
          value={data.location_amenities}
          onChange={(v) => onChange({ location_amenities: v })}
          options={PROXIMITY_RATINGS}
        />
      </div>

      <SelectField
        label="Neighbourhood Feel"
        hint="Walk around. Does it feel safe and well-maintained? Are other properties well-kept?"
        value={data.location_neighbourhood}
        onChange={(v) => onChange({ location_neighbourhood: v })}
        options={NEIGHBOURHOOD_RATINGS}
      />

      <TextField
        label="Comparable Property Prices"
        hint="If you know roughly what similar properties sell for nearby, note it here. Check Rightmove/Zoopla."
        value={data.location_comparable_prices}
        onChange={(v) => onChange({ location_comparable_prices: v })}
        placeholder="e.g. Similar 3-beds selling for £250k-£280k"
      />

      <TextAreaField
        label="Location Notes"
        hint="Anything else about the area? New developments planned, upcoming transport links, etc."
        value={data.location_notes}
        onChange={(v) => onChange({ location_notes: v })}
        placeholder="e.g. New tram line planned for 2027, lots of new builds going up nearby..."
      />
    </div>
  );
}
