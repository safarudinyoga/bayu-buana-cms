import React, { useEffect, useState } from "react"
import "@fortawesome/fontawesome-free/css/all.css"
import "admin-lte"
import "admin-lte/dist/css/adminlte.css"
import "App.scss"
import "bootstrap/dist/js/bootstrap.js"
import DashboardWrapper from "components/wrapper/dashboard"
import AuthWrapper from "components/wrapper/auth"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom"
import AgeQualifyingTypeForm from "views/age_qualifying_type/form"
import AgeQualifyingTypeTable from "views/age_qualifying_type/table"
import AircraftForm from "views/aircraft/form"
import AircraftTable from "views/aircraft/table"
import AirlineForm from "views/airline/form"
import AirlineTable from "views/airline/table"
import AirportForm from "views/airport/form"
import AirportTable from "views/airport/table"
import AttractionForm from "views/attraction/form"
import AttractionTable from "views/attraction/table"
import AttractionCategoryForm from "views/attraction_category/form"
import AttractionCategoryTable from "views/attraction_category/table"
import CabinTypeForm from "views/cabin_type/form"
import CabinTypeTable from "views/cabin_type/table"
import CityForm from "views/city/form"
import CityTable from "views/city/table"
import CorporateRatingForm from "views/corporate_rating/form"
import CorporateRatingTable from "views/corporate_rating/table"
import CountryForm from "views/country/form"
import CountryTable from "views/country/table"
import CurrencyForm from "views/currency/form"
import CurrencyTable from "views/currency/table"
import Dashboard from "views/dashboard"
import DestinationForm from "views/destination/form"
import DestinationTable from "views/destination/table"
import DestinationGroupForm from "views/destination_group/form"
import DestinationGroupTable from "views/destination_group/table"
import FeeTypeForm from "views/fee_type/form"
import FeeTypeTable from "views/fee_type/table"
import FlightTypeForm from "views/flight_type/form"
import FlightTypeTable from "views/flight_type/table"
import FrequentTravelerProgramForm from "views/frequent_traveler_program/form"
import FrequentTravelerProgramTable from "views/frequent_traveler_program/table"
import HotelAmenityCategoryForm from "views/hotel_amenity_category/form"
import HotelAmenityCategoryTable from "views/hotel_amenity_category/table"
import HotelAmenityTypeForm from "views/hotel_amenity_type/form"
import HotelAmenityTypeTable from "views/hotel_amenity_type/table"
import HotelBrandForm from "views/hotel_brand/form"
import HotelBrandTable from "views/hotel_brand/table"
import HotelSupplierForm from "views/hotel_supplier/form"
import HotelSupplierTable from "views/hotel_supplier/table"
import GeneralSetup from "views/general-setup"
import GeneralSetupTeamAssignment from "views/general-setup/form/team-assignment-form"
import LanguageForm from "views/language/form"
import LanguageTable from "views/language/table"
import LocationCategoryForm from "views/location_category/form"
import LocationCategoryTable from "views/location_category/table"
import MealPlanTypeForm from "views/meal_plan_type/form"
import MealPlanTypeTable from "views/meal_plan_type/table"
import OccupancyTypeForm from "views/occupancy_type/form"
import OccupancyTypeTable from "views/occupancy_type/table"
import PassengerTypeForm from "views/passenger_type/form"
import PassengerTypeTable from "views/passenger_type/table"
import ProductTypeForm from "views/product_type/form"
import ProductTypeTable from "views/product_type/table"
import PropertyCategoryForm from "views/property_category/form"
import PropertyCategoryTable from "views/property_category/table"
import ProvinceForm from "views/province/form"
import ProvinceTable from "views/province/table"
import RatingTypeForm from "views/rating_type/form"
import RatingTypeTable from "views/rating_type/table"
import RegionForm from "views/region/form"
import RegionTable from "views/region/table"
import RoomAmenityCategoryForm from "views/room_amenity_category/form"
import RoomAmenityCategoryTable from "views/room_amenity_category/table"
import RoomAmenityTypeForm from "views/room_amenity_type/form"
import RoomAmenityTypeTable from "views/room_amenity_type/table"
import RoomLocationTypeForm from "views/room_location_type/form"
import RoomLocationTypeTable from "views/room_location_type/table"
import RoomViewTypeForm from "views/room_view_type/form"
import RoomViewTypeTable from "views/room_view_type/table"
import SpecialRequestForm from "views/special_request/form"
import SpecialRequestTable from "views/special_request/table"
import TravelPurposeForm from "views/travel_purpose/form"
import TravelPurposeTable from "views/travel_purpose/table"
// route list
import TripTypeForm from "views/trip_type/form"
import TripTypeTable from "views/trip_type/table"
import ZoneForm from "views/zone/form"
import ZoneTable from "views/zone/table"

