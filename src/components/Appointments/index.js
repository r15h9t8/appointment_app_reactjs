// Write your code here
import {Component} from 'react'

import './index.css'

import {v4 as uuidv4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentsList: [],
    isFilterActive: false,
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onFilter = () => {
    const {isFilterActive} = this.state

    this.setState({isFilterActive: !isFilterActive})
  }

  onAddAppointment = event => {
    event.preventDefault()

    const {titleInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: uuidv4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  renderAppointmentsList = () => {
    const getFilteredAppointmentsList = this.getFilteredAppointmentsList()

    return getFilteredAppointmentsList.map(eachAppointment => (
      <AppointmentItem
        key={eachAppointment.id}
        appointmentDetails={eachAppointment}
        toggleIsStarred={this.toggleIsStarred}
      />
    ))
  }

  getFilteredAppointmentsList = () => {
    const {appointmentsList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentsList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filteredStarredBtn = isFilterActive
      ? 'filter-active-bg'
      : 'filter-inactive-bg'

    return (
      <div className="app-container">
        <div className="responsive-container">
          <h1 className="heading">Add Appointment</h1>
          <div className="appointments-container">
            <img
              className="input-sec-img"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
            <form className="form" onSubmit={this.onAddAppointment}>
              <label className="label" htmlFor="titleInput">
                TITLE
              </label>
              <input
                className="input"
                type="text"
                value={titleInput}
                placeholder="Title"
                id="titleInput"
                onChange={this.onChangeTitleInput}
              />
              <label className="label" htmlFor="dateInput">
                DATE
              </label>
              <input
                className="input"
                value={dateInput}
                type="date"
                id="dateInput"
                placeholder="dd/mm/yyyy"
                onChange={this.onChangeDateInput}
              />
              <button className="button" type="submit">
                Add
              </button>
            </form>
          </div>
          <hr className="separator" />
          <div className="header-filter-container">
            <h1 className="appointment-heading">Appointments</h1>
            <button
              className={`starred-btn ${filteredStarredBtn}`}
              onClick={this.onFilter}
              type="button"
            >
              Starred
            </button>
          </div>
          <ul className="appointments-list">{this.renderAppointmentsList()}</ul>
        </div>
      </div>
    )
  }
}

export default Appointments
