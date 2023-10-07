import dayjs from 'dayjs';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function formatDate(neededDate, formatString) {
  return dayjs(neededDate).format(formatString);
}

function isDatePast(dateForCheck) {
  return dayjs().isAfter(dayjs(dateForCheck));
}

function isDateFuture(dateForCheck) {
  return dayjs().isBefore(dayjs(dateForCheck));
}

function isDatePresent(dateForCheck) {
  return dayjs().isSame(dayjs(dateForCheck), 'day');
}

function formatDuration(eventStartTime, eventEndTime) {

  const diffMinute = differenceDate(eventStartTime, eventEndTime, 'minute');
  const diffHour = differenceDate(eventStartTime, eventEndTime, 'hour');
  const diffDays = differenceDate(eventStartTime, eventEndTime, 'day');

  const mins = differenceDate(eventStartTime, eventEndTime, 'minutes');

  if (diffMinute > 0 && diffHour === 0) {
    return `${diffMinute}M`;

  } else if (diffHour > 0 && diffDays === 0) {

    const totalHours = parseInt(mins / 60, 10);
    const totalMins = mins - totalHours * 60;

    return `${addZero(totalHours)}H ${addZero(totalMins)}M`;

  } else if (diffDays > 0) {

    const totalDays = parseInt(mins / 1440, 10);
    const totalHours = parseInt(mins / 60, 10) - totalDays * 24;
    const totalMins = mins - totalDays * 1440 - totalHours * 60;

    return `${addZero(totalDays)}D ${addZero(totalHours)}H ${addZero(totalMins)}M`;

  }
}

function addZero(neededValue) {
  if (neededValue < 10) {
    return `0${neededValue}`;
  } else {
    return `${neededValue}`;
  }
}

function differenceDate(startTime, endTime, measure) {
  const startTimeFormatted = dayjs(startTime);
  const endTimeFormatted = dayjs(endTime);
  return endTimeFormatted.diff(startTimeFormatted, measure);
}

function updateItem(items, updatedItem) {
  return items.map((item) => item.id === updatedItem.id ? updatedItem : item);
}


function sortDay(pointA, pointB) {

  return dayjs(pointA.startTime).diff(dayjs(pointB.startTime), 'day');
}

function sortTime(pointA, pointB) {

  return dayjs(pointB.startTime).diff(dayjs(pointA.startTime), 'hour');
}

function compareNumeric(a, b) {
  if (a > b) {
    return 1;
  }
  if (a === b) {
    return 0;
  }
  if (a < b) {
    return -1;
  }
}

function sortPrice(pointA, pointB) {

  return compareNumeric(pointA.price, pointB.price);
}

function findNeededOffers(eventType, offers, availableOffers){

  const filtredTypeOffers = availableOffers.filter((item) => item.type === eventType);
  const neededType = filtredTypeOffers[0];
  const currentOffers = neededType.offers.filter((item) => offers.includes(item.id));

  return currentOffers.length === 0 ? neededType.offers : currentOffers;

}

export { findNeededOffers, sortDay, sortTime, sortPrice, getRandomArrayElement, formatDate, formatDuration, isDatePast, isDateFuture, isDatePresent, updateItem };
