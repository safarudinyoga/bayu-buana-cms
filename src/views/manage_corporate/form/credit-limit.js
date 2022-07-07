import React, { useEffect, useState } from 'react'
import { Card, Button, Tabs, TabPane } from "react-bootstrap"
import { useFormik } from "formik"
import * as Yup from "yup"
import PropTypes from 'prop-types'

// components & styles
import './_form.sass'

// utils
import { errorMessage } from 'lib/errorMessageHandler'
import Api from "config/api"
import MasterCreditLimit from 'views/manage_corporate/form/credit-limit/master-credit-limit'
import CreditLimitByProject from 'views/manage_corporate/form/credit-limit/credit-limit-by-project'

const slugDictionary = {
  is_share_credit_with_other_company: 'Share Credit Limit with Parent Company',
  allocation: 'Allocation',
  total_limit: 'Total Limit Amount',
  project_name: 'Project Name',
  total_limit_project: 'Total Limit Amount',
  period_based_on: 'Period based on'
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
  const [isThereProject, setisThereProject] = useState(true)

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
      // master-credit-limit
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
      },
    },
    validationSchema: Yup.object({
      allocation: Yup.string().when(
        'is_share_credit_with_other_company', {
          is: (is_share_credit_with_other_company) => is_share_credit_with_other_company === 'true',
          then: Yup.string().required(errorMessage(slugDictionary['allocation'])),
          otherwise: Yup.string()
        }
      ),
    }),
    onSubmit: (val) => {
      console.log(val);
    }
  })

  const creditLimitByProjectStateFormik = useFormik({
    initialValues: {
      // credit-limit-by-project-state
      project_name: '',
      total_limit_project: '',
      period: {
        date_start: '',
        date_end: ''
      },
      period_based_on: ''
    },
    validationSchema: Yup.object({
      project_name: isThereProject ? Yup.string().required(errorMessage(slugDictionary['project_name'])) : Yup.string(),
      total_limit_project: isThereProject ? Yup.string().required(errorMessage(slugDictionary['total_limit_project'])) : Yup.string(),
      period_based_on: isThereProject ? Yup.string().required(errorMessage(slugDictionary['period_based_on'])) : Yup.string()
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
            isThereProject={isThereProject}
            setisThereProject={setisThereProject}
            formikState={creditLimitByProjectStateFormik}
            paramsCostCenter={paramsCostCenter}
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
            onClick={() => handleChangeTabKey('assign-team', 7)}
            style={{ padding: '0 21px' }}
          >
            CANCEL
          </Button>
        </div>
      </div>
    </>
  )
}

CreditLimit.propTypes = {
  history: PropTypes.object.isRequired,
  backUrl: PropTypes.string.isRequired,
  handleChangeTabKey: PropTypes.func.isRequired,
  corporateId: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired
}

export default CreditLimit