import { faker } from '@faker-js/faker'
import fs from 'fs'

console.log('script started...')

const generateUser = (count = 20) => {
	return Array.from({ length: count }, (_, i) => ({
		id: i + 1,
		name: faker.person.fullName(),
		username: faker.internet.username(),
		email: faker.internet.email(),
		role: faker.helpers.arrayElement(['admin', 'user', 'manager']),
		createdAt: faker.date.past().toISOString()
	}));
};

const db = {
	users: generateUser(20)
};

console.log('writing in db.json...')
fs.writeFileSync('backend/db.json', JSON.stringify(db, null, 2));

console.log('✅ db.json generated with fake users')