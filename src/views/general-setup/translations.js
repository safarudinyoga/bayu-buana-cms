import { Formik } from "formik"
import React, { useEffect, useState } from "react"
import { Card, Form, Row, Col, Button } from "react-bootstrap"
import Api from "config/api"
import CancelButton from "components/button/cancel"
import { useDispatch } from "react-redux"
import { setAlert } from "redux/ui-store"
import FormikControl from "components/formik/formikControl"
import form from "views/age_qualifying_type/form"

// import Select from "components/form/select"

const Translations = (props) => {
    const dispatch = useDispatch()
    let api = new Api()
    const endpoint = `/master/configurations/translations`
    const [additionalLanguage, setAdditionalLanguage] = useState([])
    // const [formValues, setFormValues] = useState(null)

    const initialValues = {
      language_id: ""
    }

    useEffect(async() =>{
      try {
        let res = await api.get("/master/languages?size=-1")
        setAdditionalLanguage(res.data.items)
      } catch(error) {

      }
    })

    const onSubmit = async (values, a) => {
      console.log("submit: ", values)
      try {
        for (let i in values) {
          let tc = values[i]
          await api.putOrPost(endpoint, false, tc)
        }
        dispatch(
          setAlert({
            message: `Translations has been successfully updated.`,
          }),
        )
      } catch (e) {
        dispatch(
          setAlert({
            message: "Failed to save this record.",
          }),
        )
      }
    }
  
    return (
      <>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validateOnMount
          enableReinitialize
        >
          {({ dirty, handleSubmit, isSubmitting, setFieldValue, values }) => (
            <Form onSubmit={handleSubmit}>
              <Card>
                <Card.Body>
                  <h3 className="card-heading">Translations</h3>
                  <div style={{ padding: "0 15px 40px 0" }}>
                  <Row>
                    <Col md={5}>
                    <FormikControl
                        control="selectAsync"
                        required={"label-required"}
                        label="Primary Language"
                        name="language_name"
                        fieldName={"language_name"}
                        placeholder={"Please Choose Language"}
                        url={`master/languages`}
                        sort={"language_name"}
                        onChange={(v) => {
                            setFieldValue("language_id", v);
                        }}
                        style={{ maxWidth: 250 }}
                    />
                    
                    <Form.Group as={Row} className="form-group">
                      <Form.Label column sm={4} className="mb-2">
                        Additional Language
                      </Form.Label>
                      <Col>
                      <Row>
                      {
                        additionalLanguage.map((item, i) => 
                        <Col 
                          md={4}
                          className={item.id === values.language_id.value ? "d-none" : ""}
                        >
                          <Form.Check
                            type="checkbox"
                            className="mt-2"
                            label={item.language_name}
                            />
                          {console.log("hueheeie", item.id)}
                          </Col>
                        )}
                        
                        {/* {console.log("hihi", values.value)} */}
                      </Row>
                      </Col>

                    </Form.Group>
                  </Col>
                  </Row> 
                  </div>
                </Card.Body>
              </Card>
              <div
                style={{
                  marginBottom: 30,
                  marginTop: 30,
                  display: "flex",
                }}
              >
                <Button
                  variant="primary"
                  type="submit"
                  style={{ marginRight: 15 }}
                >
                  SAVE 
                </Button>
                <CancelButton />
              </div>
            </Form>
          )}
        </Formik>
      </>
    )
}

export default Translations;
