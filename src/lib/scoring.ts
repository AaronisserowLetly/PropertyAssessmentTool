import { Assessment, ConditionRating } from './types';

const CONDITION_SCORES: Record<string, number> = {
  good: 3,
  fair: 2,
  poor: 1,
  '': 0,
};

export function calculateOverallScore(assessment: Assessment): number | null {
  const conditionFields: ConditionRating[] = [
    assessment.exterior_roof_condition,
    assessment.exterior_walls_condition,
    assessment.exterior_windows_condition,
    assessment.exterior_doors_condition,
    assessment.exterior_gutters_condition,
    assessment.exterior_garden_condition,
    assessment.interior_kitchen_condition,
    assessment.interior_bathroom_condition,
    assessment.interior_bedroom_condition,
    assessment.interior_living_condition,
    assessment.interior_flooring_condition,
    assessment.interior_walls_condition,
    assessment.interior_ceilings_condition,
    assessment.systems_heating_condition,
    assessment.systems_electrics_condition,
    assessment.systems_plumbing_condition,
  ];

  const rated = conditionFields.filter((f) => f !== '');
  if (rated.length === 0) return null;

  const total = rated.reduce((sum, f) => sum + (CONDITION_SCORES[f] || 0), 0);
  const score = (total / (rated.length * 3)) * 10;
  return Math.round(score * 10) / 10;
}

export function getScoreLabel(score: number | null): string {
  if (score === null) return 'Not Rated';
  if (score >= 8) return 'Excellent';
  if (score >= 6) return 'Good';
  if (score >= 4) return 'Fair';
  if (score >= 2) return 'Poor';
  return 'Very Poor';
}

export function getScoreColor(score: number | null): string {
  if (score === null) return 'text-gray-400';
  if (score >= 8) return 'text-emerald-400';
  if (score >= 6) return 'text-green-400';
  if (score >= 4) return 'text-yellow-400';
  if (score >= 2) return 'text-orange-400';
  return 'text-red-400';
}

export function getRedFlagCount(assessment: Assessment): number {
  let count = 0;
  if (assessment.red_flags_damp) count++;
  if (assessment.red_flags_cracks) count++;
  if (assessment.red_flags_subsidence) count++;
  if (assessment.red_flags_pests) count++;
  if (assessment.red_flags_asbestos) count++;
  if (assessment.red_flags_japanese_knotweed) count++;
  if (assessment.red_flags_flood_risk) count++;
  if (assessment.red_flags_noise) count++;
  return count;
}
