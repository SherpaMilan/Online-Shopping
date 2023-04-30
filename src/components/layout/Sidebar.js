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
            <Link className="nav-link fw-bold " to="/dashboard">
              Dashboard
            </Link>
          </li>
          <li>
            <Link className="nav-link fw-bold " to="/category">
              Category
            </Link>
          </li>
          <li>
            <Link className="nav-link fw-bold " to="/products">
              Products
            </Link>
          </li>
          <li>
            <Link className="nav-link fw-bold " to="/payment-options">
              Payment Options
            </Link>
          </li>
          <li>
            <Link className="nav-link fw-bold " to="/orders">
              Orders
            </Link>
          </li>
          <li>
            <Link className="nav-link fw-bold " to="/reviews">
              Reviews
            </Link>
          </li>
          <li>
            <Link className="nav-link fw-bold " to="/buyers">
              Buyers
            </Link>
          </li>
          <li>
            <Link className="nav-link fw-bold " to="/signup">
              Create Admin
            </Link>
          </li>
        </ul>
      </Container>
    </div>
  );
};
