function getRandomArrayItem (items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomNumber(a, b) {

  if (a < 0 || b < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

const offersByType = [
  {
    'type': 'taxi',
    'offers': [{
      'id': 1,
      'title': 'Choose the radio station',
      'price': 120
    },
    {
      'id': 2,
      'title': 'Upgrade to a business class',
      'price': 140
    }]
  },
  {
    'type': 'bus',
    'offers': [{
      'id': 1,
      'title': 'Choose the radio station',
      'price': 120
    },
    {
      'id': 2,
      'title': 'Upgrade to a business class',
      'price': 140
    }]
  },
  {
    'type': 'train',
    'offers': [{
      'id': 1,
      'title': 'Choose the radio station',
      'price': 120
    },
    {
      'id': 2,
      'title': 'Upgrade to a business class',
      'price': 140
    }]
  },
  {
    'type': 'ship',
    'offers': [{
      'id': 1,
      'title': 'Choose the radio station',
      'price': 120
    },
    {
      'id': 2,
      'title': 'Upgrade to a business class',
      'price': 140
    }]
  },
  {
    'type': 'drive',
    'offers': [{
      'id': 1,
      'title': 'Choose the radio station',
      'price': 120
    },
    {
      'id': 2,
      'title': 'Upgrade to a business class',
      'price': 140
    }]
  },
  {
    'type': 'flight',
    'offers': [{
      'id': 1,
      'title': 'Choose seats',
      'price': 5
    },
    {
      'id': 2,
      'title': 'Upgrade to a business class',
      'price': 140
    },
    {
      'id': 3,
      'title': 'Add meal',
      'price': 15
    }]
  },
  {
    'type': 'check-in',
    'offers': [{
      'id': 1,
      'title': 'Choose seats',
      'price': 5
    },
    {
      'id': 2,
      'title': 'Add meal',
      'price': 15
    }]
  },
  {
    'type': 'sightseeing',
    'offers': [{
      'id': 1,
      'title': 'Choose the radio station',
      'price': 120
    },
    {
      'id': 2,
      'title': 'Upgrade to a business class',
      'price': 140
    }]
  },
  {
    'type': 'restaurant',
    'offers': [{
      'id': 1,
      'title': 'Choose the radio station',
      'price': 120
    },
    {
      'id': 2,
      'title': 'Upgrade to a business class',
      'price': 140
    }]
  }
];

const tripDestinations = [
  {
    id: 1,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.',
    name: 'Chamonix',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1,10)}`,
        description: 'Chamonix parliament building',
      }
    ]
  },
  {
    id: 2,
    description: 'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    name: 'Geneve',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1,10)}`,
        description: 'Geneve parliament building',
      }
    ]
  },
  {
    id: 3,
    description: 'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
    name: 'Amsterdam',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1,10)}`,
        description: 'Amsterdam parliament building',
      }
    ]
  }
];

const MOCK_POINTS = [
  {
    id: '0',
    type: 'taxi',
    offers: [1, 2],
    destination: 2,
    basePrice: 500,
    dateFrom: new Date('2019-07-11:20:35'),
    dateTo: new Date('2019-07-12:11:25')
  },
  {
    id: '1',
    type: 'bus',
    offers: [1, 2],
    destination: 1,
    basePrice: 40,
    dateFrom: new Date('2019-07-10:21:50'),
    dateTo: new Date('2019-07-11:22:13')
  },
  {
    id: '2',
    type: 'train',
    offers: [1, 2],
    destination: 1,
    basePrice: 200,
    dateFrom: new Date('2019-07-09:22:55'),
    dateTo: new Date('2019-07-10:12:22')
  },
  {
    id: '3',
    type: 'ship',
    offers: [1, 2],
    destination: 2,
    basePrice: 80,
    dateFrom: new Date('2019-07-10:22:50'),
    dateTo: new Date('2019-07-11:22:10')
  },
  {
    id: '4',
    type: 'drive',
    offers: [1, 2],
    destination: 3,
    basePrice: 90,
    dateFrom: new Date('2019-07-11:10:55'),
    dateTo: new Date('2019-07-11:22:13')
  },
  {
    id: '5',
    type: 'flight',
    offers: [1, 2, 3],
    destination: 1,
    basePrice: 150,
    dateFrom: new Date('2019-07-10:22:55'),
    dateTo: new Date('2019-07-10:11:23')
  },
  {
    id: '6',
    type: 'check-in',
    offers: [1, 2],
    destination: 3,
    basePrice: 150,
    dateFrom: new Date('2019-07-10:12:55'),
    dateTo: new Date('2019-07-10:22:22')
  },
  {
    id: '7',
    type: 'sightseeing',
    offers: [1, 2],
    destination: 2,
    basePrice: 100,
    dateFrom: new Date('2019-07-10:22:55'),
    dateTo: new Date('2019-07-11:11:22')
  },
  {
    id: '8',
    type: 'restaurant',
    offers: [1, 2],
    destination: 1,
    basePrice: 100,
    dateFrom: new Date('2019-07-10:22:55'),
    dateTo: new Date('2019-07-11:11:22')
  }
];

const getRandomPoint = () => getRandomArrayItem(MOCK_POINTS);

export { tripDestinations, offersByType, getRandomPoint};
