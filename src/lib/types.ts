export type ConditionRating = 'good' | 'fair' | 'poor' | '';
export type YesNo = boolean;

export interface Assessment {
  id?: string;
  assessor_id?: string;
  status: 'draft' | 'in_progress' | 'completed';

  // Step 1: Property Details
  property_address: string;
  property_city: string;
  property_postcode: string;
  property_type: string;
  year_built: string;
  num_stories: number | null;
  lot_size: string;
  floor_area: string;
  floor_area_unit: string;
  epc_rating: string;
  council_tax_band: string;
  tenure: string;

  // Step 2: Exterior
  exterior_roof_condition: ConditionRating;
  exterior_roof_notes: string;
  exterior_walls_condition: ConditionRating;
  exterior_walls_notes: string;
  exterior_windows_condition: ConditionRating;
  exterior_windows_type: string;
  exterior_windows_notes: string;
  exterior_doors_condition: ConditionRating;
  exterior_doors_notes: string;
  exterior_gutters_condition: ConditionRating;
  exterior_gutters_notes: string;
  exterior_garden_condition: ConditionRating;
  exterior_garden_notes: string;
  exterior_parking: string;
  exterior_parking_notes: string;

  // Step 3: Interior
  interior_kitchen_condition: ConditionRating;
  interior_kitchen_size: string;
  interior_kitchen_notes: string;
  interior_bathroom_count: number | null;
  interior_bathroom_condition: ConditionRating;
  interior_bathroom_notes: string;
  interior_bedroom_count: number | null;
  interior_bedroom_sizes: string;
  interior_bedroom_condition: ConditionRating;
  interior_bedroom_notes: string;
  interior_living_condition: ConditionRating;
  interior_living_natural_light: string;
  interior_living_notes: string;
  interior_flooring_type: string;
  interior_flooring_condition: ConditionRating;
  interior_walls_condition: ConditionRating;
  interior_ceilings_condition: ConditionRating;
  interior_general_notes: string;

  // Step 4: Building Systems
  systems_heating_type: string;
  systems_heating_condition: ConditionRating;
  systems_heating_notes: string;
  systems_hot_water: string;
  systems_electrics_condition: ConditionRating;
  systems_electrics_notes: string;
  systems_plumbing_condition: ConditionRating;
  systems_plumbing_notes: string;
  systems_insulation: string;
  systems_insulation_notes: string;
  systems_broadband: string;

  // Step 5: Red Flags
  red_flags_damp: boolean;
  red_flags_damp_notes: string;
  red_flags_cracks: boolean;
  red_flags_cracks_notes: string;
  red_flags_subsidence: boolean;
  red_flags_subsidence_notes: string;
  red_flags_pests: boolean;
  red_flags_pests_notes: string;
  red_flags_asbestos: boolean;
  red_flags_asbestos_notes: string;
  red_flags_japanese_knotweed: boolean;
  red_flags_japanese_knotweed_notes: string;
  red_flags_flood_risk: boolean;
  red_flags_flood_risk_notes: string;
  red_flags_noise: boolean;
  red_flags_noise_notes: string;
  red_flags_other: string;

  // Step 6: Location
  location_transport: string;
  location_schools: string;
  location_shops: string;
  location_amenities: string;
  location_neighbourhood: string;
  location_comparable_prices: string;
  location_notes: string;

  // Step 7: Notes
  estimated_monthly_rent: string;
  general_notes: string;
  overall_impression: string;

  // Calculated
  overall_condition_score: number | null;
  created_at?: string;
  updated_at?: string;
}

