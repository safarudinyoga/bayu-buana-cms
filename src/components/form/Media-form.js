import Api from "config/api"
import {Component} from "react"
import FormInputFile from './input-image'

const mediaTypes = ["desktop", "tablet", "mobile"]
export default class MediaForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isView: false,
			desktop: {
				language_code: "",
				language_alpha_3_code: "",
				language_name: "",
				language_native_name: "",
				language_asset: {
					multimedia_description_id: null,
					multimedia_description: {
						url: "",
					},
				},
			},
			tablet: {
				language_code: "",
				language_alpha_3_code: "",
				language_name: "",
				language_native_name: "",
				language_asset: {
					multimedia_description_id: null,
					multimedia_description: {
						url: "",
					},
				},
			},
			mobile: {
				language_code: "",
				language_alpha_3_code: "",
				language_name: "",
				language_native_name: "",
				language_asset: {
					multimedia_description_id: null,
					multimedia_description: {
						url: "",
					},
				},
			},
    }

    this.translated = {}
    this.hasTranslated = false
    this.api = new Api()
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

	doUpload = async (e, mode) => {
    try {
      let api = new Api()
      let payload = new FormData()
      payload.append("files", e.target.files[0])
      let res = await api.post("/multimedia/files", payload)
      if (res.data) {
        this.setState({
			[mode]: {
				...this.state[mode],
				language_asset: {
				multimedia_description_id: res.data.id,
				multimedia_description: res.data,
				},
			}
		})
      }
    } catch (e) { }
  }

  render() {
		const {desktop, tablet, mobile, isView} = this.state
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
								onChange={this.doUpload}
								disabled={isView}
								data={m_type}
								accept=".png,.jpg,.jpeg"
							/>
						</div>
					))
				}
			</div>
    	</div>
    )
  }
}
