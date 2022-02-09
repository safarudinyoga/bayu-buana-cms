import Api from "config/api"
import React, {useEffect, useState} from "react"
import {useDispatch} from "react-redux"
import {withRouter} from "react-router"
import {setUIParams} from "redux/ui-store"
import FormContainer from '../../components/form/container';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app
import '../../styles/components/_hierarchy.scss'

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
        size: -1,
        sort: "sort"
      })
      let items = res.data.items;

      var parent = items.filter((item, index) => {
        return item["parent_division_id"] == null
      })

      var child = items.filter((item, index) => {
        return item["parent_division_id"] != null
      })

      var dataTree = [];
      for(var i = 0; i< parent.length; i++){
        var title = parent[i].division_name;
        var children = [];
        for(var j = 0; j< child.length; j++){
          if(child[j].parent_division_id == parent[i].id){
            let childrenTitle = {
              title: child[j].division_name
            }
            children.push(childrenTitle)
          }
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
        canDrag={false}
        generateNodeProps = {
          ({ node, path }) => ({
            title: (<span style={{maxWidth: 100}}><i className="hie-ic fas fa-users" aria-hidden="true"></i>{node.title.substring(0,40)}</span>)
          })
        }
        />
      }
    </FormContainer>
  )
}

export default withRouter(DivisionHierarchy)
