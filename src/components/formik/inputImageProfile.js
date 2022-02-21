import React from "react"
import NoImage from "assets/imageNull.png"

import "../form/input-image.css"
import { useDispatch } from "react-redux"
import { setAlert } from "redux/ui-store"

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
    if (fileTypes.includes(e.target?.files[0]?.type)) {
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
    <div className={`image-wrapper ${name}`}>
      {title && (
        <>
          <p className="media-title media-title-required">{title}</p>
          <p className="media-info">
            Recommended Size: {mediaSpec.size} pixels <br />
            Supported Image:{" "}
            {accept?.split(",").join(" ") || ".png, .jpg, .jpeg"} File Max:{" "}
            {mediaSpec.file_size} KB
          </p>
        </>
      )}
      <label
        className="media-label items-center"
        id={"media-" + id}
        style={style}
      >
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
        <img
          src={url || NoImage}
          className="img-circle img-up"
          alt="up-img"
          width="125"
          height="125"
        />
        <div className="button-image mt-2">UPLOAD PHOTO</div>
            
      </label>
    </div>
  )
}

export default FormInputFile
