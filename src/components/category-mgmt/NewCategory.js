import React from "react";
import { Button, Form } from "react-bootstrap";
import { CustomInput } from "../custom-input/CustomInput";

export const NewCategory = () => {
  return (
    <div style={{ width: "500px", margin: "auto" }}>
      <Form className="d-flex gap-2 justify-content-between border rounded shadow-sm p-3">
        <CustomInput placeholder="Top Books" required={true} />
        <Form.Group>
          <Form.Select required={true}>
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
