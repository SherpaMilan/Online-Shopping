import React from "react";
import { Button, Container } from "react-bootstrap";
import { Form } from "react-bootstrap";

import { Footer } from "../../components/layout/Footer";
import { Header } from "../../components/layout/Header";
import { CustomInput } from "../../components/custom-input/CustomInput";

export const SignIn = () => {
  const inputs = [
    {
      label: "Email",
      name: "email",
      placeholder: "musk@email.com",
      type: "email",
      required: true,
    },
    {
      label: "Password",
      name: "password",
      placeholder: "********",
      type: "password",
      required: true,
    },
  ];

  return (
    <div>
      <Header />

      <Container className="mt-5 " style={{ minHeight: "90vh" }}>
        <Form
          className="border rounded shadow-lg p-5 m-auto py-5"
          style={{ width: "450px" }}
        >
          <h3 className="text-primary fw-bolder">Welcome to Admin Panel</h3>

          <div className="mt-5">
            {inputs.map((item, i) => (
              <CustomInput key={i} {...item} />
            ))}
          </div>

          <div className="text-end mt-2 mb-4">
            Forget Password? <a href="/reset-password">Reset Password</a> Now.
          </div>

          <div className="d-grid mt-3">
            <Button type="submit">Login</Button>
          </div>
        </Form>
      </Container>
      <Footer />
    </div>
  );
};
