import React from "react";
import { Modal } from "react-bootstrap";

export default function InfoModal({ show, setShow }) {
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal style={{ textAlign: "right" }} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ textAlign: "right" }}>
            !!!יש לכם מלא קופונים לממש
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          !שלום לכם
          <br />
          ,באתר נמצאים חמישה קופונים
          <br />
          !שתוכלו לממש מתי שרק תרצו
          <br />
          .מעבר לכך, יש כפתור שנותן לכם להוסיף עוד קופון לבחירתכם
          <br />
          תשתמשו בו בתבונה, יש לכם <b>אחד</b> כזה
          <br />
          מתחת לכל קופון יש הסבר, אבל אני מאמין שגם תצליחו להבין לבד
          <br />
          אחרי שניצלתם אחד מהקופונים או יצרתם אחד חדש, אין צורך לפנות אלי, אני
          כבר אפנה אליכם
        </Modal.Body>
        <Modal.Footer as="small">
          .נב, אם בחרתם משהו בטעות, תדברו איתי ואני אתקן
          <br />
          !יורי, אל תנסה לעשות פה שטוזים כי אתה תצליח{" "}
        </Modal.Footer>
      </Modal>
    </>
  );
}
