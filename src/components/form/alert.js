import { Component } from "react";

export default class FormAlert extends Component {
    render() {
        return (
            <em className={"text-danger "+(this.props.isValid ? "d-none": "")}>Note: <i className="fas fa-exclamation-triangle"></i> {this.props.message}</em>
        )
    }
}