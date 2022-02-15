import React, { useState, useContext } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import CouponsContext from "../contexts/coupons/context";
import { createCoupon } from "../helpers";

export default function MyModal({ setter }) {
  const { dispatch } = useContext(CouponsContext);
  const [show, setShow] = useState(false);
  let textNode;

  const choose = async () => {
    handleClose();
    if (!textNode.value) return;
    const body = {
      id: "family",
      explain: textNode.value,
      title: "הקופון שבחרתם",
      used: false,
    };

    const payload = await createCoupon(body);
    if (payload) {
      dispatch({ type: "ADD", payload });
      setter(false);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        יד חופשית{" "}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>יש לכם קופון נוסף, לבחירתכם</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="coupon-text">
            <Form.Label>רק תגידו לי מה לעשות</Form.Label>
            <Form.Control
              type="email"
              placeholder="למלא פה"
              ref={(node) => (textNode = node)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            ביטול
          </Button>
          <Button variant="primary" onClick={choose}>
            שליחה
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
