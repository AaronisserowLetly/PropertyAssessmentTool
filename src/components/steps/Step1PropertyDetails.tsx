'use client';

import { Assessment, PROPERTY_TYPES, TENURE_TYPES, EPC_RATINGS, COUNCIL_TAX_BANDS } from '@/lib/types';
import { TextField, NumberField, SelectField, SectionHeader } from '@/components/FormFields';

interface Props {
  data: Assessment;
  onChange: (updates: Partial<Assessment>) => void;
}

export default function Step1PropertyDetails({ data, onChange }: Props) {
  return (
    <div className="space-y-6">
      <SectionHeader
        icon="🏠"
        title="Property Details"
        description="Basic information about the property. Check the listing or ask the landlord if you're unsure."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <TextField
            label="Property Address"
            hint="Full street address"
            value={data.property_address}
            onChange={(v) => onChange({ property_address: v })}
            placeholder="e.g. 42 High Street"
          />
        </div>
        <TextField
          label="City / Town"
          value={data.property_city}
          onChange={(v) => onChange({ property_city: v })}
          placeholder="e.g. Manchester"
        />
        <TextField
          label="Postcode"
          value={data.property_postcode}
          onChange={(v) => onChange({ property_postcode: v })}
          placeholder="e.g. M1 4BT"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField
          label="Property Type"
          hint="What kind of building is it?"
          value={data.property_type}
          onChange={(v) => onChange({ property_type: v })}
          options={PROPERTY_TYPES}
        />
        <SelectField
          label="Tenure"
          hint="Freehold = you own the land. Leasehold = you lease it."
          value={data.tenure}
          onChange={(v) => onChange({ tenure: v })}
          options={TENURE_TYPES}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TextField
          label="Year Built"
          hint="Approximate is fine"
          value={data.year_built}
          onChange={(v) => onChange({ year_built: v })}
          placeholder="e.g. 1985"
        />
        <NumberField
          label="Number of Stories"
          hint="How many floors?"
          value={data.num_stories}
          onChange={(v) => onChange({ num_stories: v })}
          placeholder="e.g. 2"
          min={1}
          max={20}
        />
        <TextField
          label="Lot / Plot Size"
          hint="Garden + building footprint"
          value={data.lot_size}
          onChange={(v) => onChange({ lot_size: v })}
          placeholder="e.g. 0.1 acres"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <TextField
              label="Total Floor Area"
              hint="Total internal living space"
              value={data.floor_area}
              onChange={(v) => onChange({ floor_area: v })}
              placeholder="e.g. 1200"
            />
          </div>
          <div className="w-24 self-end">
            <SelectField
              label=""
              value={data.floor_area_unit}
              onChange={(v) => onChange({ floor_area_unit: v })}
              options={['sqft', 'sqm']}
            />
          </div>
        </div>
        <SelectField
          label="EPC Rating"
          hint="Energy Performance Certificate (A=best, G=worst)"
          value={data.epc_rating}
          onChange={(v) => onChange({ epc_rating: v })}
          options={EPC_RATINGS}
        />
        <SelectField
          label="Council Tax Band"
          hint="Check the listing or council website"
          value={data.council_tax_band}
          onChange={(v) => onChange({ council_tax_band: v })}
          options={COUNCIL_TAX_BANDS}
        />
      </div>
    </div>
  );
}
