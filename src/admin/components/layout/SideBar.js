import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export const SideBar = () => {
  return (
    <div className="bg-dark text-light pt-5 sideBar-content">
      <Container>
        <h2 className="">MR. Admin</h2>
        <hr />
        <ul className="list-unstyled ">
          <li>
            <Link className="nav-link fw-bold " to="/admin/dashboard">
              Dashboard
            </Link>
          </li>
          <li>
            <Link className="nav-link fw-bold " to="/admin/category">
              Category
            </Link>
          </li>
          <li>
            <Link className="nav-link fw-bold " to="/admin/products">
              Products
            </Link>
          </li>
          <li>
            <Link className="nav-link fw-bold " to="/admin/payment-options">
              Payment Options
            </Link>
          </li>
          <li>
            <Link className="nav-link fw-bold " to="/admin/orders">
              Orders
            </Link>
          </li>
          <li>
            <Link className="nav-link fw-bold " to="/admin/reviews">
              Reviews
            </Link>
          </li>
          <li>
            <Link className="nav-link fw-bold " to="/admin/buyers">
              Buyers
            </Link>
          </li>
        </ul>
      </Container>
    </div>
  );
};
