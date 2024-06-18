import axios from "../api";
import { Dispatch, SetStateAction } from "react";
import { BarangayType, CityType, RegionAndProvinceType } from "../types/address";

type fetchRegionProps = {
  setRegions: Dispatch<SetStateAction<RegionAndProvinceType[]>>;
};
export const fetchRegion = async ({ setRegions }: fetchRegionProps) => {
  try {
    const res = await axios.get("https://psgc.gitlab.io/api/regions/");
    setRegions(res.data);
  } catch (error) {
    console.log(error);
  }
};

type fetchProviceByRegionProps = {
  regionCode: string;
  setProvinces: Dispatch<SetStateAction<RegionAndProvinceType[]>>;
};
export const fetchProviceByRegion = async ({
  regionCode,
  setProvinces,
}: fetchProviceByRegionProps) => {
  try {
    const res = await axios.get(`https://psgc.gitlab.io/api/regions/${regionCode}/provinces`);
    setProvinces(res.data);
  } catch (error) {
    console.log(error);
  }
};

type fetchCitiesByProvinceProps = {
  provinceCode: string;
  setCities: Dispatch<SetStateAction<CityType[]>>;
};
export const fetchCitiesByProvince = async ({
  provinceCode,
  setCities,
}: fetchCitiesByProvinceProps) => {
  try {
    const res = await axios.get(
      `https://psgc.gitlab.io/api/provinces/${provinceCode}/cities-municipalities`
    );
    setCities(res.data);
  } catch (error) {
    console.log(error);
  }
};

type fetchCitiesByRegionProps = {
  regionCode: string;
  setCities: Dispatch<SetStateAction<CityType[]>>;
};
export const fetchCitiesByRegion = async ({ regionCode, setCities }: fetchCitiesByRegionProps) => {
  try {
    const res = await axios.get(
      `https://psgc.gitlab.io/api/regions/${regionCode}/cities-municipalities`
    );
    setCities(res.data);
  } catch (error) {
    console.log(error);
  }
};

type fetchBarangaysByCityProps = {
  cityCode: string;
  setBarangays: Dispatch<SetStateAction<BarangayType[]>>;
};
export const fetchBarangaysByCity = async ({
  cityCode,
  setBarangays,
}: fetchBarangaysByCityProps) => {
  try {
    const res = await axios.get(
      `https://psgc.gitlab.io/api/cities-municipalities/${cityCode}/barangays`
    );
    setBarangays(res.data);
  } catch (error) {
    console.log(error);
  }
};

type fetchBarangaysByProvinceProps = {
  provinceCode: string;
  setBarangays: Dispatch<SetStateAction<BarangayType[]>>;
};
export const fetchBarangaysByProvince = async ({
  provinceCode,
  setBarangays,
}: fetchBarangaysByProvinceProps) => {
  try {
    const res = await axios.get(`https://psgc.gitlab.io/api/provinces/${provinceCode}/barangays`);
    setBarangays(res.data);
  } catch (error) {
    console.log(error);
  }
};
