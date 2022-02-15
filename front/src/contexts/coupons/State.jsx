import React, { useReducer } from "react";
import couponsReducer from "../../reducers/coupons";
import CouponsContext from "./context";

export default function CouponsState({ children }) {
  const [coupons, dispatch] = useReducer(couponsReducer, []);

  return (
    <CouponsContext.Provider value={{ coupons, dispatch }}>
      {children}
    </CouponsContext.Provider>
  );
}
