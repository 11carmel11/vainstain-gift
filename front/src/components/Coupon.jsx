import React from "react";
import { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import CouponsContext from "../contexts/coupons/context";
import { redeemCoupon } from "../helpers";
import styled from "styled-components";

const StyledCard = styled(Card)`
  border: 3px solid black;
  border-radius: 30px;
  padding: 10px;
  margin-top: 20px;
  display: table-caption;
  height: fit-content;
  width: 20rem;
`;

export default function Coupon({ coupon: { title, explain, used, id } }) {
  const { dispatch } = useContext(CouponsContext);

  const use = async () => {
    used = true;
    await redeemCoupon(title);
    dispatch({ type: "USE", payload: title });
  };

  return (
    <>
      <StyledCard>
        <Card.Img
          height="250px"
          width="100px"
          variant="top"
          src={`${process.env.PUBLIC_URL}/assets/${id}.jpg`}
        />
        <Card.Body style={{ textAlign: "center" }}>
          <Card.Title style={{ color: "cadetblue" }}>{title}</Card.Title>
          <Card.Text>{explain}</Card.Text>
          <Button variant="info" disabled={used} onClick={use}>
            {!!used ? "USED" : "USE"}
          </Button>
        </Card.Body>
      </StyledCard>
    </>
  );
}
