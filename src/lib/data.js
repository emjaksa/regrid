import faker from 'faker'

const getData = (size = 100) => {
  const data = []
  for (let i = 0; i < size; i++) {
    data.push({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      address: faker.address.streetAddress(),
      phoneNumber: faker.phone.phoneNumber()
    })
  }
  return data
}

export default getData
