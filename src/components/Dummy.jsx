/* @flow */
"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import { testAuth } from "../actions";

class Dummy extends Component {
    constructor(props) {
        super(props);
        this._bind();
        this.state = {
            resp: null
        };
    }

    _bind(...methods) {
        methods.forEach(
            method => this[method] = this[method].bind(this));
    }

    componentDidMount() {
        this.props.testAuth(resp => this.setState({resp: resp.message}));
    }

    render() {
        return (
            <div className="ui segment">
                {this.state.resp}
            </div>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
    testAuth
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dummy);
