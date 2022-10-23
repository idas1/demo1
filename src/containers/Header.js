import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/reducers/auth";
import { useTranslation } from "react-i18next";
const Header = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);

  const [flag, setFlag] = useState("vi");
  useEffect(() => {
    setFlag(localStorage.getItem("lang") === "vi" ? "us" : "vn");
  }, []);
  
  const changeLanguage = (e) => {
    e.preventDefault();
    let lang = localStorage.getItem("lang");
    lang = lang === "vi" ? "en" : "vi";
    i18n.changeLanguage(lang);
    setFlag(lang === "vi" ? "us" : "vn");
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/home">
          <img
            src={`${process.env.PUBLIC_URL}/img/graduate.png`}
            alt="logo"
            style={{ height: "25px" }}
            className="me-1"
          />
          {t("appName")}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/major">
              Major
            </Nav.Link>
            <Nav.Link as={NavLink} to="/student">
              Student
            </Nav.Link>

            <Nav.Link as={NavLink} to="/products">
              Quản lý Sản Phẩm
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#/">Welcome to {userInfo.fullName}</Nav.Link>
            <Nav.Link onClick={() => dispatch(logout())}>
              <i className="bi-box-arrow-right" />
            </Nav.Link>
            <Nav.Link onClick={changeLanguage}>
              <i className={`flag-icon flag-icon-${flag}`} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
