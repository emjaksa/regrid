import faker from 'faker'

const data = []
for (let i = 0; i < 100000; i++) {
  data.push({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    address: faker.address.streetAddress(),
    phoneNumber: faker.phone.phoneNumber()
  })
}
export default data
