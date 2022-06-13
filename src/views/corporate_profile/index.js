import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { withRouter } from "react-router-dom"
import { setUIParams } from "redux/ui-store"
import { Card, Row, Col, Form, Tab, Nav, Button } from "react-bootstrap"
import moment from "moment"
import { ReactSVG } from "react-svg"
import "./corporate_profile.css"

const CorporateProfile = (props) => {
  const DummyData = [
    {
      logo: "",
      company_name: "Petro XYZ",
      email: "infopetroxyz@gmail.com",
      phone_number: "3103533",
      fax_number: "3103533",
      url: "www.petroxyz.com",
      addres:
        "Graha Iska, 6th Floor, Jl. Pramuka no.165, Jakarta Pusat - Jakarta - Indonesia",
    },
  ]
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Company Profile",
        breadcrumbs: [
          {
            text: "Corporate Management",
          },
          {
            text: "Company Profile",
          },
        ],
      }),
    )
  }, [])
  return (
    <div>
      <Card>
        {DummyData.map((user, i) => (
          <Card.Body key={i}>
            <Row>
              <Col xs={6} md={4}>
                <Row>
                  <Col xs={6}></Col>
                  <Col xs={6}>
                    <Form.Label>{user.company_name}</Form.Label>
                    <br /> {moment().format("DD MMMM YY")}
                    <br />
                    <div className="Stars" />
                  </Col>
                </Row>
                <Col xs={12}>
                  <Row>
                    <ReactSVG src="/img/icons/setup-general-information.svg" />
                    <Form.Label className="ml-2">{user.email}</Form.Label>
                  </Row>
                </Col>
                <Col xs={12}>
                  <Row>
                    <ReactSVG src="/img/icons/setup-general-information.svg" />
                    <Form.Label className="ml-2">
                      {user.phone_number}
                    </Form.Label>
                  </Row>
                </Col>
                <Col xs={12}>
                  <Row>
                    <ReactSVG src="/img/icons/setup-general-information.svg" />
                    <Form.Label className="ml-2">{user.fax_number}</Form.Label>
                  </Row>
                </Col>
                <Col xs={12}>
                  <Row>
                    <ReactSVG src="/img/icons/setup-general-information.svg" />
                    <Form.Label className="ml-2">{user.url}</Form.Label>
                  </Row>
                </Col>
                <Col xs={12}>
                  <Row>
                    <Form.Label>{user.addres}</Form.Label>
                  </Row>
                </Col>
                <Col xs={12}>
                  <h3 className="card-heading">
                    {" "}
                    <Form.Label>NPWP</Form.Label>
                  </h3>
                </Col>
                <Button
                  variant="primary"
                  size="lg"
                  style={{ backgroundColor: "#E84D0E" }}
                >
                  Edit Profile
                </Button>
              </Col>
              <Col xs={6} md={4}>
                <ul className="timeline">
                  <li className="event">
                    <h3>Administrator</h3>
                    <p>Patrick jane (PatrikJane@gmail.com)</p>
                  </li>
                  <li className="event" data-date="2:30 - 4:00pm">
                    <h3>Service Level</h3>
                    <p>Dedicated Team Off-Site</p>
                  </li>
                  <li className="event" data-date="5:00 - 8:00pm">
                    <h3>Bayu Buana Division</h3>
                    <p>National Corporate Division</p>
                  </li>
                  <li className="event" data-date="8:30 - 9:30pm">
                    <h3>Team</h3>
                    <p>
                      Patrick Jane (patrick.jane@mail.com) Teressa Lisbon
                      (lisbon@mail.com) John Doe (john.doe@mail.com)
                    </p>
                  </li>
                </ul>
              </Col>
              <Col xs={6} md={4}>
                xs=6 md=4
              </Col>
            </Row>
          </Card.Body>
        ))}
      </Card>
    </div>
  )
}
export default withRouter(CorporateProfile)
