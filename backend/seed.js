const { faker } = require("@faker-js/faker");

const { user } = require("./app/user/user.model");
const bcrypt = require("bcrypt");

const seedUser = async () => {
  try {
    const userCollection = await user.find();
    if (userCollection.length > 0) {
      console.log("User data already exists in the database.");
      return;
    }

    const quantity = 1;
    const users = [];
    const fakeEmail = faker.internet.email().toLowerCase();
    const hashedPassword = await bcrypt.hash("Admin12345", 10);

    for (let u = 0; u < quantity; u++) {
      users.push({
        name: faker.internet.userName(),
        type: "admin",
        image: faker.image.avatar(),
        age: 26,
        email: "admin@gmail.com",
        password: hashedPassword,
      });
    }

    await user.create(users);
    console.log("User collection has been populated!");
  } catch (error) {
    console.log(error);
  }
};

const seeding = () => {
  seedUser();
};

module.exports = {
  seeding,
};
