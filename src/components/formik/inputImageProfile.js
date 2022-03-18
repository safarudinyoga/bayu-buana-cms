import React, {useState} from "react"
import NoImage from "assets/imageNull.png"
import ImageUploading from "react-images-uploading"
import { Row,Button, CloseButton, Image } from "react-bootstrap"

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
  photoProfile=[],
}) => {
  let dispatch = useDispatch()
  const [showCloseBtn, setShowCloseBtn] = useState(false)
  const acceptFormat = accept
    ? accept
        .split(",")
        .map((v) => "image/" + v.substring(1))
        .join(",")
    : "image/jpeg,image/jpg,image/png"

  return (
    <div
      className="d-md-flex d-lg-block justify-content-md-center align-items-md-center"
      style={{marginBottom: 20}}
    >
        {photoProfile.length == 0 && (
          <Image
            src="/img/media/profile.svg"
            className="img-profile"
            roundedCircle
          />
        )}
        <ImageUploading
          value={photoProfile}
          onChange={onChange}
          dataURLKey="data_url"
          acceptType={["png", "jpg", "jpeg"]}
        >
          {({
            imageList,
            onImageUpload,
            onImageUpdate,
            onImageRemove,
            errors,
          }) => (
            // write your building UI
            <>
            {console.log(imageList)}
              {imageList.map((image, index) => (
                <div key={index} className="image-item" style={{position: "relative"}}
                  onMouseEnter={e => {
                    setShowCloseBtn(true)
                  }}
                  onMouseLeave={e => {
                    setShowCloseBtn(false)
                  }}
                >
                  <Image
                    src={image["data_url"]}
                    roundedCircle
                    className="img-profile"
                  />
                  {!disabled && (
                  <CloseButton                    
                    style={{position: "absolute", top: 0, right: 0, display: showCloseBtn ? "block" : "none"}}
                    onClick={() => onImageRemove(0)} 
                  />
                  )}
                </div>
              ))}
              {!disabled && (<Button
                variant="secondary"
                className="d-block d-md-flex d-lg-block mt-2 mt-md-0 mt-lg-2 ml-md-3 ml-lg-0"
                onClick={() => 
                  photoProfile.length !== 0
                    ? onImageUpload()
                    : onImageUpdate(0)
                }
              >
                UPLOAD PHOTO
              </Button>)}
              {errors && (
                <>
                  {errors.acceptType && (
                    <p className="img-error-label">
                      Only .png, .jpg, .jpeg file supported
                    </p>
                  )}
                </>
              )}
            </>
          )}
        </ImageUploading>
    </div>
  )
}

export default FormInputFile
