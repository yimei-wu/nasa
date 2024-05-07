const DateNavigation = () => {
  const currentDate = new Date();
  console.log(currentDate);
  return (
    <>
      <div className="date-navigation">
        <button>prev</button>
        <span>{currentDate.toString()}</span>
        <button>next</button>
      </div>
    </>
  );
};

export default DateNavigation;
