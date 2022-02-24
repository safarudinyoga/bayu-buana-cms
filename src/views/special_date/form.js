import FormBuilder from "components/form/builder"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import Api from 'config/api';
import useQuery from 'lib/query';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from "react-router"
import { setAlert, setUIParams } from 'redux/ui-store';
import DatePicker from "react-datepicker"
import FormInputWrapper from "components/form/input-wrapper";

const endpoint = "/master/agent-special-dates"
const backUrl = "/master/special-date"

function SpecialDateForm(props) {
  let dispatch = useDispatch()

  let formId = props.match.params.id
  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    special_date_name: "",
    special_date_start: "",
    special_date_end: "",
  })
  const translationFields = [
    {
      label: "Name",
      name: "special_date_name",
      type: "text",
    }
  ]

  useEffect(async () => {
    let api = new Api()
    let bcTitle = "Edit Special Date"
    let docTitle = bcTitle
    if(!formId) {
      bcTitle = "Create Special Date"
      docTitle = bcTitle
    } else if(isView) {
      bcTitle = "Special Date Details"
      docTitle = bcTitle
    }

    dispatch(
      setUIParams({
        title: docTitle,
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            link: backUrl,
            text: "Special Dates",
          },
          {
            text: bcTitle
          },
        ],
      }),
    )
    if(formId) {
      try {
        let res = await api.get(endpoint + "/" + formId)
        setForm(res.data);
      } catch (e) { }
    } 
  }, [])

  useEffect(() => {
    if(!props.match.params.id) {
      setLoading(false)
    }
    setId(props.match.params.id)
  }, [props.match.params.id])

  const onSave = async () => {
    setLoading(true)
    let api = new Api()
    try {
      let res = await api.putOrPost(endpoint, id, form)
      setId(res.data.id)
      
      setLoading(false)
      props.history.goBack()
      dispatch(
        setAlert({
          message: `Record '${form.special_date_name}' has been successfully saved.`,
        }),
      )
    } catch(e) {
      setLoading(false)
      dispatch(
        setAlert({
          message: `Failed to save this record.`,
        }),
      )
    } finally {
    }
  }

  return (
    <FormBuilder
      onBuild={(el) => setFormBuilder(el)}
      isView={isView || loading}
      onSave={onSave}
      back={backUrl}
      alertMessage={"Incomplete Data"}
      isValid={false}
    >
      <FormHorizontal>
        <FormInputControl
          label="Special Date Name"
          required={true}
          value={form.special_date_name}
          name="special_date_name"
          onChange={(e) => setForm({...form, special_date_name: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="256"
        />
      </FormHorizontal>

        {/* <div>
          <DatePicker 
            className="form-control" selected={form.special_date_start}
            onChange={(date) => setForm({...form, special_date_start: date})} 
          />
          <span>to</span>
          <DatePicker 
            className="form-control" selected={form.special_date_end}
            onChange={(date) => setForm({...form, special_date_end: date})} 
          />
        </div> */}
    </FormBuilder>
  );
}

export default withRouter(SpecialDateForm);
