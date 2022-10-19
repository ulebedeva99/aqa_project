import { defineConfig } from "cypress";
import AllureWriter from "@shelex/cypress-allure-plugin/writer"; 
import { assetsFolder, baseUrl, defaultWaitingTime } from "./support/constants/constants";

export default defineConfig({
  e2e: {
    specPattern: "./ui/e2e/**/*.cy.ts",
    baseUrl,
    defaultCommandTimeout: defaultWaitingTime * 5,
    supportFile: "ui/support/index.ts",
    videosFolder: `${assetsFolder}/videos`,
    downloadsFolder:`${assetsFolder}/downloads`,
    screenshotsFolder:`${assetsFolder}/screenshots`,
    viewportWidth:1920,
    viewportHeight:1080,
    setupNodeEvents(on, config) {
      AllureWriter(on, config);
      return config;
  },
  env:{
    allure:"true",
    allureResultsPath:"ui/assets/allure-results"
  },
  }
});
