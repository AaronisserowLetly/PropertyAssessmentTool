'use client';

import { Assessment } from '@/lib/types';
import { RedFlagField, TextAreaField, SectionHeader } from '@/components/FormFields';

interface Props {
  data: Assessment;
  onChange: (updates: Partial<Assessment>) => void;
}

export default function Step5RedFlags({ data, onChange }: Props) {
  return (
    <div className="space-y-4">
      <SectionHeader
        icon="🚩"
        title="Red Flags & Issues"
        description="These are serious problems that can significantly affect a property's value. Tick any that apply — even if you're not 100% sure, flag it so the team can investigate."
      />

      <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-200">
        <strong>Tip:</strong> If you tick any of these, add a quick note about what you saw. Even &quot;musty smell in back bedroom&quot; helps the team.
      </div>

      <RedFlagField
        label="Signs of Damp or Mould"
        hint="Look for dark patches on walls/ceilings, musty smells, peeling wallpaper, condensation on windows, or white salt marks on brickwork."
        checked={data.red_flags_damp}
        onChange={(v) => onChange({ red_flags_damp: v })}
        notesValue={data.red_flags_damp_notes}
        onNotesChange={(v) => onChange({ red_flags_damp_notes: v })}
      />

      <RedFlagField
        label="Structural Cracks"
        hint="Cracks wider than a 10p coin, stepped diagonal cracks in brickwork, or cracks above windows/doors. Small hairline cracks are usually fine."
        checked={data.red_flags_cracks}
        onChange={(v) => onChange({ red_flags_cracks: v })}
        notesValue={data.red_flags_cracks_notes}
        onNotesChange={(v) => onChange({ red_flags_cracks_notes: v })}
      />

      <RedFlagField
        label="Signs of Subsidence"
        hint="Sloping floors, doors that stick or won't close, large cracks near corners of the building, or visible tilting/leaning."
        checked={data.red_flags_subsidence}
        onChange={(v) => onChange({ red_flags_subsidence: v })}
        notesValue={data.red_flags_subsidence_notes}
        onNotesChange={(v) => onChange({ red_flags_subsidence_notes: v })}
      />

      <RedFlagField
        label="Evidence of Pest Damage"
        hint="Look for droppings, gnaw marks, holes in woodwork, sawdust piles (woodworm), or wasp/bee nests."
        checked={data.red_flags_pests}
        onChange={(v) => onChange({ red_flags_pests: v })}
        notesValue={data.red_flags_pests_notes}
        onNotesChange={(v) => onChange({ red_flags_pests_notes: v })}
      />

      <RedFlagField
        label="Potential Asbestos"
        hint="Common in properties built before 1990. Look for textured ceilings (artex), old pipe lagging, or corrugated roofing. Don't touch or disturb it."
        checked={data.red_flags_asbestos}
        onChange={(v) => onChange({ red_flags_asbestos: v })}
        notesValue={data.red_flags_asbestos_notes}
        onNotesChange={(v) => onChange({ red_flags_asbestos_notes: v })}
      />

      <RedFlagField
        label="Japanese Knotweed or Invasive Plants"
        hint="Tall bamboo-like stems with heart-shaped leaves. Check boundaries and neighbouring properties too. Can cause serious structural damage."
        checked={data.red_flags_japanese_knotweed}
        onChange={(v) => onChange({ red_flags_japanese_knotweed: v })}
        notesValue={data.red_flags_japanese_knotweed_notes}
        onNotesChange={(v) => onChange({ red_flags_japanese_knotweed_notes: v })}
      />

      <RedFlagField
        label="Flood Risk Area"
        hint="Is the property near a river, stream, or low-lying area? Ask the landlord about any history of flooding."
        checked={data.red_flags_flood_risk}
        onChange={(v) => onChange({ red_flags_flood_risk: v })}
        notesValue={data.red_flags_flood_risk_notes}
        onNotesChange={(v) => onChange({ red_flags_flood_risk_notes: v })}
      />

      <RedFlagField
        label="Noise Issues"
        hint="Busy roads, railway lines, flight paths, pubs/clubs nearby, or noisy neighbours. Step outside and listen."
        checked={data.red_flags_noise}
        onChange={(v) => onChange({ red_flags_noise: v })}
        notesValue={data.red_flags_noise_notes}
        onNotesChange={(v) => onChange({ red_flags_noise_notes: v })}
      />

      <TextAreaField
        label="Other Issues or Concerns"
        hint="Anything else that raised an eyebrow? Boundary disputes, right of way, nearby development, etc."
        value={data.red_flags_other}
        onChange={(v) => onChange({ red_flags_other: v })}
        placeholder="e.g. Large construction site next door, neighbour's tree overhanging..."
      />
    </div>
  );
}
