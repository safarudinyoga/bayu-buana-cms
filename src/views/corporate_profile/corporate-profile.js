import React, { useEffect, useState, useRef } from "react"
import { useDispatch } from "react-redux"
import { withRouter, Link } from "react-router-dom"
import { setUIParams } from "redux/ui-store"
import { Card, Row, Col, Form, Overlay, Button, Popover } from "react-bootstrap"
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
      users: "ADMINISTRATOR",
      email_user: "Patrick Jane (patrickjane@mail.com)",
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

  //popover
  const [show, setShow] = useState(false)
  const target = useRef(null)

  return (
    <div>
      <Card>
        <Card.Body>
          <Row>
            {DummyData.map((user, i) => (
              <Col xs={6} md={4} key={i}>
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
                    <ReactSVG src="/img/icons/email.svg" />
                    <Form.Label className="ml-2">{user.email}</Form.Label>
                  </Row>
                </Col>
                <Col xs={12}>
                  <Row>
                    <ReactSVG src="/img/icons/phone.svg" />
                    <Form.Label className="ml-2">
                      {user.phone_number}
                    </Form.Label>
                  </Row>
                </Col>
                <Col xs={12}>
                  <Row>
                    <ReactSVG src="/img/icons/telephone-with-fax.svg" />
                    <Form.Label className="ml-2">{user.fax_number}</Form.Label>
                  </Row>
                </Col>
                <Col xs={12}>
                  <Row>
                    <ReactSVG src="/img/icons/url.svg" />
                    <Form.Label className="ml-2">{user.url}</Form.Label>
                  </Row>
                </Col>
                <Col xs={12}>
                  <Row>
                    <ReactSVG src="/img/icons/address.svg" />
                    <Form.Label className="ml-2">{user.addres}</Form.Label>
                  </Row>
                </Col>
                <Col xs={12}>
                  <h3 className="card-heading">
                    {" "}
                    <Form.Label>NPWP</Form.Label>
                  </h3>
                </Col>
                <Link to="/master/corporate-profile/form/">
                  <Button
                    variant="primary"
                    size="lg"
                    style={{ backgroundColor: "#E84D0E" }}
                  >
                    Edit Profile
                  </Button>
                </Link>
              </Col>
            ))}
            <Col xs={6} md={4}>
              <ul className="timeline-with-icons">
                <li className="timeline-item mb-5">
                  <span className="timeline-icon">
                    <ReactSVG src="/img/icons/administrator.svg" />
                  </span>
                  <h5 className="text-muted">ADMINISTRATOR</h5>
                  <Form.Label>Patrick Jane (patrickjane@mail.com)</Form.Label>
                </li>
                <li className="timeline-item mb-5">
                  <span className="timeline-icon">
                    <ReactSVG src="/img/icons/servicelevel.svg" />
                  </span>
                  <h5 className="text-muted">SERVICE LEVEL</h5>
                  <Form.Label>Dedicated Team Off-Site</Form.Label>
                </li>
                <li className="timeline-item mb-5">
                  <span className="timeline-icon">
                    <ReactSVG src="/img/icons/division.svg" />
                  </span>
                  <h5 className="text-muted">BAYU BUANA DIVISION</h5>
                  <Form.Label>National Corporate Division</Form.Label>
                </li>

                <li className="timeline-item mb-5">
                  <span className="timeline-icon">
                    <ReactSVG src="/img/icons/team.svg" />
                  </span>
                  <h5 className="text-muted">TEAM</h5>
                  <Form.Label>
                    Patrick Jane (patrick.jane@mail.com) <br /> Teressa Lisbon
                    (lisbon@mail.com) <br />
                    John Doe (john.doe@mail.com)
                  </Form.Label>
                </li>
              </ul>
            </Col>
            <div className="vertical-line"></div>
            <Col xs={6} md={4}>
              <h1>Branch Offices</h1>
              <Row>
                <ReactSVG src="/img/icons/office-building.svg" />
                <Form.Label className="ml-2">PETRO XYZ SURABAYA</Form.Label>
              </Row>
              <Form.Label className="ml-3">
                Grha Suite
                <br /> Lt. 18 B21 <br />
                Jl. Ahmad Yani 123 Surabaya 60602 - Indonesia <br />
                Tel: +62-31-838372
              </Form.Label>
              <Row>
                <ReactSVG src="/img/icons/office-building.svg" />
                <Form.Label className="ml-2">PETRO XYZ SURABAYA</Form.Label>
              </Row>
              <Form.Label className="ml-3">
                Grha Suite
                <br /> Lt. 18 B21 <br />
                Jl. Ahmad Yani 123 Surabaya 60602 - Indonesia <br />
                Tel: +62-31-838372
              </Form.Label>
              <br />
              <Row>
                <ReactSVG src="/img/icons/office-building.svg" />
                <Form.Label
                  ref={target}
                  onClick={() => setShow(!show)}
                  className="ml-2"
                >
                  3 more branches
                </Form.Label>
              </Row>
              {/* overlay */}

              <Overlay target={target.current} show={show} placement="bottom">
                {(props) => (
                  <div {...props}>
                    <Card style={{ width: "49rem" }}>
                      <Card.Body>
                        <Row>
                          <Col xs={6}>
                            <Row>
                              <ReactSVG src="/img/icons/office-building.svg" />
                              <Form.Label className="ml-2">
                                PETRO XYZ SURABAYA
                              </Form.Label>
                            </Row>
                            <Form.Label className="ml-3">
                              Grha Suite
                              <br /> Lt. 18 B21 <br />
                              Jl. Ahmad Yani 123 Surabaya 60602 - Indonesia{" "}
                              <br />
                              Tel: +62-31-838372
                            </Form.Label>
                          </Col>
                          <Col xs={6}>
                            <Row>
                              <ReactSVG src="/img/icons/office-building.svg" />
                              <Form.Label className="ml-2">
                                PETRO XYZ SURABAYA
                              </Form.Label>
                            </Row>
                            <Form.Label className="ml-3">
                              Grha Suite
                              <br /> Lt. 18 B21 <br />
                              Jl. Ahmad Yani 123 Surabaya 60602 - Indonesia{" "}
                              <br />
                              Tel: +62-31-838372
                            </Form.Label>
                          </Col>

                          <Col>
                            <Row>
                              <ReactSVG src="/img/icons/office-building.svg" />
                              <Form.Label className="ml-2">
                                PETRO XYZ SURABAYA
                              </Form.Label>
                            </Row>
                            <Form.Label className="ml-3">
                              Grha Suite
                              <br /> Lt. 18 B21 <br />
                              Jl. Ahmad Yani 123 Surabaya 60602 - Indonesia{" "}
                              <br />
                              Tel: +62-31-838372
                            </Form.Label>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </div>
                )}
              </Overlay>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  )
}
export default withRouter(CorporateProfile)
