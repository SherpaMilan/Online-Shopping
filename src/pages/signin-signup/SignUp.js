import React, { useState } from "react";

import { Header } from "../../components/layout/Header";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Footer } from "../../components/layout/Footer";
import { CustomInput } from "../../components/custom-input/CustomInput";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { toast } from "react-toastify";

import { addNewAdminUserAction } from "../user-state/userAction";

const initialState = {
  fName: "",
  lName: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const SignUp = () => {
  const [form, setForm] = useState({ initialState });

  const [error, setError] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    if (name === "password") {
      setError("");

      value.length < 6 &&
        setError("Password must be at least 6 characters long");

      !/[0-9]/.test(value) && setError("Number is required");
      !/[A-Z]/.test(value) && setError("Upper case is required");
      !/[a-z]/.test(value) && setError("Lower case is required");
    }
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    try {
      const { password, confirmPassword, email, fName, lName, phone } = form;
      if (confirmPassword !== password) {
        return toast.error("Password do not match");
      }

      // createuser in firebase auth
      const userPromise = createUserWithEmailAndPassword(auth, email, password);
      toast.promise(userPromise, {
        pending: "please wait",
      });
      const { user } = await userPromise;

      if (user?.uid) {
        toast.success("New user has been created, you may sign in now!");
        setForm(initialState);
      }

      // create user profile in use databs

      const obj = { email, fName, lName, phone, uid: user.uid };
      addNewAdminUserAction(obj);
    } catch (error) {}
  };

  //fName, lName, email, password, confirmPassword, phone

  const inputs = [
    {
      label: "First Name",
      name: "fName",
      type: "text",
      placeholder: "elon",
      required: true,
      value: form.fName,
    },
    {
      label: "Last Name",
      name: "lName",
      type: "text",
      placeholder: "musk",
      required: true,
      value: form.lName,
    },
    {
      label: "Phone",
      name: "phone",
      type: "text",
      placeholder: "04xxx",
      value: form.phone,
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "musk@email.com",
      required: true,
      value: form.email,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "*******",
      required: true,
      value: form.password,
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      type: "password",
      placeholder: "********",
      required: true,
      value: form.confirmPassword,
    },
  ];

  return (
    <div>
      <Header />

      <Container style={{ minHeight: "90vh", marginTop: "4rem" }}>
        <Row>
          <Col>
            <Form
              onSubmit={handleOnSubmit}
              className="border rounded shadow-lg p-5 m-auto bg-light"
              style={{ maxWidth: "500px" }}
            >
              <h2 className="mb-5">Admin Registration</h2>
              {inputs.map((item, i) => (
                <CustomInput key={i} {...item} onChange={handleOnChange} />
              ))}

              {error && (
                <ul>
                  <li className="text-danger fw-bolder mt-3">{error}</li>
                </ul>
              )}
              <div className="mt-3 d-grid">
                <Button variant="primary" type="submit">
                  Register New Admin
                </Button>
              </div>

              {/* <div className="text-end mt-4">
                Already registered? <a href="/">Login</a> Now.
              </div> */}
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};
