export default {
  realEstateComplete: {
    id: expect.any(Number),
    value: 100000.99,
    size: 400,
    sold: false,
    address: {
      id: expect.any(Number),
      street: 'street',
      zipCode: 'zipCode',
      number: 'number',
      city: 'city',
      state: 's0',
    },
    categoryToCreate: {
      name: 'category',
    },
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
  },
  realEstateAddressWithoutNumber: {
    id: expect.any(Number),
    value: 100000.99,
    size: 400,
    address: {
      street: 'street1',
      zipCode: 'zipCode1',
      number: null,
      city: 'city1',
      state: 's2',
    },
    categoryToCreate: {
      name: 'category1',
    },
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
  },
  realEstateUnique: {
    value: 100000.99,
    size: 400,
    address: {
      street: 'street2',
      zipCode: 'zipCode2',
      number: 'number2',
      city: 'city2',
      state: 's2',
    },
    categoryToCreate: {
      name: 'category2',
    },
  },
  realEstateInvalidBody: {
    value: '100000.99',
    size: -8,
    address: {
      street: [],
      zipCode: 'mais que 8 caracteres',
      city: {},
      state: 'mais que 8 caracteres',
    },
    categoryToCreate: {
      name: 'category3',
    },
  },
  realEstateInvalidBody2: {
    value: 100000.99,
    categoryToCreate: {
      name: 'category4',
    },
  },
};
