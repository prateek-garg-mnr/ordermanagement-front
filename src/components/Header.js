import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {  Navbar, Nav } from "react-bootstrap";
import "./HeaderStyle.css";

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return (
        <Nav className="mr-auto">
          <Nav.Link href="#"><Link to="/signout">Sign Out</Link></Nav.Link>
          <Nav.Link href="#"><Link to="/feature">Order Table</Link></Nav.Link>
        </Nav>
      );
    } else {
      return (
        <Nav className="mr-auto">
          <Nav.Link href="/signup"><Link to="/signup">Sign up</Link></Nav.Link>
          <Nav.Link href="/signin"><Link to="/signin">Sign In</Link></Nav.Link>
        </Nav>
      );
    }
  }

  render() {
    return (
      <div className="header">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#"><Link to="/">Order Management</Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {this.renderLinks()}
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);
