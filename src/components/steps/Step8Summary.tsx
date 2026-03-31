'use client';

import { Assessment } from '@/lib/types';
import { calculateOverallScore, getScoreLabel, getScoreColor, getRedFlagCount } from '@/lib/scoring';
import { SectionHeader } from '@/components/FormFields';

interface Props {
  data: Assessment;
}

function ConditionBadge({ value }: { value: string }) {
  if (!value) return <span className="text-xs text-slate-500">Not rated</span>;
  const colors: Record<string, string> = {
    good: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    fair: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    poor: 'bg-red-500/20 text-red-300 border-red-500/30',
  };
  return (
    <span className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${colors[value] || ''}`}>
      {value}
    </span>
  );
}

function SummaryRow({ label, value, notes }: { label: string; value?: string; notes?: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-slate-700/50 last:border-0">
      <span className="text-sm text-slate-300">{label}</span>
      <div className="flex items-center gap-2">
        {notes && <span className="text-xs text-slate-400 max-w-48 truncate">{notes}</span>}
        {value ? <ConditionBadge value={value} /> : <span className="text-xs text-slate-500">—</span>}
      </div>
    </div>
  );
}

export default function Step8Summary({ data }: Props) {
  const score = calculateOverallScore(data);
  const redFlagCount = getRedFlagCount(data);

  return (
    <div className="space-y-6">
      <SectionHeader
        icon="📊"
        title="Assessment Summary"
        description="Review your assessment before submitting. You can go back to any section to make changes."
      />

      {/* Score Card */}
      <div className="rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">
              {data.property_address || 'No address entered'}
            </h3>
            <p className="text-sm text-slate-400">
              {[data.property_city, data.property_postcode].filter(Boolean).join(', ') || 'No location'}
            </p>
            <p className="text-sm text-slate-400 mt-1">
              {[data.property_type, data.tenure].filter(Boolean).join(' · ') || 'No details'}
            </p>
          </div>
          <div className="text-right">
            <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
              {score !== null ? score.toFixed(1) : '—'}
            </div>
            <div className={`text-sm font-medium ${getScoreColor(score)}`}>
              {getScoreLabel(score)}
            </div>
            <div className="text-xs text-slate-500 mt-1">out of 10</div>
          </div>
        </div>

        {redFlagCount > 0 && (
          <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 flex items-center gap-2">
            <span className="text-red-400 font-bold text-lg">⚠</span>
            <span className="text-sm text-red-300">
              <strong>{redFlagCount}</strong> red flag{redFlagCount > 1 ? 's' : ''} identified — review before proceeding
            </span>
          </div>
        )}
      </div>

      {/* Property Overview */}
      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
        <h4 className="text-sm font-semibold text-blue-400 uppercase tracking-wide mb-3">Property Overview</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-slate-400">Type</span>
            <p className="text-white font-medium">{data.property_type || '—'}</p>
          </div>
          <div>
            <span className="text-slate-400">Bedrooms</span>
            <p className="text-white font-medium">{data.interior_bedroom_count ?? '—'}</p>
          </div>
          <div>
            <span className="text-slate-400">Bathrooms</span>
            <p className="text-white font-medium">{data.interior_bathroom_count ?? '—'}</p>
          </div>
          <div>
            <span className="text-slate-400">Floor Area</span>
            <p className="text-white font-medium">
              {data.floor_area ? `${data.floor_area} ${data.floor_area_unit}` : '—'}
            </p>
          </div>
          <div>
            <span className="text-slate-400">EPC Rating</span>
            <p className="text-white font-medium">{data.epc_rating || '—'}</p>
          </div>
          <div>
            <span className="text-slate-400">Council Tax</span>
            <p className="text-white font-medium">{data.council_tax_band ? `Band ${data.council_tax_band}` : '—'}</p>
          </div>
          <div>
            <span className="text-slate-400">Heating</span>
            <p className="text-white font-medium">{data.systems_heating_type || '—'}</p>
          </div>
          <div>
            <span className="text-slate-400">Parking</span>
            <p className="text-white font-medium">{data.exterior_parking || '—'}</p>
          </div>
        </div>
      </div>

      {/* Exterior Conditions */}
      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
        <h4 className="text-sm font-semibold text-blue-400 uppercase tracking-wide mb-3">Exterior Condition</h4>
        <SummaryRow label="Roof" value={data.exterior_roof_condition} notes={data.exterior_roof_notes} />
        <SummaryRow label="External Walls" value={data.exterior_walls_condition} notes={data.exterior_walls_notes} />
        <SummaryRow label="Windows" value={data.exterior_windows_condition} notes={data.exterior_windows_notes} />
        <SummaryRow label="Doors" value={data.exterior_doors_condition} notes={data.exterior_doors_notes} />
        <SummaryRow label="Gutters & Drainage" value={data.exterior_gutters_condition} notes={data.exterior_gutters_notes} />
        <SummaryRow label="Garden / Grounds" value={data.exterior_garden_condition} notes={data.exterior_garden_notes} />
      </div>

      {/* Interior Conditions */}
      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
        <h4 className="text-sm font-semibold text-blue-400 uppercase tracking-wide mb-3">Interior Condition</h4>
        <SummaryRow label="Kitchen" value={data.interior_kitchen_condition} notes={data.interior_kitchen_notes} />
        <SummaryRow label="Bathrooms" value={data.interior_bathroom_condition} notes={data.interior_bathroom_notes} />
        <SummaryRow label="Bedrooms" value={data.interior_bedroom_condition} notes={data.interior_bedroom_notes} />
        <SummaryRow label="Living Areas" value={data.interior_living_condition} notes={data.interior_living_notes} />
        <SummaryRow label="Flooring" value={data.interior_flooring_condition} />
        <SummaryRow label="Walls & Paintwork" value={data.interior_walls_condition} />
        <SummaryRow label="Ceilings" value={data.interior_ceilings_condition} />
      </div>

      {/* Building Systems */}
      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
        <h4 className="text-sm font-semibold text-blue-400 uppercase tracking-wide mb-3">Building Systems</h4>
        <SummaryRow label="Heating" value={data.systems_heating_condition} notes={data.systems_heating_notes} />
        <SummaryRow label="Electrics" value={data.systems_electrics_condition} notes={data.systems_electrics_notes} />
        <SummaryRow label="Plumbing" value={data.systems_plumbing_condition} notes={data.systems_plumbing_notes} />
        <div className="flex items-center justify-between py-2 border-b border-slate-700/50">
          <span className="text-sm text-slate-300">Insulation</span>
          <span className="text-sm text-white">{data.systems_insulation || '—'}</span>
        </div>
        <div className="flex items-center justify-between py-2">
          <span className="text-sm text-slate-300">Broadband</span>
          <span className="text-sm text-white">{data.systems_broadband || '—'}</span>
        </div>
      </div>

      {/* Red Flags */}
      {redFlagCount > 0 && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4">
          <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wide mb-3">Red Flags</h4>
          {data.red_flags_damp && <FlagRow label="Damp / Mould" notes={data.red_flags_damp_notes} />}
          {data.red_flags_cracks && <FlagRow label="Structural Cracks" notes={data.red_flags_cracks_notes} />}
          {data.red_flags_subsidence && <FlagRow label="Subsidence" notes={data.red_flags_subsidence_notes} />}
          {data.red_flags_pests && <FlagRow label="Pest Damage" notes={data.red_flags_pests_notes} />}
          {data.red_flags_asbestos && <FlagRow label="Asbestos Risk" notes={data.red_flags_asbestos_notes} />}
          {data.red_flags_japanese_knotweed && <FlagRow label="Japanese Knotweed" notes={data.red_flags_japanese_knotweed_notes} />}
          {data.red_flags_flood_risk && <FlagRow label="Flood Risk" notes={data.red_flags_flood_risk_notes} />}
          {data.red_flags_noise && <FlagRow label="Noise Issues" notes={data.red_flags_noise_notes} />}
        </div>
      )}

      {/* Location */}
      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
        <h4 className="text-sm font-semibold text-blue-400 uppercase tracking-wide mb-3">Location</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><span className="text-slate-400">Transport</span><p className="text-white">{data.location_transport || '—'}</p></div>
          <div><span className="text-slate-400">Schools</span><p className="text-white">{data.location_schools || '—'}</p></div>
          <div><span className="text-slate-400">Shops</span><p className="text-white">{data.location_shops || '—'}</p></div>
          <div><span className="text-slate-400">Amenities</span><p className="text-white">{data.location_amenities || '—'}</p></div>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-700/50">
          <span className="text-sm text-slate-400">Neighbourhood</span>
          <p className="text-sm text-white">{data.location_neighbourhood || '—'}</p>
        </div>
        {data.location_comparable_prices && (
          <div className="mt-2">
            <span className="text-sm text-slate-400">Comparable Prices</span>
            <p className="text-sm text-white">{data.location_comparable_prices}</p>
          </div>
        )}
      </div>

      {/* Impressions */}
      {(data.overall_impression || data.general_notes || data.estimated_monthly_rent) && (
        <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4 space-y-3">
          <h4 className="text-sm font-semibold text-blue-400 uppercase tracking-wide">Notes & Impressions</h4>
          {data.overall_impression && (
            <div>
              <span className="text-xs text-slate-400">Overall Impression</span>
              <p className="text-sm text-slate-200 mt-1">{data.overall_impression}</p>
            </div>
          )}
          {data.general_notes && (
            <div>
              <span className="text-xs text-slate-400">General Notes</span>
              <p className="text-sm text-slate-200 mt-1">{data.general_notes}</p>
            </div>
          )}
          {data.estimated_monthly_rent && (
            <div>
              <span className="text-xs text-slate-400">Estimated Rent</span>
              <p className="text-sm text-slate-200 mt-1">{data.estimated_monthly_rent}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function FlagRow({ label, notes }: { label: string; notes: string }) {
  return (
    <div className="flex items-start gap-2 py-2 border-b border-red-500/10 last:border-0">
      <span className="text-red-400 mt-0.5">●</span>
      <div>
        <span className="text-sm font-medium text-red-300">{label}</span>
        {notes && <p className="text-xs text-red-400/70 mt-0.5">{notes}</p>}
      </div>
    </div>
  );
}
