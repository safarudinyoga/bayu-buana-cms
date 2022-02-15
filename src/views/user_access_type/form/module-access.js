import { withRouter } from "react-router"
import React, { useEffect, useState } from "react"
import FormHorizontal from "components/form/horizontal"
import FormBuilder from "components/form/builder"
import useQuery from "lib/query"
const backUrl = "/master/user-access-type"

function ModuleAccess(props) {
  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [id, setId] = useState(null)

  useEffect(() => {
    if (!props.match.params.id) {
      setLoading(false)
    }
    setId(props.match.params.id)
  }, [props.match.params.id])

  const onSave = async () => {
    
  }

  return (
    <FormBuilder
      onBuild={(el) => setFormBuilder(el)}
      isView={isView || loading}
      onSave={onSave}
      back={backUrl}
      alertMessage={"Incomplete data"}
      isValid={true}
      showHeaderTitle={true}
      headerTitle={"Module Access"}
      txtSave={"SAVE & NEXT"}
    >
      <FormHorizontal>
        
      </FormHorizontal>

    </FormBuilder>
  )
}

export default withRouter(ModuleAccess)
