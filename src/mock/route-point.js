import { getRandomArrayElement } from '../../src/utils/util.js';
import { nanoid } from 'nanoid';

const destinationDescription = [
  {
    name: 'Amsterdam',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    photo: 'https://loremflickr.com/248/152?random=7'
  },

  {
    name: 'Zandvoort',
    description: 'In rutrum ac purus sit amet tempus.',
    photo: 'https://loremflickr.com/248/152?random=91'
  },

  {
    name: 'Geneva',
    description: 'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
    photo: 'https://loremflickr.com/248/152?random=8'
  },

  {
    name: 'London',
    description: 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
    photo: 'https://loremflickr.com/248/152?random=1'
  }

];

const offerFull = [
  {
    name: 'Order food',
    price: '15',
    id: 'food',
  },

  {
    name: 'Order Uber',
    price: '20',
    id: 'Uber',
  },

  {
    name: 'Order hotel',
    price: '150',
    id: 'hotel',
  }
];

const offerMedium = [
  {
    name: 'Order food',
    price: '15',
    id: 'food',
  },

  {
    name: 'Order Uber',
    price: '20',
    id: 'Order Uber',
  },

];

const offerBasic = [

  {
    name: 'Order Uber',
    price: '20',
    id: 'Order Uber',
  },

];

const offerDescription = [
  offerFull,
  offerMedium,
  offerBasic
];


const eventTypes = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

function getRandomOffers(){
  const randomOffers = new Map();
  eventTypes.forEach((eventType) => randomOffers.set(eventType,getRandomArrayElement(offerDescription)));
  return randomOffers;
}

const routePoint = [

  {
    eventType: getRandomArrayElement(eventTypes),
    destination: getRandomArrayElement(destinationDescription),
    startTime: new Date(2023,7,23,12,0,0),
    endTime: new Date(2023,7,23,12,31,0),
    price: '500',
    isFavourite: true,
    offers: getRandomOffers(),
  },

  {
    eventType: getRandomArrayElement(eventTypes),
    destination: getRandomArrayElement(destinationDescription),
    startTime: new Date(2023,8,25,16,0,0),
    endTime: new Date(2023,8,27,17,36,0),
    price: '600',
    isFavourite: true,
    offers: getRandomOffers(),
  },

  {
    eventType: getRandomArrayElement(eventTypes),
    destination: getRandomArrayElement(destinationDescription),
    startTime: new Date(2023,9,26,10,57,0),
    endTime: new Date(2023,9,26,16,45,0),
    price: '1000',
    isFavourite: true,
    offers: getRandomOffers(),
  },

  {
    eventType: getRandomArrayElement(eventTypes),
    destination: getRandomArrayElement(destinationDescription),
    startTime: new Date(2023,9,27,10,0,0),
    endTime: new Date(2023,9,27,10,10,0),
    price: '10',
    isFavourite: true,
    offers: getRandomOffers(),
  },

];

function getRandomRoutePoint(){
  return {id: nanoid(),
    ...getRandomArrayElement(routePoint)
  };
}

export { getRandomRoutePoint };
