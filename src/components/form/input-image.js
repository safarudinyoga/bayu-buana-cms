import React, { Component } from "react"
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
    const {url, disabled, onChange, accept, title, name, mediaType="desktop"} = this.props;
    const acceptFormat = accept 
      ? accept.split(",").map(v => "image/"+v.substring(1)).join(",")
      : "image/png,image/jpg,image/jpeg"
      
    return (
      <div className={`image-wrapper ${name}`}>
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
                onChange={(e) => onChange(e, mediaType)}
                className="d-none"
                name={name}
                disabled={disabled}
                accept={acceptFormat}
              />
              {url ? (
                <img
                  src={url}
                  className="img-fluid img-up"
                  alt="up-img"
                />
              ) : (
                <img
                  src={NoImage}
                  className="img-fluid img-up"
                  alt="up-no-img"
                />
              )}
          </label>
          {/* <span class="error-msg">{name} is required</span> */}
      </div>
    )
  }
}
