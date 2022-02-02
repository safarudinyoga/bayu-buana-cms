import Api from "config/api"
import $ from "jquery"
import useQuery from "lib/query"
import React, {useEffect, useState} from "react"
import {useDispatch} from "react-redux"
import {withRouter} from "react-router"
import {setAlert, setUIParams} from "redux/ui-store"
import env from "../../config/environment"
import FormContainer from '../../components/form/container';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app

const endpoint = "/master/divisions"
const backUrl = "/master/divisions"

function DivisionHierarchy(props) {
  let dispatch = useDispatch()

  let formId = props.match.params.id
  const isView = useQuery().get("action") === "view"
  const [data, setTree] = useState([
    { title: 'Chicken', children: [{ title: 'Egg' }] },
    { title: 'Fish', children: [{ title: 'fingerline' }] },
  ])

  return (
    <FormContainer
        isView={isView}
        onBack={()=>{}}
        id={formId}
    >
        <div style={{ height: 400 }}>
            <SortableTree
            treeData={data}
            onChange={treeData => setTree(treeData)}
            />
        </div>
    </FormContainer>
  )
}

export default withRouter(DivisionHierarchy)
