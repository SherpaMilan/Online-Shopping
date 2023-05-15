import React, { useEffect, useState } from "react";
import { Form, Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { EditCategory } from "../category-mgmt/EditCategory";
import { CustomInput } from "../custom-input/CustomInput";
import { CustomModal } from "../modal/CustomModal";

import { addPaymentOptions, fetchPaymentOptions } from "./paymentAction";

export const PaymentOptions = () => {
  const [form, setForm] = useState({});
  const dispatch = useDispatch();

  const { paymentOption } = useSelector((state) => state.payment);
  console.log(paymentOption);
  useEffect(() => {
    dispatch(fetchPaymentOptions());
    console.log(fetchPaymentOptions);
  }, []);
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    let paymentid = Date.now().toString();

    dispatch(addPaymentOptions({ ...form, id: paymentid }));
  };
  return (
    <>
      <Form
        onSubmit={handleOnSubmit}
        className="d-flex gap-2 justify-content-between border rounded shadow-lg p-3 cat-form"
      >
        <Form.Group>
          <label htmlFor="">Status</label>
          <Form.Select
            name="status"
            required={true}
            onChange={handleOnChange}
            defaultValue={form.status}
          >
            <option value="">-- Select --</option>
            <option value="active" selected={form.status === "active"}>
              Active
            </option>
            <option value="inactive" selected={form.status === "inactive"}>
              Inactive
            </option>
          </Form.Select>
        </Form.Group>
        <CustomInput
          name="name"
          label="Name"
          placeholder="card details"
          required={true}
          onChange={handleOnChange}
        />
        <CustomInput
          label="description"
          name="description"
          required={true}
          onChange={handleOnChange}
        />

        <div className="d-grid">
          <Button type="submit" size="sm">
            Submit
          </Button>
        </div>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          {paymentOption.map((item, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.status}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};
