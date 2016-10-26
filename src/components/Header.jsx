/* @flow */
"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";

class Header extends Component {
    _authLink() {
        if (this.props.isAuthenticated) {
            return (
                <Link to="/signout">
                    <a className="item">
                        Sign out
                    </a>
                </Link>
            );
        } else {
            return [
                <Link className="item" key={1} to="/signin">
                    Sign in
                </Link>,
                <Link className="item" key={2} to="/signup">
                    Sign up
                </Link>
            ];
        }
    }

    render() {
        return (
            <div className="ui fixed inverted menu">
                <div className="ui container">
                    <Link className="header item" to="/">
                        Home
                    </Link>
                    <Link className="item" to="/resources" >
                        Resources
                    </Link>
                    <div className="right menu">
                        {this._authLink()}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.authenticated
});

export default connect(
    mapStateToProps
)(Header);
