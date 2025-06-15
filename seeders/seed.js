const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');
require('dotenv').config();

const User = require('../models/User');
const Book = require('../models/Book');

const MONGO_URI = process.env.MONGO_URI;
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10;

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for seeding');

    // Clear collections
    await User.deleteMany();
    await Book.deleteMany();
    console.log('Cleared existing users and books');

    // Create fake users
    const users = [];
    for (let i = 0; i < 5; i++) {
      const email = faker.internet.email();
      const passwordHash = await bcrypt.hash('password123', SALT_ROUNDS);
      const user = new User({ email, passwordHash });
      users.push(await user.save());
    }

    // Create fake books (each assigned to a random user)
    for (let i = 0; i < 10; i++) {
      const book = new Book({
        title: faker.lorem.words(3),
        author: faker.person.fullName(),
        year: faker.date.past({ years: 30 }).getFullYear(),
      });

      await book.save();
    }

    console.log('Seeded users and books successfully');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seed();
