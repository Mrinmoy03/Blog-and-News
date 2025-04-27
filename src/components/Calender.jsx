import React, { useState } from "react";
import "../styles/calender.css";

const Calendar = () => {
  const [date, setDate] = useState(new Date());

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const today = new Date();

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateCalendar = () => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay(); // Sunday = 0
    const daysInMonth = getDaysInMonth(year, month);

    const calendar = [];

 
    for (let i = 0; i < firstDayIndex; i++) {
      calendar.push(<span key={`empty-${i}`} className="empty"></span>);
    }

    // Fill days
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();

      const thisDay = new Date(year, month, day);
      const isSunday = thisDay.getDay() === 0;

      let classes = "";
      if (isToday) classes = "today";
      else if (isSunday) classes = "holiday";

      calendar.push(
        <span key={day} className={classes}>
          {day}
        </span>
      );
    }

    return calendar;
  };

  const prevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  return (
    <div className="calendar">
      <div className="navigate-date">
        <h2 className="month">{months[date.getMonth()]},</h2>
        <h2 className="year">{date.getFullYear()}</h2>
        <div className="buttons">
          <i className="bx bx-chevron-left" onClick={prevMonth}></i>
          <i className="bx bx-chevron-right" onClick={nextMonth}></i>
        </div>
      </div>

      <div className="weekdays">
        <span>Sun</span>
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
      </div>

      <div className="days">{generateCalendar()}</div>
    </div>
  );
};

export default Calendar;
