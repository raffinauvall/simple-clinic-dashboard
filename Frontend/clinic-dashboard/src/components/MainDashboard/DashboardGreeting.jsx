const DashboardGreeting = () => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 18) return "Good Night";
    if (hour >= 15) return "Good Evening";
    if (hour >= 12) return "Good Afternoon";
    return "Good Morning";
  };

  return (
    <div className="text-2xl sm:text-3xl font-bold text-black mb-4 sm:mb-5 euclid-bold">
      {getGreeting()}, admin
    </div>
  );
};

export default DashboardGreeting;
