import React, { Component } from "react"
import FormInputWrapper from "./input-wrapper"
import NoImage from "assets/no_image.png"
import UploadIcon from "assets/icons/upload.svg"
import "./input-image.css"

export default class FormInputFile extends Component {
  constructor(props) {
    super(props)
    this.input = React.createRef()
  }

  getInput() {
    let input = null
    try {
      input = this.input.current.getInput()
    } catch (e) {}
    return input
  }

  render() {
    const {data, disabled, onChange, accept, title} = this.props;
    return (
      <div style={{}}>
        {
          title && (
            <>
              <p className="media-title">{title}</p>
              <span className="media-info">Only {accept?.split(",").join(" ") || ".png, .jpg, .jpeg"} file supported.</span>
            </>
          )
        }
        <label className="media-label" style={this.props.style}>
              {!disabled 
              ? <img
                src={UploadIcon}
                className="img-up-icon"
                alt="up-ic"
              />
              : null}
              <input
                type="file"
                onChange={onChange}
                className="d-none"
                disabled={disabled}
                accept={accept || ".png,.jpg,.jpeg"}
              />
              {data.language_asset &&
                data.language_asset.multimedia_description &&
                data.language_asset.multimedia_description.url ? (
                <img
                  src={data.language_asset.multimedia_description.url}
                  className="img-fluid"
                  alt="up-img"
                />
              ) : (
                <img
                  src={NoImage}
                  className="img-fluid"
                  alt="up-no-img"
                />
              )}
          </label>
      </div>
    )
  }
}
