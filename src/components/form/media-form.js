import React from "react"
import FormInputFile from './input-image'

const mediaTypes = ["Desktop", "Tablet", "Mobile"]
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
					mediaTypes.map((m_type, i) => (
						<div className="col-md-4" key={i}>
							<FormInputFile
								id={m_type.toLowerCase()}
								title={isView ? `Banner (${m_type})` : `Banner (${m_type}) Image`}
								mediaType={m_type.toLowerCase()}
								onChange={doUpload}
								url={data[moduleName + "_asset_" + m_type.toLowerCase()]?.multimedia_description?.url || ""}
								accept=".png,.jpg,.jpeg"
								name={moduleName + "_asset_" + m_type.toLowerCase()}
								disabled={isView}
							/>
						</div>
					))
				}
			</div>
		</div>
	)
}

export default MediaForm
