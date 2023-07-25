const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://2aca9562-ef88-4c99-b637-a52b5bbede15.serverhub.practicum-services.com/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});


