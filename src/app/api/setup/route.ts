import { NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';

const SETUP_SQL = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE,
  full_name TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  assessor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'in_progress', 'completed')),
  property_address TEXT,
  property_city TEXT,
  property_postcode TEXT,
  property_type TEXT,
  year_built TEXT,
  num_stories INTEGER,
  lot_size TEXT,
  floor_area TEXT,
  floor_area_unit TEXT DEFAULT 'sqft',
  epc_rating TEXT,
  council_tax_band TEXT,
  tenure TEXT,
  exterior_roof_condition TEXT,
  exterior_roof_notes TEXT,
  exterior_walls_condition TEXT,
  exterior_walls_notes TEXT,
  exterior_windows_condition TEXT,
  exterior_windows_type TEXT,
  exterior_windows_notes TEXT,
  exterior_doors_condition TEXT,
  exterior_doors_notes TEXT,
  exterior_gutters_condition TEXT,
  exterior_gutters_notes TEXT,
  exterior_garden_condition TEXT,
  exterior_garden_notes TEXT,
  exterior_parking TEXT,
  exterior_parking_notes TEXT,
  interior_kitchen_condition TEXT,
  interior_kitchen_size TEXT,
  interior_kitchen_notes TEXT,
  interior_bathroom_count INTEGER,
  interior_bathroom_condition TEXT,
  interior_bathroom_notes TEXT,
  interior_bedroom_count INTEGER,
  interior_bedroom_sizes TEXT,
  interior_bedroom_condition TEXT,
  interior_bedroom_notes TEXT,
  interior_living_condition TEXT,
  interior_living_natural_light TEXT,
  interior_living_notes TEXT,
  interior_flooring_type TEXT,
  interior_flooring_condition TEXT,
  interior_walls_condition TEXT,
  interior_ceilings_condition TEXT,
  interior_general_notes TEXT,
  systems_heating_type TEXT,
  systems_heating_condition TEXT,
  systems_heating_notes TEXT,
  systems_hot_water TEXT,
  systems_electrics_condition TEXT,
  systems_electrics_notes TEXT,
  systems_plumbing_condition TEXT,
  systems_plumbing_notes TEXT,
  systems_insulation TEXT,
  systems_insulation_notes TEXT,
  systems_broadband TEXT,
  red_flags_damp BOOLEAN DEFAULT FALSE,
  red_flags_damp_notes TEXT,
  red_flags_cracks BOOLEAN DEFAULT FALSE,
  red_flags_cracks_notes TEXT,
  red_flags_subsidence BOOLEAN DEFAULT FALSE,
  red_flags_subsidence_notes TEXT,
  red_flags_pests BOOLEAN DEFAULT FALSE,
  red_flags_pests_notes TEXT,
  red_flags_asbestos BOOLEAN DEFAULT FALSE,
  red_flags_asbestos_notes TEXT,
  red_flags_japanese_knotweed BOOLEAN DEFAULT FALSE,
  red_flags_japanese_knotweed_notes TEXT,
  red_flags_flood_risk BOOLEAN DEFAULT FALSE,
  red_flags_flood_risk_notes TEXT,
  red_flags_noise BOOLEAN DEFAULT FALSE,
  red_flags_noise_notes TEXT,
  red_flags_other TEXT,
  location_transport TEXT,
  location_schools TEXT,
  location_shops TEXT,
  location_amenities TEXT,
  location_neighbourhood TEXT,
  location_comparable_prices TEXT,
  location_notes TEXT,
  general_notes TEXT,
  overall_impression TEXT,
  overall_condition_score NUMERIC(3,1),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS assessment_photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  assessment_id UUID NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  file_path TEXT NOT NULL,
  caption TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
`;

export async function POST() {
  try {
    const supabase = getServiceClient();

    // Try creating a test record to see if the table exists
    const { error: testError } = await supabase
      .from('assessments')
      .select('id')
      .limit(1);

    if (testError?.code === 'PGRST205') {
      // Tables don't exist yet - user needs to run SQL manually
      return NextResponse.json({
        success: false,
        message: 'Tables not found. Please run the SQL in supabase-setup.sql via the Supabase Dashboard SQL Editor.',
        sql_file: 'supabase-setup.sql',
      }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: 'Database is ready!' });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
