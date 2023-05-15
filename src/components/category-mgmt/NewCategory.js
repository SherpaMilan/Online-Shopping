import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { CustomInput } from "../custom-input/CustomInput";
import { useDispatch } from "react-redux";
import { addNewCategoryAction } from "../../pages/category/categoryAction";
import slugify from "slugify";

export const NewCategory = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const slug = slugify(form.name, {
      lower: true, // convert to lower case, defaults to `false`
      trim: true, // trim leading and trailing replacement chars, defaults to `true`
    });
    dispatch(addNewCategoryAction({ ...form, slug, addAt: Date.now() }));
  };
  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <Form
        onSubmit={handleOnSubmit}
        className="d-flex gap-2 justify-content-between border rounded shadow-lg p-3 cat-form"
      >
        <CustomInput
          name="name"
          placeholder="Electornic"
          required={true}
          onChange={handleOnChange}
        />
        <Form.Group>
          <Form.Select name="status" required={true} onChange={handleOnChange}>
            <option value="">-- Select --</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </Form.Select>
        </Form.Group>

        <div className="d-grid">
          <Button type="submit" size="sm">
            Add Category
          </Button>
        </div>
      </Form>
    </div>
  );
};
