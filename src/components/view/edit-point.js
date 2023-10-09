import { formatDate, findNeededOffers,fillDestinationDatalist } from '../../utils/util.js';

function editPoint({ eventType, destination, price, startTime, endTime, offers, availableOffers, availableDestinations }) {

  const destinationInfo = findDestination(destination, availableDestinations)[0];

  const destinationName = destinationInfo.name;
  const offersMarkup = createOffers(eventType, offers, availableOffers);
  const descriptionSection = createDescriptionSection(destinationInfo, offersMarkup);

  const destinationDatalist = fillDestinationDatalist(availableDestinations);

  const formatDateString = 'DD/MM/YYYY HH:MM';
  const formattedStartDate = formatDate(startTime, formatDateString);
  const formattedEndDate = formatDate(endTime, formatDateString);

  return `<form class="event event--edit" action="#" method="post">
            <header class="event__header">
              <div class="event__type-wrapper">
                <label class="event__type  event__type-btn" for="event-type-toggle-1">
                  <span class="visually-hidden">Choose event type</span>
                  <img class="event__type-icon" width="17" height="17" src="img/icons/${eventType}.png" alt="Event type icon">
                </label>
                <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                <div class="event__type-list">
                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Event type</legend>

                    <div class="event__type-item">
                      <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                      <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                      <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                      <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                      <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                      <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                      <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                      <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                      <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                      <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                    </div>
                  </fieldset>
                </div>
              </div>

              <div class="event__field-group  event__field-group--destination">
                <label class="event__label  event__type-output" for="event-destination-1">
                  ${eventType}
                </label>
                <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationName}" list="destination-list-1">
                <datalist id="destination-list-1">
                 ${destinationDatalist}
                </datalist>
              </div>

              <div class="event__field-group  event__field-group--time">
                <label class="visually-hidden" for="event-start-time-1">From</label>
                <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formattedStartDate}">
                &mdash;
                <label class="visually-hidden" for="event-end-time-1">To</label>
                <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formattedEndDate}">
              </div>

              <div class="event__field-group  event__field-group--price">
                <label class="event__label" for="event-price-1">
                  <span class="visually-hidden">Price</span>
                  &euro;
                </label>
                <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
              </div>

              <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
              <button class="event__reset-btn" type="reset">Delete</button>
              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </button>
            </header>
            ${descriptionSection}
          </form>
  `;
}

function createDescriptionSection(destinationInfo, offersMarkup) {

  const destinationDescription = destinationInfo.description;
  const photoMarkup = createPhotoMarkup(destinationInfo.pictures);

  let finalMarkup = '';

  if (offersMarkup !== '') {
    finalMarkup = finalMarkup + offersMarkup;
  }

  if (destinationDescription !== '') {
    finalMarkup = `${finalMarkup}<h3 class="event__section-title  event__section-title--destination">Destination</h3><p class="event__destination-description">${destinationDescription}</p>`;
  }

  if (photoMarkup !== '') {
    finalMarkup = finalMarkup + photoMarkup;
  }

  if (finalMarkup !== '') {
    finalMarkup = `<section class="event__details"> ${finalMarkup}</section>`;
  }

  return finalMarkup;
}

function findDestination(currenDestination, availableDestinations) {
  return availableDestinations.filter((item) => item.id === currenDestination);
}

function createPhotoMarkup(photos) {

  let photoMarkup = '';


  if (photos.length > 0) {
    photoMarkup = `<div class="event__photos-container">
    <div class="event__photos-tape">
      ${photos.map(({ description, src }) => `<img class="event__photo" src="${src}" alt="${description}">`).join('')}</div>
    </div>`;
  }

  return photoMarkup;

}

function createOffers(eventType, offers, availableOffers) {

  let finalMarkup = '';

  const neededOffers = findNeededOffers(eventType, offers, availableOffers);

  finalMarkup = `${neededOffers.map(({ name, price, id, checked }) =>
    `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}-1" type="checkbox" data-id = "${id}" name="event-offer-${id}" ${checked === true ? 'checked' : ''}>
            <label class="event__offer-label" for="event-offer-${id}-1">
              <span class="event__offer-title">${name}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${price}</span>
            </label>
          </div>`).join('')}`;

  if (finalMarkup !== '') {
    finalMarkup = `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">${finalMarkup}</div></section>`;
  }

  return finalMarkup;

}


export { editPoint };

