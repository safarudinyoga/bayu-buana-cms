import React, { useEffect, useState } from 'react'
import { withRouter } from "react-router"
import { setModalTitle, setCreateModal } from "redux/ui-store"
import { useDispatch, useSelector } from 'react-redux'
import { Tab, Tabs, Button } from 'react-bootstrap'
import TripMultitrip from './components/trip_multitrip'
import Api from "config/api"
import TripRoundtrip from './components/trip_roundtrip'
import TripOneway from './components/trip_oneway'

function ShoppingCacheCreate(props) {
  console.log("shopping cache");
  const dispatch = useDispatch()
  const [flightType, setFlightType] = useState(null)
  const [airports, setAirports] = useState([])
  const [cacheData, setCacheData] = useState({
    cache_air_origin_destination_criteria: [],
    cache_air_travel_preference_criteria: {},
    cache_air_traveler_criteria: {},
  })
  const [flightData, setFlightData] = useState()
  const [tripTypes, setTripTypes] = useState([])
  const showCreateModal = useSelector((state) => state.ui.showCreateModal);


  let api = new Api()

  const handleCacheData = (key, value, key2=null, value2=null) => {
    let cache = {...cacheData}

    cache[key] = value
    if(key2 && value2) {
      cache[key2] = value2 
     }
    setCacheData(cache)
  }

  useEffect(async () => {
    let formId = showCreateModal.id || props.id

    if(formId){
      try {
        let res = await api.get(`master/cache-criterias/flights/${formId}`);
        setFlightType(res.data.trip_type.id)
        setFlightData(res.data)

      } catch (error) {
        
      }
    }
  }, [])

  useEffect(async () => {
    try {
      let res = await api.get("/master/airports?size=-1")
      let airportDataArr = []

      res.data.items.map(async (item, i) => {
        let country = item.city ? await api.get(`/master/countries/${item.city.country_id}`) : ""

        let airportData = {}
        if(item.city){
          airportData = {
            name: item.airport_name,
            code: item.airport_code, 
            city: item.city ? item.city.city_name : "",
            city_code: item.city ? item.city.city_code : "",
            country: country.data ? country.data.country_name : "",
            airport_id: item.id,
            city_id: item.city_id
          }
          airportDataArr.push(airportData)
        }
      })
      setAirports(airportDataArr)
    } catch (error) {
      
    }
  }, [])

  useEffect(async () => {
    try {
      let res = await api.get(`/master/trip-types?filters=["is_default","=","true"]&sort=sort`)
      console.log("trip types",res.data)
      setTripTypes(res.data.items)
    } catch (error) {
      
    }
  }, [])
  

  return (
    <>
      <Tabs 
        id='shopping-cache-trip-types'
        activeKey={flightType}
        onSelect={(k) => {
          setFlightType(k)
        }}
        className={`mb-4 flight-book-tabs`}
        mountOnEnter={true}
        unmountOnExit={true}
      >
        {
          tripTypes ? (
            tripTypes.map((item) => {
              console.log(item, 'item');
              return (
              <Tab
                eventKey={item.id}
                title={item.trip_type_name}
                
                // onSelect={(k) => {
                //   console.log(k);
                // }}
              >
                <div className="d-flex flex-wrap">
                  {
                    item.trip_type_code === "roundtrip" ? (<TripRoundtrip airports={airports} flightData={flightData} handleCacheData={handleCacheData} />) : 
                    item.trip_type_code === "oneway" ? (<TripOneway airports={airports} flightData={flightData} handleCacheData={handleCacheData} />) : <TripMultitrip  airports={airports} handleCacheData={handleCacheData}/>
                  }
                </div>
              </Tab>
            )})
          ) : ""
        }
      </Tabs>
    </>
  )
}

export default withRouter(ShoppingCacheCreate)