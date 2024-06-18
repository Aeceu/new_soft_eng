import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";

const useRedux = () => {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();
  return { state, dispatch };
};
export default useRedux;