// Master Hotel Profile Management
import HotelProfileManagementTable from "views/hotel_profile_management/table"
import HotelProfileManagementForm from "views/hotel_profile_management/form"
import HotelRoomTypeForm from "views/hotel_profile_management/form/room_type/form"

// Master Employee
import EmployeeTable from "views/employee/table"
import EmployeeForm from "views/employee/form/index"
import RatingTypeLevelTable from "./views/rating_type_level/table"
import RatingTypeLevelForm from "./views/rating_type_level/form"

// Master Invoice Email
import InvoiceEmailSetupTable from "views/invoice_email_setup/table"
import InvoiceEmailSetupForm from "views/invoice_email_setup/form"

// Master Standard Markup
import StandardMarkupTable from "views/standard_markup/standard_markup"
import StandardMarkupFlightForm from "views/standard_markup/form/flight_form"
import StandardMarkupHotelForm from "views/standard_markup/form/hotel_form"
import StandardMarkupOtherForm from "views/standard_markup/form/other_form"

// Master Setup Flight Commision
import FlightCommisionTable from "views/setup_flight_commision/table"
import FlightCommisionForm from "views/setup_flight_commision/form"
// Master Exchange Rate
import ExchageRateTable from "views/exchange_rate/table"
import ExchangeRateForm from "views/exchange_rate/form"
import ExchangeRateHistory from "views/exchange_rate/history"
// Master Integration PartnerG
import IntegrationPartnerForm from "views/integration_partner/form/index"
import IntegrationPartnerTable from "views/integration_partner/table"
import IntegrationPaymentGatewayTable from "views/integration_partner/form/partner_payment_gateway/table"
import IntegrationPaymentGatewayForm from "views/integration_partner/form/partner_payment_gateway/form"
import IntegrationPartnerMealPlansTable from "views/integration_partner/form/partner_meal_plans/table"
import IntegrationPartnerMealPlansForm from "views/integration_partner/form/partner_meal_plans/form"
import IntegrationPartnerCitiesTable from "views/integration_partner_city/tabel"
import IntegrationPartnerCabinTypesTable from "views/integration_partner_cabin/tabel"
import IntegrationPartnerCabinsForm from "views/integration_partner_cabin/form/form"
// import FareFamiyTabel from "views/integration_partner_cabin/tabel-fare-family"
import IntegrationFeeTaxes from "views/partner_fee_taxes/table"
import FeeTaxForm from "views/partner_fee_taxes/form"
import CreateHotel from "views/partner_hotels/form"
import FormPartnerHotel from "views/partner_hotels/form"
import IntegrationPartnerCountriesTable from "views/integration_partner_countries/table"
import IntegrationPartnerCurrenciesTable from "views/integration_partner_currencies/table"
import IntegrationPartnerCurrenciesForm from "views/integration_partner_currencies/form"

// Master Manage Corporate
import CorporateTable from "views/manage_corporate/table"
import CorporateForm from "views/manage_corporate/form"

// User Profile
import UserProfile from "views/user_profile/form"

import Login from "./views/auth/login"
import ForgotPassword from "views/auth/forgot_password"
import OTP from "views/auth/otp"
import OfficeTable from "./views/branch_office/table"
import OfficeForm from "./views/branch_office/form"
import DivisionForm from "./views/division/form"
import DivisionTable from "./views/division/table"
import DivisionHierarchy from "./views/division/hierarchy"
import JobTitleTable from "./views/job-title/table"
import JobTitleForm from "./views/job-title/form"

