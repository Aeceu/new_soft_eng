import { Dispatch, SetStateAction, useEffect } from "react";
import { BarangayType, CityType, RegionAndProvinceType } from "../redux/types/address";
import {
  fetchBarangaysByCity,
  fetchBarangaysByProvince,
  fetchCitiesByProvince,
  fetchCitiesByRegion,
  fetchProviceByRegion,
  fetchRegion,
} from "../redux/actions/addressAction";
import getZipCode from "./getZipCode";

type Props = {
  watchRegion: string;
  watchProvince: string | undefined;
  watchCity: string | undefined;
  zipCode: string;
  selectedBaranggay: string;
  selectedCity: string;
  setZipCode: Dispatch<SetStateAction<string>>;
  setRegions: Dispatch<SetStateAction<RegionAndProvinceType[]>>;
  setProvinces: Dispatch<SetStateAction<RegionAndProvinceType[]>>;
  setCities: Dispatch<SetStateAction<CityType[]>>;
  setBarangays: Dispatch<SetStateAction<BarangayType[]>>;
};
const WatchAddress = ({
  watchCity,
  watchProvince,
  watchRegion,
  selectedBaranggay,
  selectedCity,
  setBarangays,
  setCities,
  setProvinces,
  zipCode,
  setZipCode,
  setRegions,
}: Props) => {
  useEffect(() => {
    fetchRegion({ setRegions });
  }, []);
  useEffect(() => {
    if (watchRegion) {
      fetchProviceByRegion({ regionCode: watchRegion, setProvinces });
      fetchCitiesByRegion({ regionCode: watchRegion, setCities });
    }
  }, [watchRegion]);

  useEffect(() => {
    if (watchProvince) {
      fetchCitiesByProvince({ provinceCode: watchProvince, setCities });
    }
  }, [watchProvince]);

  useEffect(() => {
    if (watchCity) {
      fetchBarangaysByCity({ cityCode: watchCity, setBarangays });
    } else if (watchProvince) {
      fetchBarangaysByProvince({ provinceCode: watchProvince, setBarangays });
    }
  }, [watchCity, watchProvince]);

  useEffect(() => {
    if (!zipCode) {
      let foundZipCode = getZipCode.reverse(selectedBaranggay);
      if (!foundZipCode) {
        const trimmedCity = selectedCity.split("City of ");
        if (trimmedCity) {
          foundZipCode = getZipCode.reverse(trimmedCity[1]);
        } else {
          foundZipCode = getZipCode.reverse(selectedCity);
        }
      }

      if (foundZipCode) {
        setZipCode(foundZipCode);
      } else {
        setZipCode("");
      }
    }
  }, [zipCode, selectedCity, selectedBaranggay]);
};
export default WatchAddress;
