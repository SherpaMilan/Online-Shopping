import React, { useRef } from "react";

import { Header } from "../../components/layout/Header";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Footer } from "../../components/layout/Footer";
import { CustomInput } from "../../components/custom-input/CustomInput";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../config/firebaseConfig";

const ResetPassword = () => {
  const emailRef = useRef("");

  const handleOnSubmit = () => {
    const email = emailRef.current.value;
    if (!email) return alert("Provide email!");

    sendPasswordResetEmail(auth, email)
      .then((resp) => {
        // Password reset email sent!
        console.log(resp, "email sent");
        toast.success(
          "Password reset link has been sent to you. Please click the link and follow the instruction."
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  //fName, lName, email, password, confirmPassword, phone
  const inputs = [
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "musk@email.com",
      required: true,
    },
  ];

  return (
    <div>
      <Header />

      <Container style={{ minHeight: "90vh", marginTop: "4rem" }}>
        <Row>
          <Col>
            <Form
              className="border rounded shadow-lg p-5 m-auto bg-light"
              style={{ maxWidth: "500px" }}
            >
              <h2 className="mb-5">Reset your password</h2>
              {inputs.map((item, i) => (
                <CustomInput key={i} {...item} passRef={emailRef} />
              ))}
              <div className="text-end mt-2 mb-4">
                <a href="/">Login</a> Now.
              </div>
              <div className="mt-3 d-grid">
                <Button variant="primary" onClick={handleOnSubmit}>
                  Reset Password ink
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default ResetPassword;
