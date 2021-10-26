import "@fortawesome/fontawesome-free/css/all.css"
import "bootstrap/dist/js/bootstrap.js"
import "admin-lte/dist/css/adminlte.css"
import "admin-lte"
import "App.css"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
// route list
import TripTypeForm from "views/trip_type/form"
import TripTypeTable from "views/trip_type/table"
import RoomViewTypeForm from "views/room_view_type/form"
import RoomViewTypeTable from "views/room_view_type/table"
import RoomLocationTypeForm from "views/room_location_type/form"
import RoomLocationTypeTable from "views/room_location_type/table"
import PropertyCategoryForm from "views/property_category/form"
import PropertyCategoryTable from "views/property_category/table"
import PassengerTypeForm from "views/passenger_type/form"
import PassengerTypeTable from "views/passenger_type/table"
import MealPlanTypeForm from "views/meal_plan_type/form"
import MealPlanTypeTable from "views/meal_plan_type/table"
import LocationCategoryForm from "views/location_category/form"
import LocationCategoryTable from "views/location_category/table"
import HotelSupplierForm from "views/hotel_supplier/form"
import HotelSupplierTable from "views/hotel_supplier/table"
import HotelBrandForm from "views/hotel_brand/form"
import HotelBrandTable from "views/hotel_brand/table"
import FlightTypeForm from "views/flight_type/form"
import FlightTypeTable from "views/flight_type/table"
import DestinationGroupForm from "views/destination_group/form"
import DestinationGroupTable from "views/destination_group/table"
import CabinTypeForm from "views/cabin_type/form"
import CabinTypeTable from "views/cabin_type/table"
import AgeQualifyingTypeForm from "views/age_qualifying_type/form"
import AgeQualifyingTypeTable from "views/age_qualifying_type/table"
import TravelPurposeForm from "views/travel_purpose/form"
import TravelPurposeTable from "views/travel_purpose/table"
import SpecialRequestForm from "views/special_request/form"
import SpecialRequestTable from "views/special_request/table"
import CurrencyForm from "views/currency/form"
import CurrencyTable from "views/currency/table"
import LanguageForm from "views/language/form"
import LanguageTable from "views/language/table"
import AirportForm from "views/airport/form"
import AirportTable from "views/airport/table"
import RegionForm from "views/region/form"
import RegionTable from "views/region/table"
import AirlineForm from "views/airline/form"
import AirlineTable from "views/airline/table"
import AircraftTable from "views/aircraft/table"
import AircraftForm from "views/aircraft/form"
import CountryForm from "views/country/form"
import CountryTable from "views/country/table"
import ProvinceForm from "views/province/form"
import ProvinceTable from "views/province/table"
import CityForm from "views/city/form"
import CityTable from "views/city/table"
import DashboardWrapper from "components/wrapper/dashboard"
import Dashboard from "views/dashboard"

function App() {
  document.title = "Bayu Buana"
  return (
    <Router>
      <DashboardWrapper>
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          {/* all router described here */}
          <Route exact path="/master/trip-types">
            <TripTypeTable />
          </Route>
          <Route path="/master/trip-types/form/:id?">
            <TripTypeForm />
          </Route>
          <Route exact path="/master/room-view-types">
            <RoomViewTypeTable />
          </Route>
          <Route path="/master/room-view-types/form/:id?">
            <RoomViewTypeForm />
          </Route>
          <Route exact path="/master/room-location-types">
            <RoomLocationTypeTable />
          </Route>
          <Route path="/master/room-location-types/form/:id?">
            <RoomLocationTypeForm />
          </Route>
          <Route exact path="/master/property-categories">
            <PropertyCategoryTable />
          </Route>
          <Route path="/master/property-categories/form/:id?">
            <PropertyCategoryForm />
          </Route>
          <Route exact path="/master/passenger-types">
            <PassengerTypeTable />
          </Route>
          <Route path="/master/passenger-types/form/:id?">
            <PassengerTypeForm />
          </Route>
          <Route exact path="/master/meal-plan-types">
            <MealPlanTypeTable />
          </Route>
          <Route path="/master/meal-plan-types/form/:id?">
            <MealPlanTypeForm />
          </Route>
          <Route exact path="/master/location-categories">
            <LocationCategoryTable />
          </Route>
          <Route path="/master/location-categories/form/:id?">
            <LocationCategoryForm />
          </Route>
          <Route exact path="/master/hotel-suppliers">
            <HotelSupplierTable />
          </Route>
          <Route path="/master/hotel-suppliers/form/:id?">
            <HotelSupplierForm />
          </Route>
          <Route exact path="/master/hotel-brands">
            <HotelBrandTable />
          </Route>
          <Route path="/master/hotel-brands/form/:id?">
            <HotelBrandForm />
          </Route>
          <Route exact path="/master/flight-types">
            <FlightTypeTable />
          </Route>
          <Route path="/master/flight-types/form/:id?">
            <FlightTypeForm />
          </Route>
          <Route exact path="/master/destination-groups">
            <DestinationGroupTable />
          </Route>
          <Route path="/master/destination-groups/form/:id?">
            <DestinationGroupForm />
          </Route>
          <Route exact path="/master/cabin-types">
            <CabinTypeTable />
          </Route>
          <Route path="/master/cabin-types/form/:id?">
            <CabinTypeForm />
          </Route>
          <Route exact path="/master/age-qualifying-types">
            <AgeQualifyingTypeTable />
          </Route>
          <Route path="/master/age-qualifying-types/form/:id?">
            <AgeQualifyingTypeForm />
          </Route>
          <Route exact path="/master/travel-purposes">
            <TravelPurposeTable />
          </Route>
          <Route path="/master/travel-purposes/form/:id?">
            <TravelPurposeForm />
          </Route>
          <Route exact path="/master/special-requests">
            <SpecialRequestTable />
          </Route>
          <Route path="/master/special-requests/form/:id?">
            <SpecialRequestForm />
          </Route>
          <Route exact path="/master/currencies">
            <CurrencyTable />
          </Route>
          <Route path="/master/currencies/form/:id?">
            <CurrencyForm />
          </Route>
          <Route exact path="/master/languages">
            <LanguageTable />
          </Route>
          <Route path="/master/languages/form/:id?">
            <LanguageForm />
          </Route>
          <Route exact path="/master/airports">
            <AirportTable />
          </Route>
          <Route path="/master/airports/form/:id?">
            <AirportForm />
          </Route>
          <Route exact path="/master/regions">
            <RegionTable />
          </Route>
          <Route path="/master/regions/form/:id?">
            <RegionForm />
          </Route>
          <Route exact path="/master/airlines">
            <AirlineTable />
          </Route>
          <Route path="/master/airlines/form/:id?">
            <AirlineForm />
          </Route>
          <Route exact path="/master/aircraft">
            <AircraftTable />
          </Route>
          <Route path="/master/aircraft/form/:id?">
            <AircraftForm />
          </Route>
          <Route exact path="/master/countries">
            <CountryTable />
          </Route>
          <Route path="/master/countries/form/:id?">
            <CountryForm />
          </Route>
          <Route exact path="/master/provinces">
            <ProvinceTable />
          </Route>
          <Route path="/master/provinces/form/:id?">
            <ProvinceForm />
          </Route>
          <Route exact path="/master/cities">
            <CityTable />
          </Route>
          <Route path="/master/cities/form/:id?">
            <CityForm />
          </Route>
        </Switch>
      </DashboardWrapper>
    </Router>
  )
}

export default App
