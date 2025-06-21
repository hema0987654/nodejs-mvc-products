import { faker } from '@faker-js/faker';

const getDataFake = () => {
  return Array.from({ length: 32 }, (_, index) => {
    return {
      id: index + 1,
      title: faker.commerce.productName(),
      price: +faker.commerce.price({ min: 100, max: 200 }),
      Description: faker.commerce.productDescription(),
      image:faker.image.avatarGitHub()
    };
  });
};

export default getDataFake;
