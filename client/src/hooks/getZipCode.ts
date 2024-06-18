import { zipcodes } from "../data/zipcode";

export default {
  find(zipcode: string): string | string[] | null {
    return zipcodes[zipcode] || null;
  },
  reverse(location: string): string | null {
    return (
      Object.keys(zipcodes).find((zipcode) => {
        const value = zipcodes[zipcode];
        if (typeof value === "string") {
          return value === location;
        }
        return value.includes(location);
      }) || null
    );
  },
};
