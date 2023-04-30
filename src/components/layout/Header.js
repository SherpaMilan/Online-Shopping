import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { GoSignIn, GoSignOut } from "react-icons/go";
import { FaUserEdit } from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { setUser } from "../../pages/user-state/userSlice";

export const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.adminUser);

  const handleOnLogout = () => {
    signOut(auth).then(() => {
      dispatch(setUser({}));
    });
  };
  return (
    <Navbar variant="dark" bg="dark" expand="md">
      <Container>
        <Navbar.Brand href="#home">CBS CMS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user?.uid ? (
              <>
                {" "}
                <Link className="nav-link" to="/dashboard">
                  <AiFillDashboard /> Dashboard
                </Link>
                <Link className="nav-link" to="#!" onClick={handleOnLogout}>
                  <GoSignOut /> Sign Out
                </Link>
              </>
            ) : (
              <>
                <Link className="nav-link" to="/">
                  <GoSignIn /> Sign In
                </Link>
                {/* <Link className="nav-link" to="/signup">
                  <FaUserEdit /> Sign Up
                </Link> */}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
