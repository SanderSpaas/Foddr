import {faker, VehicleModule} from '@faker-js/faker';
function addTestItem() {
  firestore()
    .collection('recipes')
    .add({
      // id: faker.random.alphaNumeric(15),
      image: 'https://loremflickr.com/640/480/food',
      longitude: faker.random.numeric(2),
      latitude: faker.random.numeric(2),
      // tags: []
      ingredients: [
        {
          'Unit of measure': 'gr',
          Amount: faker.random.numeric(2),
          Name: faker.word.noun(),
        },
        {
          'Unit of measure': 'gr',
          Amount: faker.random.numeric(2),
          Name: faker.word.noun(),
        },
        {
          'Unit of measure': 'gr',
          Amount: faker.random.numeric(2),
          Name: faker.word.noun(),
        },
        {
          'Unit of measure': 'gr',
          Amount: faker.random.numeric(2),
          Name: faker.word.noun(),
        },
        {
          'Unit of measure': 'gr',
          Amount: faker.random.numeric(2),
          Name: faker.word.noun(),
        },
        {
          'Unit of measure': 'gr',
          Amount: faker.random.numeric(2),
          Name: faker.word.noun(),
        },
      ],
      instructions: faker.lorem.paragraphs(5),
      name: faker.word.adjective() + ' ' + faker.word.noun(),
      rating: {
        amountOfRatings: 3,
        rating: 10,
      },
      likes: [],
      time: faker.random.numeric(2),
    })
    .then(() => {
      console.log('recipe added!');
    });
}
