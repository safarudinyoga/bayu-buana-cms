import React from "react"
import FormInputFile from './input-image'

const mediaTypes = [
	{ type: "Desktop", size: "1200 x 630", file_size: "300" }, 
	{ type: "Tablet", size: "820 x 430", file_size: "220" }, 
	{ type: "Mobile", size: "640 x 336", file_size: "100" }, 
]
const MediaForm = ({
	isView = false,
	data = {
		attraction_asset_desktop: {
			multimedia_description_id: null,
			multimedia_description: {
				url: "",
			},
		},
		attraction_asset_mobile: {
			multimedia_description_id: null,
			multimedia_description: {
				url: "",
			},
		},
		attraction_asset_tablet: {
			multimedia_description_id: null,
			multimedia_description: {
				url: "",
			},
		},
	},
	doUpload = () => { },
	moduleName = ""
}) => {
	return (
		<div className="media-form">
			<p className="text-sub-header">MEDIA</p>
			<div className="row">
				{
					mediaTypes.map((m, i) => (
						<div className="col-md-4" key={i}>
							<FormInputFile
								id={m.type.toLowerCase()}
								title={isView ? `Banner (${m.type})` : `Banner (${m.type}) Image`}
								mediaType={m.type.toLowerCase()}
								onChange={doUpload}
								url={data[moduleName + "_asset_" + m.type.toLowerCase()]?.multimedia_description?.url || ""}
								accept=".png,.jpg,.jpeg"
								name={moduleName + "_asset_" + m.type.toLowerCase()}
								disabled={isView}
								mediaSpec={m}
							/>
							{/* <progress className="upload-progress" id={"progress-"+m_type.toLowerCase()} value="0" max="100" style={{width: '100%', display: 'none'}}></progress> */}
						</div>
					))
				}
			</div>
		</div>
	)
}

export default MediaForm