// User Access Type
import UserAccessTypeTable from "views/user_access_type/table"
import UserAccessTypeForm from "views/user_access_type/form"
import ResetPassword from "views/reset_password/reset_password"

//User Management
import UserManagementTable from "views/user_management/table"
// import UserManagementForm from "views/user_management/form"

// Master Standard Ancillary Fee
import StandardAncillaryFee from "./views/standard_ancillary_fee/standard_ancillary_fee"
import StandardAncillaryFeeFlightForm from "views/standard_ancillary_fee/form/flight_form"
import StandardAncillaryFeeHotelForm from "views/standard_ancillary_fee/form/hotel_form"
import StandardAncillaryFeeOtherForm from "views/standard_ancillary_fee/form/other_form"

// Master Standard serviceFee
import StandardServiceFee from "./views/standar_service_fee/standard_service_fee"
import StandardServiceFeeFeeFlightForm from "views/standar_service_fee/form/flight_form"
import StandardServiceFeeHotelForm from "views/standar_service_fee/form/hotel_form"
import StandardServiceFeeOtherForm from "views/standar_service_fee/form/other_form"

// Special Date
import SpecialDateTable from "views/special_date/table"
import SpecialDateForm from "views/special_date/form"
import SpecialDateCalendar from "views/special_date/calendar"

// Extranet BookTrip
import BookTrip from "views/extranet/book_trip/book_trip"
import BookFlight from "views/extranet/book_trip/book_flight"

// import Api from "config/api"
import IntegrationPartnerHotels from "views/partner_hotels/table"
import IntegrationPartnerHotelSupplier from "views/partner_hotel_supplier/table"
import BookingSetting from "views/booking_setting/table"
import TravelAdvice from "views/travel_advice/table"
import GeneralInformation from "views/general_information/table"

// Identity Rule
import IdentityRuleTable from "views/identity_rule/table"

// Tax Fee
import TaxFeeForm from "views/tax_fee/form"
import ShoppingCache from "views/shopping_cache/table"

// Job Title Corporate
import JobTitleCorporateForm from "./views/job_title_corporate/form"
import JobTitleCorporateTable from "./views/job_title_corporate/table"

const RouteWithProps = ({
  path,
  exact,
  strict,
  component: Component,
  location,
  auth,
  ...rest
}) => (
  <Route
    path={path}
    exact={exact}
    strict={strict}
    location={location}
    render={(props) =>
      auth ? (
        <Component {...rest} {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/auth/login",
            state: { from: props.location },
          }}
        />
      )
    }
  />
)

