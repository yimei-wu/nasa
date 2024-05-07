import { useState } from "react";

const DateNavigation = () => {
  const [date, setDate] = useState(new Date());

  const currentDate = new Date();
  const dateFormatted = currentDate.toLocaleDateString("it-IT", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <div className="date-navigation">
        <button>prev</button>
        <span>{dateFormatted}</span>
        <button>next</button>
      </div>
    </>
  );
};

export default DateNavigation;
