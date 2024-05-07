import { useEffect, useState } from "react";

const DateNavigation = () => {
  const [date, setDate] = useState(new Date());
  const [dateFormatted, setDateFormatted] = useState("");

  const handleDate = (direction) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + direction);
    setDate(newDate);
  };
  useEffect(() => {
    setDateFormatted(
      date.toLocaleDateString("it-IT", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, [date]);

  return (
    <>
      <div className="date-navigation">
        <button onClick={() => handleDate(-1)}>&larr;</button>
        <span>{dateFormatted}</span>
        <button onClick={() => handleDate(1)}>&rarr;</button>
      </div>
    </>
  );
};

export default DateNavigation;
