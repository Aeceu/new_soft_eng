import { ChevronRight } from "lucide-react";
import { SubmitHandler, Controller, useForm } from "react-hook-form";
import { StepTwo } from "../../redux/types/user";
import { stepTwoSchema } from "../../schema/userSignupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { setNewUser } from "../../redux/slices/userSlice";
import { useState } from "react";
import toast from "react-hot-toast";
import { BarangayType, CityType, RegionAndProvinceType } from "../../redux/types/address";
import WatchAddress from "../../hooks/watchAddress";

type Props = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

const Address: React.FC<Props> = ({ setCurrentStep }) => {
  const [regions, setRegions] = useState<RegionAndProvinceType[]>([]);
  const [provinces, setProvinces] = useState<RegionAndProvinceType[]>([]);
  const [cities, setCities] = useState<CityType[]>([]);
  const [baranggays, setBarangays] = useState<BarangayType[]>([]);

  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedBaranggay, setSelectedBaranggay] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");

  const {
    handleSubmit,
    control,
    watch,
    register,
    formState: { errors },
  } = useForm<StepTwo>({
    resolver: zodResolver(stepTwoSchema),
  });

  const dispatch = useDispatch<AppDispatch>();
  const onSubmit: SubmitHandler<StepTwo> = (data: StepTwo) => {
    data.region = selectedRegion;
    data.province = selectedProvince;
    data.city = selectedCity;
    data.baranggay = selectedBaranggay;
    dispatch(setNewUser(data));
    toast.success("Address information done!");
    console.log(data);
    setCurrentStep((prev) => prev + 1);
  };

  const watchRegion = watch("region");
  const watchProvince = watch("province");
  const watchCity = watch("city");

  WatchAddress({
    watchCity,
    watchProvince,
    watchRegion,
    selectedBaranggay,
    selectedCity,
    zipCode,
    setZipCode,
    setBarangays,
    setCities,
    setProvinces,
    setRegions,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full grid grid-cols-4 gap-2 p-4">
      <h1 className="w-full col-span-4 text-3xl font-bold border-b">
        Home/Permanent Address Information
      </h1>

      <Controller
        name="region"
        control={control}
        render={({ field }) => (
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Region</span>
            </div>
            <select
              className="select select-bordered"
              {...field}
              onChange={(e) => {
                field.onChange(e);
                setSelectedRegion(e.target[e.target.selectedIndex].innerText);
                setProvinces([]);
                setCities([]);
                setBarangays([]);
              }}>
              <option value="">Select a region</option>
              {regions.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.name}
                </option>
              ))}
            </select>
            {errors.region && (
              <div className="label">
                <span className="text-xs label-text text-red-500">{errors.region.message}</span>
              </div>
            )}
          </label>
        )}
      />

      {provinces.length > 0 && (
        <Controller
          name="province"
          control={control}
          render={({ field }) => (
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Province</span>
              </div>
              <select
                className="select select-bordered"
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  setSelectedProvince(e.target[e.target.selectedIndex].innerText);
                  setCities([]);
                  setBarangays([]);
                }}
                disabled={!watchRegion}>
                <option value="">Select a province</option>
                {provinces.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.name}
                  </option>
                ))}
              </select>
              {errors.province && (
                <div className="label">
                  <span className="text-xs label-text text-red-500">{errors.province.message}</span>
                </div>
              )}
            </label>
          )}
        />
      )}

      {cities.length > 0 && (
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">City/Municipality</span>
              </div>
              <select
                className="select select-bordered"
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  setSelectedCity(e.target[e.target.selectedIndex].innerText);
                  setBarangays([]);
                }}
                disabled={!watchRegion}>
                <option value="">Select a city/municipality</option>
                {cities.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.name}
                  </option>
                ))}
              </select>
              {errors.city && (
                <div className="label">
                  <span className="text-xs label-text text-red-500">{errors.city.message}</span>
                </div>
              )}
            </label>
          )}
        />
      )}

      {baranggays.length > 0 && (
        <Controller
          name="baranggay"
          control={control}
          render={({ field }) => (
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Barangay</span>
              </div>
              <select
                className="select select-bordered"
                {...field}
                disabled={!watchCity}
                onChange={(e) => {
                  field.onChange(e);
                  setSelectedBaranggay(e.target[e.target.selectedIndex].innerText);
                }}>
                <option value="">Select a baranggay</option>
                {baranggays.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.name}
                  </option>
                ))}
              </select>
              {errors.baranggay && (
                <div className="label">
                  <span className="text-xs label-text text-red-500">
                    {errors.baranggay.message}
                  </span>
                </div>
              )}
            </label>
          )}
        />
      )}

      {watch().baranggay && (
        <>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Street</span>
            </div>
            <input
              type="text"
              placeholder="type your street here..."
              className="input input-bordered w-full max-w-xs"
              {...register("street")}
            />
            {errors.street && (
              <div className="label">
                <span className="text-xs label-text text-red-500">{errors.street.message}</span>
              </div>
            )}
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">House no.,apt,courtside</span>
            </div>
            <input
              type="text"
              placeholder="type your house no., apartment, etc here..."
              className="input input-bordered w-full max-w-xs"
              {...register("houseno")}
            />
            {errors.houseno && (
              <div className="label">
                <span className="text-xs label-text text-red-500">{errors.houseno.message}</span>
              </div>
            )}
          </label>
        </>
      )}

      {zipCode && (
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">zipcode</span>
          </div>
          <input
            type="text"
            placeholder="type your zipcode here..."
            className="input input-bordered w-full max-w-xs"
            defaultValue={zipCode}
            {...register("zipcode")}
          />
          {errors.zipcode && (
            <div className="label">
              <span className="text-xs label-text text-red-500">{errors.zipcode.message}</span>
            </div>
          )}
        </label>
      )}

      <span className="mt-8 col-span-4 flex items-center justify-end w-full">
        <button type="submit" className="btn gap-2 bg-yellow-100 w-max">
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </span>
    </form>
  );
};

export default Address;
