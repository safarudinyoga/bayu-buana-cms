import Api from "config/api"
import React, {useEffect, useState} from "react"
import {useDispatch} from "react-redux"
import {withRouter} from "react-router"
import {setUIParams} from "redux/ui-store"
import FormContainer from '../../components/form/container';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app

const endpoint = "/master/divisions"
const backUrl = "/master/divisions"

function DivisionHierarchy(props) {
  let dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [data, setTree] = useState([])

  useEffect(async () => {
    let api = new Api()    

    let docTitle = "Division Hierarchy"
    dispatch(
      setUIParams({
        title: docTitle,
        breadcrumbs: [
          {
            text: "Employee Management",
          },
          {
            link: backUrl,
            text: "Division",
          },
          {
            text: docTitle,
          },
        ],
      }),
    )
      let res = await api.get(endpoint, {
        size: 9999,
        sort: "sort"
      })
      let items = res.data.items;
      var dataTree = [];
      for(var i = 0; i< items.length; i++){
        var title = items[i].division_name;
        var children = [];
        if(items[i].parent_division_id){
          title = items[i].parent_division.division_name
          let childrenTitle = {
            title: items[i].division_name
          }
          children.push(childrenTitle)
        }
        let data = {
          title: title,
          children: children
        }
        dataTree.push(data)
      }
      setTree(dataTree)
      setLoading(false)
  }, [])

  const onBack = () => {
    props.history.push(backUrl)
  }
  return (
    <FormContainer
      isView={true}
      onBack={onBack}
    >
      {!loading && <SortableTree
        treeData={data}
        onChange={treeData => setTree(treeData)}
        isVirtualized={false}
        />
      }
    </FormContainer>
  )
}

export default withRouter(DivisionHierarchy)
