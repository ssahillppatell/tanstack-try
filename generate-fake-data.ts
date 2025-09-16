import { faker } from '@faker-js/faker'
import type { Server } from './src/types/server'
import { file, write } from 'bun'

export const createRandomServer = (): Server => {
  return {
    id: faker.string.uuid(),
    name: faker.company.name(),
    location: faker.location.city(),
    health: faker.helpers.arrayElement(["healthy", "disabled", "error"]),
    ip: faker.internet.ipv4(),
    volume: faker.number.int({ min: 1000 }),
  }
}

await write(
  file("./src/assets/fake.json"),
  JSON.stringify(
    faker.helpers.multiple(createRandomServer, {
      count: 5000
    })
  )
)
