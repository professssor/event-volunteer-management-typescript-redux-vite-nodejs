import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EventType } from "./EventView";
import { VolunteerType } from "../Volunteer/VolunteerManagement";
import { fetchVolunteers } from "../Volunteer/VolunteerSlice";
import { fetchEvents } from "./EventSlice";
import AppDashboard from "../Dashboad";

function SummaryPage() {
  const dispatch = useDispatch<any>();
  // Select event data from the Redux store
  const { events } = useSelector((state: any) => state.event);
  // Select volunteer data from the Redux store
  const { volunteers } = useSelector((state: any) => state.volunteer);

  console.log(events, volunteers);

  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchVolunteers());
  }, [dispatch]);

  // Function to render event summaries in a table
  const renderEventSummaries = () => {
    return (
      <div>
              <AppDashboard />
        <h2>Event Summaries</h2>
        <table style={{ border: "1px solid #000" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #000" }}>Event Name</th>
              <th style={{ border: "1px solid #000" }}>Date</th>
              <th style={{ border: "1px solid #000" }}>Location</th>
              <th style={{ border: "1px solid #000" }}>Description</th>
              <th style={{ border: "1px solid #000" }}>Volunteers Required</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event: EventType) => (
              <tr key={event._id} style={{ border: "1px solid #000" }}>
                <td style={{ border: "1px solid #000" }}>{event.name}</td>
                <td style={{ border: "1px solid #000" }}>{event.date}</td>
                <td style={{ border: "1px solid #000" }}>{event.location}</td>
                <td style={{ border: "1px solid #000" }}>{event.description}</td>
                <td style={{ border: "1px solid #000" }}>{event.requiredVolunteers}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Function to render volunteer summaries in a table
  const renderVolunteerSummaries = () => {
    return (
      <div>
        <h2>Volunteer Summaries</h2>
        <table style={{ border: "1px solid #000" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #000" }}>Name</th>
              <th style={{ border: "1px solid #000" }}>Contact</th>
              <th style={{ border: "1px solid #000" }}>Skills</th>
              <th style={{ border: "1px solid #000" }}>Availability</th>
              <th style={{ border: "1px solid #000" }}>Area of Interest</th>
            </tr>
          </thead>
          <tbody>
            {volunteers.map((volunteer: VolunteerType ) => (
              <tr key={volunteer._id as React.Key } style={{ border: "1px solid #000" }}>
                <td style={{ border: "1px solid #000" }}>{volunteer.name}</td>
                <td style={{ border: "1px solid #000" }}>{volunteer.contact}</td>
                <td style={{ border: "1px solid #000" }}>{volunteer.skills.join(", ")}</td>
                <td style={{ border: "1px solid #000" }}>
                  {volunteer.availability ? "Available" : "Not Available"}
                </td>
                <td style={{ border: "1px solid #000" }}>{volunteer.areaOfInterest.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <h1>Summary Page</h1>
      {renderEventSummaries()}
      {renderVolunteerSummaries()}
    </div>
  );
}

export default SummaryPage;
