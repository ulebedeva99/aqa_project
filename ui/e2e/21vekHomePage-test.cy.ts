import { baseUrl } from "../support/constants/constants";
import { PageFactory } from "../support/pages/pageFactory";
import {
  HEADER_NAVIGATION_INDEXES,
  HEADER_NAVIGATION_LINKS,
  HEADER_NAVIGATION_TEXTS,
  NAVIGATION_DATA_INDEXES,
  NAVIGATION_LINKS,
  NAVIGATION_TEXTS,
  PAGES,
} from "../support/types/types";

const homePage = PageFactory.getPage(PAGES.HOME);

let searchText = "Стол";

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("21vek site - home page", () => {
  before(() => {
    homePage.visitPage();
  });

  for (const item in HEADER_NAVIGATION_INDEXES) {
    const navLinks =
      HEADER_NAVIGATION_LINKS[item as keyof typeof HEADER_NAVIGATION_LINKS];
    const navText =
      HEADER_NAVIGATION_TEXTS[item as keyof typeof HEADER_NAVIGATION_TEXTS];
    const navIndex =
      HEADER_NAVIGATION_INDEXES[item as keyof typeof HEADER_NAVIGATION_INDEXES];
    it(`The header navigation link ${navIndex} should has ${navText} text and redirect user to the correct page`, () => {
      homePage.navigationHeader
        .getHeaderNavigationLinkByIndex(navIndex)
        .should("have.text", navText);
      homePage.navigationHeader.clickOnNavigationLinkByIndex(navIndex);
      homePage.getUrl().should("eql", `${baseUrl}${navLinks}`);
    });
  }

  it(`Should display drop-down with 3 elements after click on More button in the header navigation button More`, () => {
    homePage.navigationHeader.clickOnHeaderButtonMore();
    homePage.navigationHeader.getListButtonMore().should("have.length", 3);
  });

  it(`Location should be change in location field to selected`, () => {
    homePage.navigationHeader.clickOnLocationButton();
    homePage.navigationHeader.clearInputInLocationChangeForm();
    homePage.navigationHeader
      .getNewTextOfLocationChangeForm()
      .invoke("text")
      .then((locationText) => {
        homePage.navigationHeader.clickOnNewLocationChangeForm();
        homePage.navigationHeader.clickOnSaveLocationButton();
        homePage.navigationHeader
          .getLocationElementText()
          .should("have.text", `г. ${locationText}`);
      });
  });

  for (const item in NAVIGATION_DATA_INDEXES) {
    const navLinks = NAVIGATION_LINKS[item as keyof typeof NAVIGATION_LINKS];
    const navText = NAVIGATION_TEXTS[item as keyof typeof NAVIGATION_TEXTS];
    const navIndex =
      NAVIGATION_DATA_INDEXES[item as keyof typeof NAVIGATION_DATA_INDEXES];
    it(`The navigation link should has ${navText} text and redirect user to the correct page`, () => {
      homePage.navigationHeader
        .getNavigationLinkByDataIndex(navIndex)
        .should("have.text", navText);
      homePage.navigationHeader.clickOnNavigationLinkByDataIndex(navIndex);
      homePage.getUrl().should("eql", `${baseUrl}${navLinks}`);
    });
  }

  it(`The product should search by entered value in Search field`, () => {
    homePage.navigationHeader.getSearchField().type(`${searchText}{enter}`);
    homePage.navigationHeader
      .getSearchResult()
      .should("have.text", `Запрос «${searchText}». Найдено 10000 товаров`);
  });
});
