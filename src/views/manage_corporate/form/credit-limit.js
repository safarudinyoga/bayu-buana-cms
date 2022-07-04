import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Card, Button, Tabs, TabPane, Modal, ModalBody } from "react-bootstrap"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useSnackbar } from "react-simple-snackbar"

// components & styles
import ModalCreate from 'components/Modal/bb-modal'
import Select from "components/form/select"
import './_form.sass'

// utils
import useQuery from "lib/query"
import { errorMessage } from 'lib/errorMessageHandler'
import createIcon from "assets/icons/create.svg"
import Api from "config/api"
import MasterCreditLimit from 'views/manage_corporate/form/credit-limit/master-credit-limit'
import CreditLimitByProject from 'views/manage_corporate/form/credit-limit/credit-limit-by-project'
import CostCenterModal from 'views/manage_corporate/form/credit-limit/cost-center'

const slugDictionary = {
  is_share_credit_with_other_company: 'Share Credit Limit with Parent Company',
  allocation: 'Allocation',
  total_limit: 'Total Limit Amount'
}

const CreditLimit = ({
  history,
  backUrl,
  handleChangeTabKey,
  corporateId,
  endpoint
}) => {
  const endpointCreditLimit = '/credit-limit'
  const api = new Api()
  const [key, setKey] = useState('master-credit-limit')
  // const [key, setKey] = useState('credit-limit-by-project')
  const [isModalVisible, setisModalVisible] = useState(false)
  const [isThereProject, setisThereProject] = useState(false)

  const [paramsCostCenter, setParamsCostCenter] = useState({
    title: "Cost Center",
    titleModal: "Cost Center",
    createOnModal: true,
    modalSize: 'lg',
    modalClassName: 'credit_limit',
    showAdvancedOptions: false,
    responsiveTablet: true,
    isOpenNewTab: false,
    isHideSearch: true,
    isHidePrintLogo: true,
    isHideDownloadLogo: true,
    isShowColumnAction: false,
    isCheckbox: false,
    baseRoute: "/master/manage-corporate/form",
    endpoint: `${endpoint}/${corporateId}${endpointCreditLimit}/cost-center/master`,
    columns: [
      {
        title: "Cost Center Name",
        data: ""
      },
      {
        title: "Amount",
        data: ""
      },
      {
        title: "Allocation Type",
        data: ""
      },
    ],
  })

  const masterCreditLimitStateFormik = useFormik({
    initialValues: {
      is_share_credit_with_other_company: 'false',
      total_limit: '',
      sharing_option: null,
      allocation: '', //required,
      tolerance_one: {
        amount: '',
        ask_approval: [],
        approver: '',
        approval_by: ''
      },
      tolerance_two: {
        amount: '',
        ask_approval: [],
        approver: '',
        approval_by: ''
      }
    },
    validationSchema: Yup.object({
      allocation: Yup.string().when(
        'is_share_credit_with_other_company', {
          is: (is_share_credit_with_other_company) => is_share_credit_with_other_company === 'true',
          then: Yup.string().required(errorMessage(slugDictionary['allocation'])),
          otherwise: Yup.string()
        }
      )
    }),
    onSubmit: (val) => {
      console.log(val);
    }
  })

  const creditLimitByProjectStateFormik = useFormik({
    initialValues: {

    },
    validationSchema: Yup.object({

    }),
    onSubmit: (val) => {
      console.log(val);
    }
  })



  useEffect(async () => {
    if (corporateId) {
      const fetchMaster = fetchCreditLimitMaster()
      const fetchProject = fetchCreditLimitProject()
      // const fetchCostCenter = fetchCreditLimitCostCenter()

      await Promise.all([fetchMaster, fetchProject])
    }
  }, [corporateId])

  const fetchCreditLimitMaster = async () => {
    try {
      const tes = await api.get(`${endpoint}/${corporateId}${endpointCreditLimit}/master`)
      console.log(tes, 'master');
    } catch (error) {

    }
  }

  const fetchCreditLimitProject = async () => {
    try {
      const tes = await api.get(`${endpoint}/${corporateId}${endpointCreditLimit}/project`)
      console.log(tes, 'project');
    } catch (error) {

    }
  }

  const fetchCreditLimitCostCenter = async () => {
    try {
      const tes = await api.get(`${endpoint}/${corporateId}${endpointCreditLimit}/cost-center/master`)
      console.log(tes, 'cost-center');
    } catch (error) {

    }
  }

  useEffect(() => {
    console.log({
      values: masterCreditLimitStateFormik.values,
      errors: masterCreditLimitStateFormik.errors
    });
  }, [masterCreditLimitStateFormik.values, masterCreditLimitStateFormik.errors])

  const tabList = [
    {
      key: 'master-credit-limit',
      title: 'MASTER CREDIT LIMIT',
      children: (
          <MasterCreditLimit
            setisModalVisible={setisModalVisible}
            formikState={masterCreditLimitStateFormik}
            paramsCostCenter={paramsCostCenter}
          />
        )
    },
    {
      key: 'credit-limit-by-project',
      title: 'CREDIT LIMIT BY PROJECT',
      children: (
          <CreditLimitByProject
            setisModalVisible={setisModalVisible}
            isThereProject={isThereProject}
            setisThereProject={setisThereProject}
            formikState={creditLimitByProjectStateFormik}
          />
        )
    },
  ]

  return (
    <>
      <div className='credit_limit'>
        <Card style={{ marginBottom: 0 }}>
          <Card.Body>
            <h3 className="card-heading">Credit Limit</h3>
            <div>
              <div className='card mt-2 pb-2'>
                <Tabs
                  id='credit-limit'
                  activeKey={key}
                  onSelect={(key) => setKey(key)}
                  className='tabs mb-4'
                  mountOnEnter
                  unmountOnExit
                >
                  {tabList.map((res, i) =>
                    <TabPane
                      key={i}
                      eventKey={res.key}
                      title={
                        <div className="d-md-flex flex-row bd-highlight">
                          <span className="tabs-text uppercase">{res.title}</span>
                        </div>
                      }
                    >
                      {res.children}
                    </TabPane>
                  )}
                </Tabs>
              </div>
            </div>
          </Card.Body>
        </Card>
        <div className="ml-1 mt-3 row justify-content-md-start justify-content-center">
          <Button
            variant="primary"
            type="submit"
            style={{ marginRight: 15, marginBottom: 50, padding: '0 24px' }}
            onClick={masterCreditLimitStateFormik.handleSubmit}
          >
            SAVE & NEXT
          </Button>
          <Button
            variant="secondary"
            // onClick={() => props.history.goBack()}
            style={{ padding: '0 21px' }}
          >
            CANCEL
          </Button>
        </div>
      </div>
{/*
      {isModalVisible && (
        <CostCenterModal
          setisModalVisible={setisModalVisible}
          isModalVisible={isModalVisible}
          formikState={creditLimitConstCenterStateFormik}
        />
      )} */}
    </>
  )
}

CreditLimit.propTypes = {}

export default CreditLimit