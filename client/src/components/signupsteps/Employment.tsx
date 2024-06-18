import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { stepFiveSchema } from "../../schema/userSignupSchema";
import { StepFive } from "../../redux/types/user";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { setNewUser } from "../../redux/slices/userSlice";
import toast from "react-hot-toast";

type Props = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};
const Employment: React.FC<Props> = ({ setCurrentStep }) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<StepFive>({
    resolver: zodResolver(stepFiveSchema),
  });

  const onSubmit: SubmitHandler<StepFive> = (data: StepFive) => {
    console.log(data);
    dispatch(setNewUser(data));
    toast.success("Employment Information done!");
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full  grid grid-cols-4 gap-2 p-4">
      <h1 className="w-full col-span-4 text-3xl font-bold border-b flex items-center gap-2">
        Employment Attainment <span className="text-sm text-red-500 font-normal">*optional</span>
      </h1>

      <label className="form-control w-full max-w-xs col-span-4">
        <div className="label">
          <span className="label-text">Employment type</span>
        </div>
        <select className="select select-bordered" {...register("employment")}>
          <option value={""}>Select your employment type</option>
          <option>Student</option>
          <option>Employed</option>
          <option>Unemployed</option>
        </select>{" "}
        {errors.employment && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.employment.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Occupation</span>
        </div>
        <input
          disabled={watch().employment === "Employed" ? false : true}
          type="text"
          placeholder="type your occupation here..."
          className="input input-bordered w-full max-w-xs"
          {...register("occupation")}
        />
        {errors.occupation && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.occupation.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Months/Years of being employed</span>
        </div>
        <input
          disabled={watch().employment === "Employed" ? false : true}
          type="text"
          placeholder="type your months/years here..."
          className="input input-bordered w-full max-w-xs"
          {...register("yearEmploy")}
        />
        {errors.yearEmploy && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.yearEmploy.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text"> 1. Skills while being employed</span>
        </div>
        <input
          disabled={watch().employment === "Employed" ? false : true}
          type="text"
          placeholder="type your skill here..."
          className="input input-bordered w-full max-w-xs"
          {...register("skill1")}
        />
        {errors.skill1 && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.skill1.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text"> 2. Skills while being employed</span>
        </div>
        <input
          disabled={watch().employment === "Employed" ? false : true}
          type="text"
          placeholder="type your skill here..."
          className="input input-bordered w-full max-w-xs"
          {...register("skill2")}
        />
        {errors.skill2 && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.skill2.message}</span>
          </div>
        )}
      </label>

      <label className="col-start-2 form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Months/Years of being unemployed</span>
        </div>
        <input
          disabled={watch().employment === "Unemployed" ? false : true}
          type="text"
          placeholder="type your months/years here..."
          className="input input-bordered w-full max-w-xs"
          {...register("yearUnemploy")}
        />
        {errors.yearUnemploy && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.yearUnemploy.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text"> 1. Skills while being unemployed</span>
        </div>
        <input
          disabled={watch().employment === "Unemployed" ? false : true}
          type="text"
          placeholder="type your skill here..."
          className="input input-bordered w-full max-w-xs"
          {...register("skill3")}
        />
        {errors.skill3 && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.skill3.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text"> 2. Skills while being unemployed</span>
        </div>
        <input
          disabled={watch().employment === "Unemployed" ? false : true}
          type="text"
          placeholder="type your skill here..."
          className="input input-bordered w-full max-w-xs"
          {...register("skill4")}
        />
        {errors.skill4 && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.skill4.message}</span>
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
export default Employment;
