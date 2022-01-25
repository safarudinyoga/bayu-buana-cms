import BriefCaseIcon from "assets/icons/briefcase.svg"
import HomeIcon from "assets/icons/home.svg"
import React, {Component} from "react"
import {Link} from "react-router-dom"
import "./sidebar.scss"

export default class Sidebar extends Component {
  render() {
    return (
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <div className="sidebar">
          <nav className="mt-2">
            <ul
              className="nav nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <img src={HomeIcon} alt="home_icon" />
                  <p>Dashboard</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="#" className="nav-link">
                  <img src={BriefCaseIcon} alt="briefcase_icon" />
                  <p>
                    Master Data Management
                    <i className="right fas fa-angle-right"></i>
                  </p>
                </Link>
                <ul className="nav nav-treeview">
                  {/* all sidebar described here */}
                  <li className="nav-item">
                    <Link
                      to="/master/age-qualifying-types"
                      className="nav-link"
                    >
                      <p>Age Qualifying Type</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/master/aircrafts" className="nav-link">
                      <p>Aircraft</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/master/airlines" className="nav-link">
                      <p>Airline</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/master/airports" className="nav-link">
                      <p>Airport</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/master/attractions" className="nav-link">
                      <p>Attraction</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/master/attraction-categories"
                      className="nav-link"
                    >
                      <p>Attraction Category</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/master/cabin-types" className="nav-link">
                      <p>Cabin Type</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/master/cities" className="nav-link">
                      <p>City</p>
                    </Link>
                  </li>
                  {/* <li className="nav-item">
                    <Link to="/master/corporate-rating" className="nav-link">
                      <p>Corporate Rating</p>
                    </Link>
                  </li> */}
                  <li className="nav-item">
                    <Link to="/master/countries" className="nav-link">
                      <p>Country</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/master/currencies" className="nav-link">
                      <p>Currency</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/master/destinations" className="nav-link">
                      <p>Destination</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/master/destination-groups" className="nav-link">
                      <p>Destination Group</p>
                    </Link>
                  </li>
                  {/* <li className="nav-item">
                    <Link to="/master/fee-type" className="nav-link">
                      <p>Fee Type</p>
                    </Link>
                  </li> */}
                  <li className="nav-item">
                    <Link to="/master/flight-types" className="nav-link">
                      <p>Flight Type</p>
                    </Link>
                  </li>
                  {/* <li className="nav-item">
                    <Link to="/master/frequent-traveler-program" className="nav-link">
                      <p>Frequent Traveler Program</p>
                    </Link>
                  </li> */}
                  <li className="nav-item">
                    <Link
                      to="/master/hotel-amenity-categories"
                      className="nav-link"
                    >
                      <p>Hotel Amenity Category</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/master/hotel-amenity-types" className="nav-link">
                      <p>Hotel Amenity Type</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/master/hotel-brands" className="nav-link">
                      <p>Hotel Brand</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/master/hotel-suppliers" className="nav-link">
                      <p>Hotel Supplier</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/master/languages" className="nav-link">
                      <p>Language</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/master/location-categories" className="nav-link">
                      <p>Location Category</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/master/meal-plan-types" className="nav-link">
                      <p>Meal Plan Type</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/master/occupancy-types" className="nav-link">
                      <p>Occupancy Type</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/master/passenger-types" className="nav-link">
                      <p>Passenger Type</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/master/product-types" className="nav-link">
                      <p>Product Type</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/master/property-categories" className="nav-link">
                      <p>Property Category</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/master/rating-types" className="nav-link">
                      <p>Rating Type</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/master/regions" className="nav-link">
                      <p>Region</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/master/room-amenity-categories"
                      className="nav-link"
                    >
                      <p>Room Amenity Category</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/master/room-amenity-types" className="nav-link">
                      <p>Room Amenity Type</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/master/room-location-types" className="nav-link">
                      <p>Room Location Type</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/master/room-view-types" className="nav-link">
                      <p>Room View Type</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/master/special-requests" className="nav-link">
                      <p>Special Request</p>
                    </Link>
                  </li>
                  {/* <li className="nav-item">
                    <Link to="/master/standard-markup" className="nav-link">
                      <p>Standar Markup</p>
                    </Link>
                  </li> */}
                  <li className="nav-item">
                    <Link to="/master/provinces" className="nav-link">
                      <p>State / Province</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/master/travel-purposes" className="nav-link">
                      <p>Travel Purpose</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/master/trip-types" className="nav-link">
                      <p>Trip Type</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/master/zones" className="nav-link">
                      <p>Zones</p>
                    </Link>
                  </li>
                  {/* <li className="nav-item">
                    <Link
                      to="/master/hotel-profile-management"
                      className="nav-link"
                    >
                      <p>Hotel Profile Management</p>
                    </Link>
                  </li> */}
                </ul>
              </li>
              <li className="nav-item">
                <Link to="#" className="nav-link">
                  <img src="/img/icons/users.svg" alt="icon users" />
                  <p>
                    Employment Management
                    <i className="right fas fa-angle-right"></i>
                  </p>
                </Link>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/master/employee" className="nav-link">
                      <p>Master Employee</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/master/divisions" className="nav-link">
                      <p>Division</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/master/job-title" className="nav-link">
                      <p>Job Title</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/master/branch-offices" className="nav-link">
                      <p>Branch Offices</p>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link to="#" className="nav-link">
                  <img src="/img/icons/users.svg" alt="icon users" />
                  <p>
                    Setup and Configurations
                    <i className="right fas fa-angle-right"></i>
                  </p>
                </Link>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/master/invoice-email-setup" className="nav-link">
                      <p>Invoice Email Setup</p>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    )
  }
}
