import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategoryAction,
  fethCagegoriesAction,
} from "../../pages/category/categoryAction";
import { CustomModal } from "../modal/CustomModal";
import { setShowModal } from "../../system/systemSlice";
import { EditCategory } from "./EditCategory";
import { setSelectedCat } from "../../pages/category/categorySilce";

export const CategoryTable = () => {
  const dispatch = useDispatch();

  const { cats } = useSelector((state) => state.cat);

  useEffect(() => {
    dispatch(fethCagegoriesAction());
  }, [dispatch]);

  const handleOnDelete = (slug) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      dispatch(deleteCategoryAction(slug));
    }
  };
  const handleOnEdit = (slug) => {
    dispatch(setSelectedCat(slug));
    dispatch(setShowModal(true));
  };
  return (
    <div className="mt-5">
      <CustomModal title="Update Table">
        <EditCategory />
      </CustomModal>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cats.map((cat, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{cat.status}</td>
              <td>{cat.name}</td>
              <td>{cat.slug}</td>
              <td>
                <Button
                  variant="outline-warning"
                  onClick={() => handleOnEdit(cat.slug)}
                >
                  Edit
                </Button>{" "}
                <Button
                  variant="outline-danger"
                  onClick={() => handleOnDelete(cat.slug)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
