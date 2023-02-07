import dayjs from 'dayjs';

const sortByTime = (pointA, pointB) => dayjs(pointB.dateTo).diff(pointB.dateFrom) - dayjs(pointA.dateTo).diff(pointA.dateFrom);

const sortByPrice = (waypointA, waypointB)=> waypointB.basePrice - waypointA.basePrice;

const sortByDay = (waypointA, waypointB)=>dayjs(waypointA.dateFrom).diff(dayjs(waypointB.dateFrom));

export{ sortByTime, sortByPrice, sortByDay};
