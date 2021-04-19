import {addMinutes} from './addMinutes'

export function findLocalTime(timeDifference: number) {
  let currentDate = new Date();
  let currentTimeUTC = addMinutes(currentDate, currentDate.getTimezoneOffset());
  let currentTimeLocal = addMinutes(currentTimeUTC, timeDifference / 60);
  return currentTimeLocal.getHours();
}
