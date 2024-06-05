import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { StepFour } from "../../redux/types/user";
import { stepFourSchema } from "../../schema/userSignupSchema";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { setNewUser } from "../../redux/slices/userSlice";
type Props = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};
const Education: React.FC<Props> = ({ setCurrentStep }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { handleSubmit, register } = useForm<StepFour>({
    resolver: zodResolver(stepFourSchema),
  });

  const onSubmit: SubmitHandler<StepFour> = (data: StepFour) => {
    console.log(data);
    dispatch(setNewUser(data));
    alert("success!");
    setCurrentStep((prev) => prev + 1);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full  grid grid-cols-4 gap-2 p-4">
      <h1 className="w-full col-span-4 text-3xl font-bold border-b flex items-center gap-2">
        Educational Attainment <span className="text-sm text-red-500 font-normal">*optional</span>
      </h1>

      <label className="form-control w-full  col-span-3">
        <div className="label">
          <span className="label-text">Name of elementary school</span>
        </div>
        <input
          type="text"
          placeholder="type your elementary here..."
          className="input input-bordered w-full "
          {...register("elementary")}
        />
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">School Attainment</span>
        </div>
        <select className="select select-bordered" {...register("attain")}>
          <option disabled selected>
            Select your school Attainment
          </option>
          <option>Graduate</option>
          <option>UnderGraduate</option>
        </select>
      </label>

      <label className="form-control w-full  col-span-3">
        <div className="label">
          <span className="label-text">Name of highschool school</span>
        </div>
        <input
          type="text"
          placeholder="type your highschool here..."
          className="input input-bordered w-full "
          {...register("highschool")}
        />
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">School Attainment</span>
        </div>
        <select className="select select-bordered" {...register("attain1")}>
          <option disabled selected>
            Select your school Attainment
          </option>
          <option>Graduate</option>
          <option>UnderGraduate</option>
        </select>
      </label>

      <label className="form-control w-full  col-span-3">
        <div className="label">
          <span className="label-text">Name of senior highschool school</span>
        </div>
        <input
          type="text"
          placeholder="type your senior highschool here..."
          className="input input-bordered w-full "
          {...register("senior")}
        />
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">School Attainment</span>
        </div>
        <select className="select select-bordered" {...register("attain2")}>
          <option disabled selected>
            Select your school Attainment
          </option>
          <option>Graduate</option>
          <option>UnderGraduate</option>
        </select>
      </label>

      <label className="form-control w-full  col-span-3">
        <div className="label">
          <span className="label-text">Name of college school</span>
        </div>
        <input
          type="text"
          placeholder="type your college here..."
          className="input input-bordered w-full "
          {...register("college")}
        />
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">School Attainment</span>
        </div>
        <select className="select select-bordered" {...register("attain3")}>
          <option disabled selected>
            Select your school Attainment
          </option>
          <option>Graduate</option>
          <option>UnderGraduate</option>
        </select>
      </label>

      <span className="mt-8 col-span-4 flex items-center justify-end w-full">
        <button type="submit" className="btn gap-2 bg-yellow-100 w-max ">
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </span>
    </form>
  );
};
export default Education;