const DashboardRoutes = () => {
  return (
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
        <Route exact path="/master/fee-type">
          <FeeTypeTable />
        </Route>
        <Route path="/master/fee-type/form/:id?">
          <FeeTypeForm />
        </Route>
        <Route exact path="/master/integration-partner">
          <IntegrationPartnerTable />
        </Route>
        <Route exact path="/master/integration-partner/partner-fee-tax">
          <IntegrationFeeTaxes />
        </Route>
        <Route
          exact
          path="/master/integration-partner/partner-fee-tax/form/:id?"
        >
          <FeeTaxForm />
        </Route>
        <Route exact path="/master/integration-partner/partner-hotels">
          <IntegrationPartnerHotels />
        </Route>
        <Route exact path="/master/integration-partner-hotels/form/:id?">
          <FormPartnerHotel />
        </Route>
        <Route exact path="/master/integration-partner-hotel-supplier">
          <IntegrationPartnerHotelSupplier />
        </Route>
        {/* <Route exact path="/master/integration-partner-hotels/form/:id?">
          <FormPartnerHotel />
        </Route> */}
        <Route path="/master/integration-partner/form/:id?">
          <IntegrationPartnerForm />
        </Route>
        <Route exact path="/master/integration-payment-gateway">
          <IntegrationPaymentGatewayTable />
        </Route>
        <Route exact path="/master/integration-payment-gateway/form/:id?">
          <IntegrationPaymentGatewayForm />
        </Route>
        <Route exact path="/master/integration-partner-meal-plans">
          <IntegrationPartnerMealPlansTable />
        </Route>
        <Route exact path="/master/integration-partner-meal-plans/form/:id?">
          <IntegrationPartnerMealPlansForm />
        </Route>
        <Route exact path="/master/integration-partner-cabin-types">
          <IntegrationPartnerCabinTypesTable />
        </Route>
        <Route path="/master/integration-partner-cabin-types/form/:id?">
          <IntegrationPartnerCabinsForm />
        </Route>
        <Route exact path="/master/integration-partner-cities">
          <IntegrationPartnerCitiesTable />
        </Route>
        <Route exact path="/master/integration-partner-countries">
          <IntegrationPartnerCountriesTable />
        </Route>
        <Route exact path="/master/integration-partner-currencies">
          <IntegrationPartnerCurrenciesTable />
        </Route>
        <Route path="/master/integration-partner-currencies/form/:id?">
          <IntegrationPartnerCurrenciesForm />
        </Route>

        <Route exact path="/master/integration-partner-countries">
          <IntegrationPartnerCountriesTable />
        </Route>
        <Route exact path="/master/integration-partner-currencies">
          <IntegrationPartnerCurrenciesTable />
        </Route>
        <Route path="/master/integration-partner-currencies/form/:id?">
          <IntegrationPartnerCurrenciesForm />
        </Route>
        <Route exact path="/master/flight-types">
          <FlightTypeTable />
        </Route>
        <Route path="/master/flight-types/form/:id?">
          <FlightTypeForm />
        </Route>
        <Route exact path="/master/frequent-traveler-program">
          <FrequentTravelerProgramTable />
        </Route>
        <Route path="/master/frequent-traveler-program/form/:id?">
          <FrequentTravelerProgramForm />
        </Route>
        {/* Standard Ancillary Fee */}
        <Route exact path="/master/standard-ancillary-fee">
          <StandardAncillaryFee />
        </Route>
        <Route path="/master/standard-ancillary-fee/form/flight-form/:id?">
          <StandardAncillaryFeeFlightForm />
        </Route>
        <Route path="/master/standard-ancillary-fee/form/hotel-form/:id?">
          <StandardAncillaryFeeHotelForm />
        </Route>
        <Route path="/master/standard-ancillary-fee/form/other-form/:id?">
          <StandardAncillaryFeeOtherForm />
        </Route>

        {/* Standard Service Fee */}
        <Route exact path="/master/standard-service-fee">
          <StandardServiceFee />
        </Route>
        <Route path="/master/standard-service-fee/form/flight-form/:id?">
          <StandardServiceFeeFeeFlightForm />
        </Route>
        <Route path="/master/standard-service-fee/form/hotel-form/:id?">
          <StandardServiceFeeHotelForm />
        </Route>
        <Route path="/master/standard-service-fee/form/other-form/:id?">
          <StandardServiceFeeOtherForm />
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
        <Route exact path="/master/standard-markup">
          <StandardMarkupTable />
        </Route>
        <Route path="/master/standard-markup/form/flight-form/:id?">
          <StandardMarkupFlightForm />
        </Route>
        <Route path="/master/standard-markup/form/hotel-form/:id?">
          <StandardMarkupHotelForm />
        </Route>
        <Route path="/master/standard-markup/form/other-form/:id?">
          <StandardMarkupOtherForm />
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
        <Route exact path="/master/aircrafts">
          <AircraftTable />
        </Route>
        <Route path="/master/aircrafts/form/:id?">
          <AircraftForm />
        </Route>
        <Route exact path="/master/corporate-rating">
          <CorporateRatingTable />
        </Route>
        <Route path="/master/corporate-rating/form/:id?">
          <CorporateRatingForm />
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
        <Route exact path="/master/zones">
          <ZoneTable />
        </Route>
        <Route path="/master/zones/form/:id?">
          <ZoneForm />
        </Route>
        <Route exact path="/master/destinations">
          <DestinationTable />
        </Route>
        <Route path="/master/destinations/form/:id?">
          <DestinationForm />
        </Route>
        <Route exact path="/master/room-amenity-types">
          <RoomAmenityTypeTable />
        </Route>
        <Route path="/master/room-amenity-types/form/:id?">
          <RoomAmenityTypeForm />
        </Route>
        <Route exact path="/master/room-amenity-categories">
          <RoomAmenityCategoryTable />
        </Route>
        <Route path="/master/room-amenity-categories/form/:id?">
          <RoomAmenityCategoryForm />
        </Route>
        <Route exact path="/master/attractions">
          <AttractionTable />
        </Route>
        <Route path="/master/attractions/form/:id?">
          <AttractionForm />
        </Route>

        <Route exact path="/master/rating-types">
          <RatingTypeTable />
        </Route>
        <Route path="/master/rating-types/form/:id?">
          <RatingTypeForm />
        </Route>
        <Route
          exact
          path="/master/rating-types/:id_rating_type/rating-type-levels"
        >
          <RatingTypeLevelTable />
        </Route>
        <Route path="/master/rating-types/:id_rating_type/rating-type-levels/form/:id?">
          <RatingTypeLevelForm />
        </Route>
        <Route exact path="/master/attraction-categories">
          <AttractionCategoryTable />
        </Route>
        <Route path="/master/attraction-category/form/:id?">
          <AttractionCategoryForm />
        </Route>
        <Route exact path="/master/hotel-amenity-types">
          <HotelAmenityTypeTable />
        </Route>
        <Route path="/master/hotel-amenity-types/form/:id?">
          <HotelAmenityTypeForm />
        </Route>
        <Route exact path="/master/hotel-amenity-categories">
          <HotelAmenityCategoryTable />
        </Route>
        <Route path="/master/hotel-amenity-categories/form/:id?">
          <HotelAmenityCategoryForm />
        </Route>
        <Route exact path="/master/occupancy-types">
          <OccupancyTypeTable />
        </Route>
        <Route path="/master/occupancy-types/form/:id?">
          <OccupancyTypeForm />
        </Route>
        <Route exact path="/master/product-types">
          <ProductTypeTable />
        </Route>
        <Route path="/master/product-types/form/:id?">
          <ProductTypeForm />
        </Route>

        {/* Master Hotel Profile Management */}
        <Route exact path="/master/hotel-profile-management">
          <HotelProfileManagementTable />
        </Route>
        <Route exact path="/master/hotel-profile-management/form/:id?">
          <HotelProfileManagementForm />
        </Route>
        <Route
          exact
          path="/master/hotel-profile-management/room-type/form/:id?"
        >
          <HotelRoomTypeForm />
        </Route>

        {/* Master Employee */}
        <Route exact path="/master/employee">
          <EmployeeTable />
        </Route>
        <Route path="/master/employee/form/:id?">
          <EmployeeForm />
        </Route>

        {/* Division */}
        <Route exact path="/master/divisions">
          <DivisionTable />
        </Route>
        <Route path="/master/divisions/form/:id?">
          <DivisionForm />
        </Route>
        <Route path="/master/divisions/hierarchy/:id?">
          <DivisionHierarchy />
        </Route>

        {/* Job Title */}
        <Route exact path="/master/job-title">
          <JobTitleTable />
        </Route>
        <Route path="/master/job-title/form/:id?">
          <JobTitleForm />
        </Route>

        {/* Job Title Corporate */}
        <Route exact path="/master/job-title-corporate">
          <JobTitleCorporateTable />
        </Route>
        <Route exact path="/master/job-title-corporate/form/:id?">
          <JobTitleCorporateForm />
        </Route>

        {/* Branch Office */}
        <Route exact path="/master/branch-offices">
          <OfficeTable />
        </Route>
        <Route path="/master/branch-offices/form/:id?">
          <OfficeForm />
        </Route>

        {/* Master Invoice Email Setup */}
        <Route exact path="/master/invoice-email-setup">
          <InvoiceEmailSetupTable />
        </Route>
        <Route exact path="/master/invoice-email-setup/form/:id?">
          <InvoiceEmailSetupForm />
        </Route>

        {/* Master Setup Flight Commission */}
        <Route exact path="/master/setup-flight-commission">
          <FlightCommisionTable />
        </Route>
        <Route exact path="/master/setup-flight-commission/form/:id?">
          <FlightCommisionForm />
        </Route>

        <Route exact path="/master/setup-booking-setting">
          <BookingSetting />
        </Route>

        <Route exact path="/master/setup-travel-advice">
          <TravelAdvice />
        </Route>
        <Route exact path="/master/setup-general-information">
          <GeneralInformation />
        </Route>
        
        {/* Master Exhange Rate */}
        <Route exact path="/master/exchange-rate">
          <ExchageRateTable />
        </Route>
        <Route exact path="/master/exchange-rate/form/:id?">
          <ExchangeRateForm />
        </Route>
        <Route exact path="/master/exchange-rate/history/:id?">
          <ExchangeRateHistory />
        </Route>

        {/* Master Manage Corporate */}
        <Route exact path="/master/manage-corporate">
          <CorporateTable />
        </Route>
        <Route exact path="/master/manage-corporate/form/:id?">
          <CorporateForm />
        </Route>

        <Route exact path="/profile/:tab?">
          <UserProfile />
        </Route>

        {/* start shopping cache */}
        <Route exact path="/internal/shopping-cache">
          <ShoppingCache />
        </Route>
        {/* end shopping cache */}

        {/* Master General Setup*/}
        <Route exact path="/master/general-setup">
          <GeneralSetup />
        </Route>
        <Route exact path="/master/general-team-assignment/form/:id?">
          <GeneralSetupTeamAssignment />
        </Route>

        {/* User Access Type */}
        <Route exact path="/master/user-access-type">
          <UserAccessTypeTable />
        </Route>
        <Route path="/master/user-access-type/form/:id?">
          <UserAccessTypeForm />
        </Route>

        {/* User management */}
        <Route exact path="/master/user-management">
          <UserManagementTable />
        </Route>
        {/* <Route path="/master/user-management/form/:id?">
          <UserManagementForm />
        </Route> */}

        {/* Master Special Date */}
        <Route exact path="/master/special-date">
          <SpecialDateTable />
        </Route>
        <Route path="/master/special-date/form/:id?">
          <SpecialDateForm />
        </Route>
        <Route path="/master/special-date/calendar">
          <SpecialDateCalendar />
        </Route>

        {/* Extranet Book Trip */}
        <Route exact path="/extranet/book-trip">
          <BookTrip />
        </Route>
        <Route path="/extranet/book-trip/book-flight">
          <BookFlight />
        </Route>

        {/* Identity Rule */}
        <Route exact path="/master/identity-rules">
          <IdentityRuleTable />
        </Route>

        {/* Tax Fee */}
        <Route path="/master/tax-fee">
          <TaxFeeForm />
        </Route>

      </Switch>
    </DashboardWrapper>
  )
}

const AuthRoutes = () => {
  return (
    <AuthWrapper>
      <Route exact path="/auth/login">
        <Login />
      </Route>
      <Route exact path="/auth/forgot-password">
        <ForgotPassword />
      </Route>
      <Route exact path="/auth/otp">
        <OTP />
      </Route>
      <Route exact path="/auth/reset-password">
        <ResetPassword />
      </Route>
    </AuthWrapper>
  )
}

const getAuth = async () => {
  try {
    let auth = localStorage.getItem("ut")
    let refresh_token = localStorage.getItem("rt")
    if (!auth && refresh_token) {
      // let API = new Api()
      // let res = await API.refreshToken(refresh_token)
    }

    return auth
  } catch (err) {
    throw err
  }
}

const App = () => {
  document.title = "Bayu Buana"

  const [auth, setAuth] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      let isAuth = await getAuth()
      setAuth(isAuth)
    }
    checkAuth()
  }, [auth])

  return (
    <Router>
      <Switch>
        <AuthRoutes path="/auth" />
        <RouteWithProps auth={auth} path="/" component={DashboardRoutes} />
      </Switch>
    </Router>
  )
}

export default App
