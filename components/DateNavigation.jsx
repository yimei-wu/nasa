import { useState } from "react";

const DateNavigation = () => {
  const [date, setDate] = useState(new Date());

  const handleDate = (direction) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + direction);
    setDate(newDate);
  };
  console.log(date);

  const currentDate = new Date();
  const dateFormatted = currentDate.toLocaleDateString("it-IT", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  console.log(currentDate);

  return (
    <>
      <div className="date-navigation">
        <button onClick={() => handleDate(-1)}>prev</button>
        <span>{dateFormatted}</span>
        <button onClick={() => handleDate(1)}>next</button>
      </div>
    </>
  );
};

export default DateNavigation;
