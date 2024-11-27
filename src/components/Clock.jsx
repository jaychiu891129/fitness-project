import React, { useEffect, useState } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="clock">
      <h3 className="text-xl">當前時間</h3>
      <p className="text-base mt-1">{time.toLocaleTimeString()}</p>
    </div>
  );
};

export default Clock;
