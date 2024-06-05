import { z } from "zod";
import {
  stepFiveSchema,
  stepFourSchema,
  stepOneSchema,
  stepSixSchema,
  stepThreeSchema,
  stepTwoSchema,
  userSignIn,
} from "../../schema/userSignupSchema";

export type TUser = {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string | null;
  age: number;
  birthdate: string;
  birthplace: string;
  gender: string;
  religion: string;
  citizenship: string;
  civil: string;

  email: string;
  phone: string;
  landline: string | null;

  houseno: string | null;
  street: string;
  baranggay: string;
  district: string | null;
  city: string;
  province: string | null;
  zipcode: string | null;

  elementary: string;
  attain: string;
  highschool: string;
  attain1: string;
  senior: string;
  attain2: string;
  college: string;
  attain3: string;

  employment: string;
  occupation: string | null;
  yearEmploy: string | null;
  skill1: string | null;
  skill2: string | null;
  yearUnemploy: string | null;
  skill1_1: string | null;
  skill2_1: string | null;

  blood: string;
  height: string;
  weight: string;

  disability: string;
  visibility: string;
  made_disabled: string;
  status: string;
  device: string;
  specificDevice: string | null;
  medicine: string;
  specificMedicine: string | null;
  others: string | null;

  emergencyPerson: {
    firstName: string;
    middleName: string;
    lastName: string;
    suffix: string | null;
    age: number;
    gender: string;
    relationship: string;
    religion: string;

    email: string;
    phone: string;
    landline: string;

    province: string;
    district: string;
    houseno: string;
    street: string;
    baranggay: string;
    city: string;
    zipcode: string;
    userId: string;
  } | null;

  password?: string | null;
  refreshToken?: string | null;
  role: string;

  createdAt: Date;
  qr_code: {
    id: string;
    image_id: string;
    secure_url: string;
    createdAt: string;
    updatedAt: string;
  };
};

export type TAdmin = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  username: string;
  role: string;
};

export type StepOne = z.infer<typeof stepOneSchema>;
export type StepTwo = z.infer<typeof stepTwoSchema>;
export type StepThree = z.infer<typeof stepThreeSchema>;
export type StepFour = z.infer<typeof stepFourSchema>;
export type StepFive = z.infer<typeof stepFiveSchema>;
export type StepSix = z.infer<typeof stepSixSchema>;

export type UserSignIn = z.infer<typeof userSignIn>;
