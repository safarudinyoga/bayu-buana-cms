import React from "react"
import NoImage from "assets/no_image.png"
import UploadIcon from "assets/icons/upload.svg"
import "./input-image.css"
import {useDispatch} from "react-redux"
import { setAlert } from 'redux/ui-store';

const FormInputFile = ({
  id,
  url,
  disabled,
  onChange,
  accept,
  title,
  name,
  mediaType = "desktop",
  style,
  mediaSpec,
  children,
  styleContainer
}) => {

  let dispatch = useDispatch()
  const acceptFormat = accept
    ? accept
        .split(",")
        .map((v) => "image/" + v.substring(1))
        .join(",")
    : "image/jpeg,image/jpg,image/png"

  const onChangeImg = (e) => {
    let fileTypes = acceptFormat.split(",")
    if(fileTypes.includes(e.target?.files[0]?.type)) {
      onChange(e, mediaType)
    } else {
      e.target.value = null
      dispatch(
        setAlert({
          message: `File not supported.`,
        }),
      )
    }
  }

  return (
    <div className={`image-wrapper ${name}`} style={styleContainer}>
      {title && (
        <>
          <p className="media-title media-title-required">{title}</p>
          <p className="media-info">
            Recommended Size: {mediaSpec.size} pixels <br/>
            Supported Image: {accept?.split(",").join(" ") || ".png, .jpg, .jpeg"} File Max: {mediaSpec.file_size} KB
          </p>
        </>
      )}
      <label className="media-label" id={"media-"+id} style={style}>
        {!disabled ? (
          <img src={UploadIcon} className="img-up-icon" alt="up-ic" />
        ) : null}
        <input
          id={id}
          type="file"
          onChange={(e) => onChangeImg(e)}
          className="form-control input-image"
          name={name}
          disabled={disabled}
          accept={acceptFormat}
          data-rule-required="true"
          data-msg-accept="Only .png, .jpg, .jpeg file supported"
        />
        <img src={url || NoImage} className="img-fluid img-up" alt="up-img" />

      </label>
      {children}
      <progress className="upload-progress" id={"progress-"+id} value="0" max="100" style={{width: '100%', display: 'none'}}></progress>
    </div>
  )
}

export default FormInputFile
