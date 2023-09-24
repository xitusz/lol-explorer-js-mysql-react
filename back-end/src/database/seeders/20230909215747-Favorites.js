/* eslint-disable no-unused-vars */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "favorites",
      [
        {
          userId: 1,
          favorite: JSON.stringify(["Aatrox", "Ahri", "Akali"]),
        },
      ],
      { timestamps: false }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("favorites", null, {});
  },
};
