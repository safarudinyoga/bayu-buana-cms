import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { withRouter } from "react-router"
import { setModalTitle, setCreateModal } from "redux/ui-store"
import { Tab, Tabs, Button } from 'react-bootstrap'
import Routes from 'views/extranet/components/micro-components/routes'
import TripDateRoundtrip from './components/trip_date_roundtrip'
import Travellers from 'views/extranet/components/micro-components/travellers'
import TripFlightClass from './components/trip_flight_class'
import TripCorporate from './components/trip_corporate'
import TripMultitrip from './components/trip_multitrip'
import TripDateOneway from './components/trip_date_oneway'
import Api from "config/api"
import TripRoundtrip from './components/trip_roundtrip'
import TripOneway from './components/trip_oneway'
import CancelButton from 'components/button/cancel'

function ShoppingCacheCreate(props) {
  console.log("shopping cache");
  const dispatch = useDispatch()
  const [flightType, setFlightType] = useState("3234761b-3fd2-4fd0-ba48-3742ffd3e7cb")
  const [airports, setAirports] = useState([])
  const [cacheData, setCacheData] = useState({
    cache_air_origin_destination_criteria: [],
    cache_air_travel_preference_criteria: {},
    cache_air_traveler_criteria: {},
  })
  const [tripTypes, setTripTypes] = useState([])


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
    // let formId = showCreateModal.id || props.id

    let docTitle = "Edit Shopping Criteria"
    // if (!formId) {
      docTitle = "Add Shopping Criteria"
    // } else if (isView) {
    //   docTitle = "Exchange Rate Details"
    // }

    dispatch(setModalTitle(docTitle))

    // if(formId) {
    //   try {
    //     let {data} = await API.get(endpoint + "/" + formId)
    //     setFormValues({
    //       ...data,
    //       from_currency_id: {
    //         value: data.from_currency.id,
    //         label: data.from_currency.currency_name,
    //       },
    //       to_currency_id: {
    //         value: data.to_currency.id,
    //         label: data.to_currency.currency_name,
    //       }
    //     })
    //   } catch(e) {
    //     console.log(e)
    //   }
    // }
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
  

  // const airports = [
  //   {
  //     name: "Jakarta, Indonesia",
  //     city: "Jakarta",
  //     code: "JKT",
  //     all: "All Airports"
  //   },
  //   { 
  //     name: "Soekarno-Hatta Intl",
  //     city: "Jakarta",
  //     country: "Indonesia",
  //     code: "CGK",
  //     city_code: "JKT",
  //   },
  //   { 
  //     name: "Halim Perdana Kusuma",
  //     city: "Jakarta",
  //     country: "Indonesia",
  //     code: "HLP",
  //     city_code: "JKT",
  //   },
  //   {
  //     name: "Singapore, Singapore",
  //     city: "Singapore",
  //     code: "SIN",
  //     all: "All Airports"
  //   },
  //   { 
  //     name: "Singapore Changi Airport",
  //     city: "Singapore",
  //     country: "Singapore",
  //     code: "SIN",
  //     city_code: "SIN",
  //   },
  // ]

  useEffect(() => {
    console.log(cacheData)
  }, [cacheData])
  
  const handleSubmitData = async () => {
    try {
      let res = await api.post("/master/cache-criterias", cacheData)
    } catch (error) {
      
    }
  }

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
                    item.trip_type_code === "roundtrip" ? (<TripRoundtrip airports={airports} handleCacheData={handleCacheData} />) : 
                    item.trip_type_code === "oneway" ? (<TripOneway airports={airports} handleCacheData={handleCacheData} />) : <TripMultitrip  airports={airports} handleCacheData={handleCacheData}/>
                  }
                </div>
              </Tab>
            )})
          ) : ""
        }
        {/* <Tab
          eventKey="3234761b-3fd2-4fd0-ba48-3742ffd3e7cb"
          title="Roundtrip"

        >
          <div className='d-flex flex-wrap'>
            <TripRoundtrip airports={airports} handleCacheData={handleCacheData} />
            <Travellers smallSize={true} handleCacheData={handleCacheData} />
            <TripFlightClass smallSize={true} />
            <TripCorporate smallSize={true} />
          </div>
          
        </Tab>
        <Tab
          eventKey="dd3254b3-719b-43f4-b45c-11a99727cf06"
          title="One Way"
        >
          <div className='d-flex flex-wrap'>
            <TripOneway airports={airports} handleCacheData={handleCacheData} />
            <Travellers smallSize={true} handleCacheData={handleCacheData} />
            <TripFlightClass smallSize={true} />
            <TripCorporate smallSize={true} />
          </div>
        </Tab>
        <Tab
          eventKey="d521b5fe-29bf-48c6-ac6e-7ef9b42c9fa9"
          title="Multi City"
        >
          <TripMultitrip airports={airports} />
        </Tab> */}
      </Tabs>

      {/* <div className="mt-4 mb-5 ml-1 row justify-content-md-start justify-content-center">
        <Button
          variant="primary"
          type="submit"
          // disabled={!dirty || !isValid}
          onClick={handleSubmitData}
          style={{ marginRight: 15 }}
        >
          SAVE
        </Button>
        <CancelButton onClick={() => dispatch(setCreateModal({show: false, id: null, disabled_form: false}))}/>
      </div> */}
    </>
  )
}

export default withRouter(ShoppingCacheCreate)