import React, { useContext, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Coupon from "./components/Coupon";
import CouponsContext from "./contexts/coupons/context";
import { allCoupons } from "./helpers";
import Modal from "./components/Modal";
import styled from "styled-components";
import InfoModal from "./components/InfoModal";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1rem;
  justify-items: center;
`;

export default function App() {
  const { coupons, dispatch } = useContext(CouponsContext);
  const [showInfo, setShowInfo] = useState(true);
  const [freeCoupon, setFreeCoupon] = useState(true);

  useEffect(() => {
    const asyncSet = async () => {
      const { coupons, freeUse } = await allCoupons();
      setFreeCoupon(freeUse);
      dispatch({ type: "FETCH", payload: coupons });
    };

    asyncSet();
  }, [dispatch]);

  return (
    <>
      <InfoModal show={showInfo} setShow={setShowInfo} />
      {freeCoupon && <Modal setter={setFreeCoupon} />}
      <Container>
        {coupons.map((coupon) => (
          <Coupon key={nanoid()} coupon={coupon} />
        ))}
      </Container>
    </>
  );
}
