-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Assessors/profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE,
  full_name TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Main assessments table
CREATE TABLE IF NOT EXISTS assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  assessor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'in_progress', 'completed')),

  -- Step 1: Property Details
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

  -- Step 2: Exterior
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

  -- Step 3: Interior
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

  -- Step 4: Building Systems
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

  -- Step 5: Red Flags
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

  -- Step 6: Location
  location_transport TEXT,
  location_schools TEXT,
  location_shops TEXT,
  location_amenities TEXT,
  location_neighbourhood TEXT,
  location_comparable_prices TEXT,
  location_notes TEXT,

  -- Step 7: Notes & Photos
  general_notes TEXT,
  overall_impression TEXT,

  -- Auto-calculated
  overall_condition_score NUMERIC(3,1),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Photos table
CREATE TABLE IF NOT EXISTS assessment_photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  assessment_id UUID NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  file_path TEXT NOT NULL,
  caption TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance at scale
CREATE INDEX IF NOT EXISTS idx_assessments_assessor ON assessments(assessor_id);
CREATE INDEX IF NOT EXISTS idx_assessments_status ON assessments(status);
CREATE INDEX IF NOT EXISTS idx_assessments_created ON assessments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_photos_assessment ON assessment_photos(assessment_id);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_photos ENABLE ROW LEVEL SECURITY;

-- For now, allow all operations (we'll tighten this when auth is added)
CREATE POLICY "Allow all operations on profiles" ON profiles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on assessments" ON assessments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on assessment_photos" ON assessment_photos FOR ALL USING (true) WITH CHECK (true);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_assessments_updated_at BEFORE UPDATE ON assessments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
