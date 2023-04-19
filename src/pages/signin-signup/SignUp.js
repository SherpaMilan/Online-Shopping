import React from "react";

import { Header } from "../../components/layout/Header";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Footer } from "../../components/layout/Footer";
import { CustomInput } from "../../components/custom-input/CustomInput";

export const SignUp = () => {
  //fName, lName, email, password, confirmPassword, phone
  const inputs = [
    {
      label: "First Name",
      name: "fName",
      type: "text",
      placeholder: "elon",
      required: true,
    },
    {
      label: "Last Name",
      name: "lName",
      type: "text",
      placeholder: "musk",
      required: true,
    },
    {
      label: "Phone",
      name: "phone",
      type: "text",
      placeholder: "04xxx",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "musk@email.com",
      required: true,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "*******",
      required: true,
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      type: "password",
      placeholder: "********",
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
              <h2 className="mb-5">Admin Registration</h2>
              {inputs.map((item, i) => (
                <CustomInput key={i} {...item} />
              ))}
              <div className="mt-3 d-grid">
                <Button variant="primary">Register New Admin</Button>
              </div>

              <div className="text-end mt-4">
                Already registered? <a href="/">Login</a> Now.
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};
