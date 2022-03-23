import { withRouter } from "react-router"
import React, { useEffect, useState } from "react"
import FormHorizontal from "components/form/horizontal"
import FormBuilder from "components/form/builder"
import useQuery from "lib/query"
import BBDataTable from "components/table/bb-data-table"
import { Table } from "react-bootstrap"
import rowStatus from "lib/row-status"
import AccessManagerRow from "components/table/access-manager-row"
import Api from "config/api"


const backUrl = "/master/user-access-type"

function ModuleAccess(props) {
  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [id, setId] = useState(null)
  const [modules, setModules] = useState([])
  const [categories, setCategories] = useState([])

  const api = new Api()
  useEffect(() => {
    if (!props.match.params.id) {
      setLoading(false)
    }
    setId(props.match.params.id)
  }, [props.match.params.id])

  const onSave = async () => {
    
  }

  useEffect(async () => {
    try {
      let res = await api.get('/master/menu-links?size=999&sort=sort')
      const cat = []
      const mod = []
      const comp = []

      res.data.items.forEach((data) => {
        if(!data.parent_link_id){
          cat.push(data)
        } else {
          mod.push(data)
        }        
      })

      console.log(cat);
      let listMod = mod.map(m => {
        let catObj = cat.filter(c => m.parent_link_id.includes(c.id))
        if(catObj.length > 0){
          let catName = catObj[0].menu_link_name
          m.categoryName = catName
          comp.push(
            <AccessManagerRow moduleName={m.menu_link_name} category={m.categoryName} />
          )
        }        
      })
      // console.log(comp);
      setModules(comp)
    } catch (e) {
      console.log(e)
      throw e
    }
  }, [])
  


  return (
    <FormBuilder
      onBuild={(el) => setFormBuilder(el)}
      isView={isView || loading}
      onSave={onSave}
      back={backUrl}
      alertMessage={"Incomplete data"}
      isValid={true}
      showHeaderTitle={true}
      headerTitle={"Module Access - Manager"}
      txtSave={"SAVE"}
      hideTranslation={true}
    >
      <FormHorizontal>
        <Table responsive>
          <thead>
            <tr>
              <th>Module Name</th>
              <th>Category</th>
              <th>View</th>
              <th>Create</th>
              <th>Delete</th>
              <th>Edit</th>
              <th>Mass Update</th>
              <th>Export</th>
            </tr>
          </thead>
          <tbody>
            {modules}
          </tbody>
        </Table>
      </FormHorizontal>

    </FormBuilder>
  )
}

export default withRouter(ModuleAccess)
