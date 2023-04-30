import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsDatabaseAdd } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { fethProductsAction } from "../../pages/product/ProductAction";

export const ProductTable = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.prods);

  useEffect(() => {
    dispatch(fethProductsAction());
  }, [dispatch]);
  return (
    <div>
      <div className="mt-5 text-end mb-1">
        <Link to="/product/new">
          {" "}
          <Button>
            <BsDatabaseAdd /> Add New Product
          </Button>
        </Link>
      </div>
      <Table striped hover bordered>
        <thead>
          <th>Thumbnail</th>
          <th>Name</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Sales Price</th>
          <th>Sales ends</th>
          <th>Edit</th>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr>
              <td>
                <img src={prod.thumbnail} alt={prod.name} width="150px" />
              </td>
              <td>{prod.name}</td>
              <td>{prod.qty}</td>
              <td>${prod.price}</td>
              <td>${prod.salesPrice}</td>
              <td>
                {prod.salesEnds &&
                  new Date(prod.salesEnds).toLocaleDateString()}
              </td>
              <td>
                <Link to="/product/id">Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
