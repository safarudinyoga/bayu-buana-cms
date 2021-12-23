import { Component } from "react";

export default class FormAlert extends Component {
    render() {
        return (
            <>
            <span className="text-note">Note : </span>
            <span className={"text-note-danger "+(this.props.isValid ? "d-none": "")}><i className="fas fa-exclamation-triangle icon-red"></i> {this.props.message}</span>
        </>
        )
    }
}