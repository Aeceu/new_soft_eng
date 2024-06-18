export type RegionAndProvinceType = {
  code: string;
  name: string;
  regionName: string;
  islandGroupCode: string;
  psgc10DigitCode: string;
};

export type CityType = {
  code: string;
  name: string;
  oldName: string;
  isCapital: string;
  districtCode: string | boolean;
  provinceCode: string;
  regionCode: string;
  islandGroupCode: string;
};

export type BarangayType = {
  code: string;
  name: string;
};

export type DistrictType = {
  code: string;
  name: string;
  regionCode: string;
  islandGroupCode: string;
};
