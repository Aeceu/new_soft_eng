import { BellRing, ChevronRight } from "lucide-react";
import { StepThree } from "../../redux/types/user";
import { stepThreeSchema } from "../../schema/userSignupSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { setNewUser } from "../../redux/slices/userSlice";

type Props = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};
const Emergency: React.FC<Props> = ({ setCurrentStep }) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<StepThree>({
    resolver: zodResolver(stepThreeSchema),
  });

  const onSubmit: SubmitHandler<StepThree> = (data: StepThree) => {
    console.log(data);
    dispatch(setNewUser({ emergencyPerson: data }));
    alert("success!");
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full grid grid-cols-4 gap-2 p-4">
      <h1 className="w-full col-span-4 text-3xl font-bold border-b">
        Person to contact incase of Emergency
      </h1>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Lastname</span>
        </div>
        <input
          type="text"
          placeholder="type your lastname here..."
          className="input input-bordered w-full max-w-xs"
          {...register("lastName")}
        />
        {errors.lastName && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.lastName.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Firstname</span>
        </div>
        <input
          type="text"
          placeholder="type your firstname here..."
          className="input input-bordered w-full max-w-xs"
          {...register("firstName")}
        />
        {errors.firstName && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.firstName.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Middlename</span>
        </div>
        <input
          type="text"
          placeholder="type your middlename here..."
          className="input input-bordered w-full max-w-xs"
          {...register("middleName")}
        />
        {errors.middleName && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.middleName.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Suffix</span>
        </div>
        <input
          type="text"
          placeholder="type your suffix here..."
          className="input input-bordered w-full max-w-xs"
          {...register("suffix")}
        />
        {errors.suffix && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.suffix.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Age</span>
        </div>
        <input
          type="number"
          placeholder="type your age here..."
          className="input input-bordered w-full max-w-xs"
          {...register("age")}
        />
        {errors.age && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.age.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Gender</span>
        </div>
        <select className="select select-bordered" {...register("gender")}>
          <option disabled selected>
            Pick one
          </option>
          <option>Male</option>
          <option>Female</option>
          <option>Others</option>
        </select>
        {errors.gender && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.gender.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Relationship</span>
        </div>
        <input
          type="text"
          placeholder="type your relationship here..."
          className="input input-bordered w-full max-w-xs"
          {...register("relationship")}
        />
        {errors.relationship && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.relationship.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Religion</span>
        </div>
        <select className="select select-bordered" {...register("religion")}>
          <option disabled selected>
            Pick one
          </option>
          <option>Roman Catholic</option>
          <option>Catholic</option>
          <option>Iglesia ni Cristo</option>
          <option>Born again</option>
          <option>Dating Daan</option>
          <option>Baptist</option>
          <option>Islam</option>
        </select>
        {errors.religion && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.religion.message}</span>
          </div>
        )}
      </label>

      <h1 className="w-full col-span-4 text-3xl font-bold mt-4 border-b">Contact Information</h1>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Email</span>
        </div>
        <input
          type="email"
          placeholder="type your email here..."
          className="input input-bordered w-full max-w-xs"
          {...register("email")}
        />
        {errors.email && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.email.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Mobile No.</span>
        </div>
        <input
          type="number"
          placeholder="type your phone number here..."
          className="input input-bordered w-full max-w-xs"
          {...register("phone")}
        />
        {errors.phone && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.phone.message}</span>
          </div>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Landline No.</span>
        </div>
        <input
          type="number"
          placeholder="type your landline number here..."
          className="input input-bordered w-full max-w-xs"
          {...register("landline")}
        />
        {errors.landline && (
          <div className="label">
            <span className="text-xs label-text text-red-500 ">{errors.landline.message}</span>
          </div>
        )}
      </label>

      <span className="flex items-end gap-2 justify-center text-red-500">
        <BellRing className="w-8 h-8 mb-2" />
        <label className="text-xs">
          Kindly type 'NA' in boxes where there are no possible answer to the information being
          requested.
        </label>
      </span>

      <h1 className="w-full col-span-4 text-3xl font-bold mt-4 border-b">
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
export default Emergency;
