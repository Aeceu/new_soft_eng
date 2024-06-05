import { ChevronRight } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { StepTwo } from "../../redux/types/user";
import { stepTwoSchema } from "../../schema/userSignupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { setNewUser } from "../../redux/slices/userSlice";

type Props = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};
const Address: React.FC<Props> = ({ setCurrentStep }) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<StepTwo>({
    resolver: zodResolver(stepTwoSchema),
  });

  const onSubmit: SubmitHandler<StepTwo> = (data: StepTwo) => {
    console.log(data);
    dispatch(setNewUser(data));
    alert("success!");
    setCurrentStep((prev) => prev + 1);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full grid grid-cols-4 gap-2 p-4">
      <h1 className="w-full col-span-4 text-3xl font-bold border-b">
        Home/Permanent Address Information
      </h1>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">House no</span>
        </div>
        <input
          type="text"
          placeholder="type your house no. here..."
          className="input input-bordered w-full max-w-xs"
          {...register("houseno")}
        />
        {errors.houseno && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.houseno.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Street</span>
        </div>
        <input
          type="text"
          placeholder="type your street name here..."
          className="input input-bordered w-full max-w-xs"
          {...register("street")}
        />
        {errors.street && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.street.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Baranggay</span>
        </div>
        <input
          type="text"
          placeholder="type your baranggay name here..."
          className="input input-bordered w-full max-w-xs"
          {...register("baranggay")}
        />
        {errors.baranggay && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.baranggay.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">District</span>
        </div>
        <input
          type="text"
          placeholder="type your district name here..."
          className="input input-bordered w-full max-w-xs"
          {...register("district")}
        />
        {errors.district && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.district.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">City</span>
        </div>
        <input
          type="text"
          placeholder="type your city name here..."
          className="input input-bordered w-full max-w-xs"
          {...register("city")}
        />
        {errors.city && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.city.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Province</span>
        </div>
        <input
          type="text"
          placeholder="type your province name here..."
          className="input input-bordered w-full max-w-xs"
          {...register("province")}
        />
        {errors.province && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.province.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Zipcode</span>
        </div>
        <input
          type="text"
          placeholder="type your zipcode name here..."
          className="input input-bordered w-full max-w-xs"
          {...register("zipcode")}
        />
        {errors.zipcode && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.zipcode.message}</span>
          </div>
        )}
      </label>

      <span className="mt-8 col-span-4 flex items-center justify-end w-full">
        <button type="submit" className="btn gap-2 bg-yellow-100 w-max ">
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </span>
    </form>
  );
};
export default Address;