export const EMPTY_ASSESSMENT: Assessment = {
  status: 'draft',
  property_address: '',
  property_city: '',
  property_postcode: '',
  property_type: '',
  year_built: '',
  num_stories: null,
  lot_size: '',
  floor_area: '',
  floor_area_unit: 'sqft',
  epc_rating: '',
  council_tax_band: '',
  tenure: '',
  exterior_roof_condition: '',
  exterior_roof_notes: '',
  exterior_walls_condition: '',
  exterior_walls_notes: '',
  exterior_windows_condition: '',
  exterior_windows_type: '',
  exterior_windows_notes: '',
  exterior_doors_condition: '',
  exterior_doors_notes: '',
  exterior_gutters_condition: '',
  exterior_gutters_notes: '',
  exterior_garden_condition: '',
  exterior_garden_notes: '',
  exterior_parking: '',
  exterior_parking_notes: '',
  interior_kitchen_condition: '',
  interior_kitchen_size: '',
  interior_kitchen_notes: '',
  interior_bathroom_count: null,
  interior_bathroom_condition: '',
  interior_bathroom_notes: '',
  interior_bedroom_count: null,
  interior_bedroom_sizes: '',
  interior_bedroom_condition: '',
  interior_bedroom_notes: '',
  interior_living_condition: '',
  interior_living_natural_light: '',
  interior_living_notes: '',
  interior_flooring_type: '',
  interior_flooring_condition: '',
  interior_walls_condition: '',
  interior_ceilings_condition: '',
  interior_general_notes: '',
  systems_heating_type: '',
  systems_heating_condition: '',
  systems_heating_notes: '',
  systems_hot_water: '',
  systems_electrics_condition: '',
  systems_electrics_notes: '',
  systems_plumbing_condition: '',
  systems_plumbing_notes: '',
  systems_insulation: '',
  systems_insulation_notes: '',
  systems_broadband: '',
  red_flags_damp: false,
  red_flags_damp_notes: '',
  red_flags_cracks: false,
  red_flags_cracks_notes: '',
  red_flags_subsidence: false,
  red_flags_subsidence_notes: '',
  red_flags_pests: false,
  red_flags_pests_notes: '',
  red_flags_asbestos: false,
  red_flags_asbestos_notes: '',
  red_flags_japanese_knotweed: false,
  red_flags_japanese_knotweed_notes: '',
  red_flags_flood_risk: false,
  red_flags_flood_risk_notes: '',
  red_flags_noise: false,
  red_flags_noise_notes: '',
  red_flags_other: '',
  location_transport: '',
  location_schools: '',
  location_shops: '',
  location_amenities: '',
  location_neighbourhood: '',
  location_comparable_prices: '',
  location_notes: '',
  estimated_monthly_rent: '',
  general_notes: '',
  overall_impression: '',
  overall_condition_score: null,
};

export const PROPERTY_TYPES = [
  'Detached House',
  'Semi-Detached House',
  'Terraced House',
  'End of Terrace',
  'Flat / Apartment',
  'Maisonette',
  'Bungalow',
  'Cottage',
  'Converted Property',
  'New Build',
  'Commercial',
  'Mixed Use',
  'Other',
];

export const TENURE_TYPES = ['Freehold', 'Leasehold', 'Share of Freehold', 'Commonhold', 'Unknown'];

export const EPC_RATINGS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'Unknown'];

export const COUNCIL_TAX_BANDS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'Unknown'];

export const HEATING_TYPES = [
  'Gas Central Heating',
  'Electric Heating',
  'Oil Central Heating',
  'Heat Pump (Air Source)',
  'Heat Pump (Ground Source)',
  'Underfloor Heating',
  'Storage Heaters',
  'Open Fire / Wood Burner',
  'No Heating',
  'Unknown',
];

export const WINDOW_TYPES = [
  'Double Glazed (uPVC)',
  'Double Glazed (Wood)',
  'Double Glazed (Aluminium)',
  'Triple Glazed',
  'Single Glazed',
  'Mixed',
  'Unknown',
];

export const FLOORING_TYPES = [
  'Carpet',
  'Hardwood',
  'Laminate',
  'Tile',
  'Vinyl/LVT',
  'Concrete',
  'Mixed',
  'Other',
];

export const PARKING_OPTIONS = [
  'Driveway',
  'Garage (Single)',
  'Garage (Double)',
  'On-Street Only',
  'Allocated Space',
  'Underground Parking',
  'Bicycle Storage',
  'No Parking',
  'Other',
];

export const PROXIMITY_RATINGS = [
  'Walking Distance (< 5 min)',
  'Short Walk (5-15 min)',
  'Drive Required (15-30 min)',
  'Far (30+ min)',
  'Not Applicable',
];

export const NEIGHBOURHOOD_RATINGS = [
  'Prime / Highly Desirable',
  'Up-and-Coming',
  'Established / Stable',
  'Mixed',
  'Declining',
];

export const NATURAL_LIGHT_RATINGS = [
  'Excellent - Very Bright',
  'Good - Well Lit',
  'Average',
  'Poor - Dark',
];

export const ROOM_SIZES = ['Large', 'Medium', 'Small', 'Mixed'];

export const INSULATION_OPTIONS = [
  'Well Insulated (modern standards)',
  'Partially Insulated',
  'Poorly Insulated',
  'Unknown',
];

export const BROADBAND_OPTIONS = [
  'Fibre (Ultrafast 100Mbps+)',
  'Fibre (Superfast 30-100Mbps)',
  'Standard Broadband',
  'Poor / Limited',
  'Unknown',
];

export const HOT_WATER_OPTIONS = [
  'Combi Boiler',
  'System Boiler with Cylinder',
  'Immersion Heater',
  'Instant Electric',
  'Thermal Store',
  'Unknown',
];

export const STEP_LABELS = [
  'Property Details',
  'Exterior',
  'Interior',
  'Building Systems',
  'Red Flags',
  'Location',
  'Notes & Photos',
  'Summary',
];
