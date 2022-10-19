import { baseUrl } from "../support/constants/constants";
import { PageFactory } from "../support/pages/pageFactory";
import { ProductsPage } from "../support/pages/ProductsPage";
import {
  PAGES,
  PRODUCTS_RELATES_LINKS,
  PRODUCTS_RELATES_LINKS_INDEXES,
  PRODUCTS_RELATES_LINKS_TEXTS,
} from "../support/types/types";

const productsPage = PageFactory.getPage(PAGES.PRODUCTS) as ProductsPage;

describe("21vek site - products page", () => {
  beforeEach(() => {
    productsPage.visitPage();
  });

  it(`Should display correct breadcrumbs on the page`, () => {
    productsPage.getBreadcrumbs().eq(0).should("have.text", "Главная");
    productsPage
      .getBreadcrumbs()
      .eq(1)
      .should("have.text", "Смартфоны, ТВ и электроника");
    productsPage
      .getBreadcrumbs()
      .eq(2)
      .should("have.text", "Смартфоны, аксессуары");
  });

  for (const item in PRODUCTS_RELATES_LINKS_INDEXES) {
    const navLinks =
      PRODUCTS_RELATES_LINKS[item as keyof typeof PRODUCTS_RELATES_LINKS];
    const navText =
      PRODUCTS_RELATES_LINKS_TEXTS[
        item as keyof typeof PRODUCTS_RELATES_LINKS_TEXTS
      ];
    const navIndex =
      PRODUCTS_RELATES_LINKS_INDEXES[
        item as keyof typeof PRODUCTS_RELATES_LINKS_INDEXES
      ];
    it(`The related link should has ${navText} text and redirect user to the correct page`, () => {
      productsPage
        .getRelatedLinksByIndex(navIndex)
        .should("have.text", navText);
      productsPage.clickOnRelatedLinksByIndex(navIndex);
      productsPage.getUrl().should("eql", `${baseUrl}${navLinks}`);
    });
  }

  it("Product should add to basket and basket counter should increase", () => {
    productsPage.clickOnGetAddToCardButton();
    productsPage.getBasketCounter().should("have.text", 1);
  });

  it("Product should add to compare list", () => {
    productsPage.clickCompareLink(0);
    productsPage.getInCompareLink().should("have.text", "Удалить из сравнения");
    productsPage.getCompareCounter().should("have.text", 1);
  });

  it("Should be possible to compare the products", () => {
    productsPage.clickCompareLink(1);
    productsPage.clickCompareLink(0);
    productsPage.clickOnCompareResultLink();
    productsPage.waitForTitleToIncludeText("Сравнение товаров");
  });
});
