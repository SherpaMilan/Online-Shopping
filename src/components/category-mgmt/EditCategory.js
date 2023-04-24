import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { CustomInput } from "../custom-input/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewCategoryAction,
  updateCategoryAction,
} from "../../pages/category/categoryAction";

export const EditCategory = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({});
  const { selectedCat } = useSelector((state) => state.cat);

  useEffect(() => {
    setForm(selectedCat);
  }, [selectedCat]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { adddAt, ...rest } = form;

    dispatch(updateCategoryAction(rest));
    console.log(form);
  };
  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
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
          placeholder="Electornic"
          required={true}
          onChange={handleOnChange}
          value={form.name}
        />
        <CustomInput
          label="Slug"
          name="slug"
          required={true}
          onChange={handleOnChange}
          value={form.slug}
          disabled={true}
        />

        <div className="d-grid">
          <Button type="submit" size="sm">
            Update Category
          </Button>
        </div>
      </Form>
    </div>
  );
};
