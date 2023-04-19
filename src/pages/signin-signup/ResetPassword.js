import React from "react";

import { Header } from "../../components/layout/Header";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Footer } from "../../components/layout/Footer";
import { CustomInput } from "../../components/custom-input/CustomInput";

const ResetPassword = () => {
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
              <h2 className="mb-5">Reset you password</h2>
              {inputs.map((item, i) => (
                <CustomInput key={i} {...item} />
              ))}
              <div className="text-end mt-2 mb-4">
                <a href="/">Login</a> Now.
              </div>
              <div className="mt-3 d-grid">
                <Button variant="primary">Login</Button>
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
