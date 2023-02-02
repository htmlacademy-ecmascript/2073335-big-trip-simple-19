import dayjs from 'dayjs';

const sortByTime = (waypointA, waypointB)=>{
  const durationA = dayjs(waypointA.dateTo).diff(dayjs(waypointA.dateFrom));
  const durationB = dayjs(waypointB.dateTo).diff(dayjs(waypointB.dateFrom));

  return durationB - durationA;
};

const sortByPrice = (waypointA, waypointB)=> waypointB.basePrice - waypointA.basePrice;

const sortByDay = (waypointA, waypointB)=>dayjs(waypointA.dateFrom).diff(dayjs(waypointB.dateFrom));

export{ sortByTime, sortByPrice, sortByDay};
