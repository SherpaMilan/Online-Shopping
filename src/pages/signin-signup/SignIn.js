import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { Form } from "react-bootstrap";

import { Footer } from "../../components/layout/Footer";
import { Header } from "../../components/layout/Header";
import { CustomInput } from "../../components/custom-input/CustomInput";
import { signInUserAction } from "../user-state/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const { user } = useSelector((state) => state.adminUser);

  useEffect(() => {
    user.uid && navigate("/dashboard");
  }, [user, navigate]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    const { password, email } = form;
    dispatch(signInUserAction({ email, password }));
  };

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
          onSubmit={handleOnSubmit}
          className="border ronded shadow-lg p-5 m-auto py-5"
          style={{ width: "450px" }}
        >
          <h3 className="text-primary fw-bolder">Welcome to Admin Panel</h3>

          <div className="mt-5">
            {inputs.map((item, i) => (
              <CustomInput key={i} {...item} onChange={handleOnChange} />
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
