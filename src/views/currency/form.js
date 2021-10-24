import { withRouter } from "react-router"
import React, { useEffect, useState } from "react"
import Api from "config/api"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormBuilder from "components/form/builder"
import FormInputWrapper from "components/form/input-wrapper"
import useQuery from "lib/query"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"

const endpoint = "/master/currencies"
const backUrl = "/master/currencies"

function CurrencyForm(props) {
  let dispatch = useDispatch()

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    currency_code: "",
    numeric_code: "",
    currency_name: "",
    currency_symbol: "",
    position: "",
    minor_unit_name: "",
    minor_unit: 0,
    standard_precision: 0,
    price_precision: 0,
  })
  const translationFields = [
    {
      label: "Currency Name",
      name: "currency_name",
      type: "text",
    },
    {
      label: "Minor Unit Name",
      name: "minor_unit_name",
      type: "text",
    },
  ]

  const validationRules = {
    currency_code: {
      required: true,
      minlength: 0,
      maxlength: 3,
    },
    numeric_code: {
      required: true,
      minlength: 0,
      maxlength: 3,
    },
    currency_name: {
      required: true,
      minlength: 0,
      maxlength: 64,
    },
    currency_symbol: {
      required: true,
      minlength: 0,
      maxlength: 64,
    },
    position: {},
    minor_unit_name: {
      minlength: 0,
      maxlength: 64,
    },
    minor_unit: {
      min: 0,
      max: 99,
    },
    standard_precision: {
      min: 0,
      max: 99,
    },
    price_precision: {
      min: 0,
      max: 99,
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Currency"
    if (!formId) {
      docTitle = "Create Currency"
    } else if (isView) {
      docTitle = "Currency Details"
    }

    dispatch(
      setUIParams({
        title: docTitle,
        breadcrumbs: [
          {
            link: "/",
            text: "Master Data Management",
          },
          {
            link: backUrl,
            text: "Currency",
          },
          {
            text: docTitle,
          },
        ],
      }),
    )
    if (formId) {
      try {
        let res = await api.get(endpoint + "/" + formId)
        setForm(res.data)
      } catch (e) {}

      try {
        let res = await api.get(endpoint + "/" + formId + "/translations", {
          size: 50,
        })
        setTranslations(res.data.items)
      } catch (e) {}
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!props.match.params.id) {
      setLoading(false)
    }
    setId(props.match.params.id)
  }, [props.match.params.id])

  const onSave = async () => {
    let translated = formBuilder.getTranslations()
    setLoading(true)
    let api = new Api()
    try {
      let res = await api.putOrPost(endpoint, id, form)
      setId(res.data.id)
      for (let i in translated) {
        let tl = translated[i]
        let path = endpoint + "/" + res.data.id + "/translations"
        await api.putOrPost(path, tl.id, tl)
      }
    } catch (e) {
    } finally {
      setLoading(false)
      props.history.push(backUrl)
    }
  }

  return (
    <FormBuilder
      onBuild={(el) => setFormBuilder(el)}
      isView={isView || loading}
      onSave={onSave}
      back={backUrl}
      translations={translations}
      translationFields={translationFields}
      alertMessage={"Incomplete data"}
      isValid={false}
      rules={validationRules}
    >
      <FormHorizontal>
        <FormInputControl
          label="Currency Name *"
          value={form.currency_name}
          name="currency_name"
          cl="3"
          cr="6"
          onChange={(e) => setForm({ ...form, currency_name: e.target.value })}
          disabled={isView || loading}
          type="text"
          minLength="0"
          maxLength="64"
        />
        <FormInputControl
          label="Currency Symbol *"
          value={form.currency_symbol}
          name="currency_symbol"
          cl="3"
          cr="6"
          onChange={(e) =>
            setForm({ ...form, currency_symbol: e.target.value })
          }
          disabled={isView || loading}
          type="text"
          minLength="0"
          maxLength="64"
        />
        <FormInputWrapper label="Symbol Position" cl="3" cr="6">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="position"
              id="csp-1"
              value="Before"
              checked={form.position === "Before"}
              onChange={(e) => setForm({ ...form, position: e.target.value })}
            />
            <label className="form-check-label" htmlFor="csp-1">
              Before
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="position"
              id="csp-2"
              value="After"
              checked={form.position === "After"}
              onChange={(e) => setForm({ ...form, position: e.target.value })}
            />
            <label className="form-check-label" htmlFor="csp-2">
              After
            </label>
          </div>
        </FormInputWrapper>
        <FormInputControl
          label="Minor Unit Name"
          value={form.minor_unit_name}
          name="minor_unit_name"
          cl="3"
          cr="6"
          onChange={(e) =>
            setForm({ ...form, minor_unit_name: e.target.value })
          }
          disabled={isView || loading}
          type="text"
          minLength="0"
          maxLength="64"
        />
        <FormInputControl
          label="Minor Unit"
          value={form.minor_unit}
          name="minor_unit"
          cl="3"
          cr="3"
          onChange={(e) => setForm({ ...form, minor_unit: parseInt(e.target.value) })}
          disabled={isView || loading}
          type="number"
          min="0"
          max="99"
        />
        <FormInputControl
          label="Standard Precision"
          value={form.standard_precision}
          name="standard_precision"
          cl="3"
          cr="3"
          onChange={(e) =>
            setForm({ ...form, standard_precision: parseInt(e.target.value) })
          }
          disabled={isView || loading}
          type="number"
          min="0"
          max="99"
        />
        <FormInputControl
          label="Price Precision"
          value={form.price_precision}
          name="price_precision"
          cl="3"
          cr="3"
          onChange={(e) =>
            setForm({ ...form, price_precision: parseInt(e.target.value) })
          }
          disabled={isView || loading}
          type="number"
          min="0"
          max="99"
        />
      </FormHorizontal>

      <FormHorizontal>
        <FormInputControl
          label="Currency Code *"
          value={form.currency_code}
          name="currency_code"
          cl="4"
          cr="6"
          onChange={(e) => setForm({ ...form, currency_code: e.target.value })}
          disabled={isView || loading}
          type="text"
          minLength="0"
          maxLength="3"
          hint="Currency code maximum 3 characters"
        />
        <FormInputControl
          label="Numeric Code *"
          value={form.numeric_code}
          name="numeric_code"
          cl="4"
          cr="6"
          onChange={(e) => setForm({ ...form, numeric_code: e.target.value })}
          disabled={isView || loading}
          type="text"
          minLength="0"
          maxLength="3"
          hint="Numeric Code maximum 3 characters"
        />
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(CurrencyForm)
