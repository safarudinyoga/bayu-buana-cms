import Api from "config/api"
import {Component} from "react"
import FormInputFile from './input-image'

const mediaTypes = ["desktop", "tablet", "mobile"]
const MediaForm = ({
	data= {
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
	doUpload = () => {}
}) => {
    return (
    	<div className="media-form">
			<p class="text-sub-header">MEDIA</p>
			<div className="row">
				{
					mediaTypes.map((m_type, i) => (
						<div className="col-md-4">
							<FormInputFile
								title={`BANNER (${m_type}) IMAGE`}
								value={[m_type].language_native_name}
								mediaType={m_type}
								onChange={doUpload}
								url={data["attraction_asset_"+m_type]?.multimedia_description?.url || ""}
								accept=".png,.jpg,.jpeg"
								name={"attraction_asset_"+m_type}
							/>
						</div>
					))
				}
			</div>
    	</div>
    )
}

export default MediaForm
