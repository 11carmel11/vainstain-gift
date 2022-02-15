import axios from "axios";
import { ALL_API, CREATE_API, USE_API } from "./config";

export const allCoupons = async () => {
  const { data } = await axios.get(ALL_API);
  return data;
};

export const redeemCoupon = async (title) => {
  const { data } = await axios.put(USE_API(title));
  return data;
};

export const createCoupon = async (body) => {
  const { data } = await axios.post(CREATE_API, body);
  return data;
};
