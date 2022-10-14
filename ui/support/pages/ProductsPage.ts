import {
  NAVIGATION_LINKS,
  PRODUCTS_RELATES_LINKS_INDEXES,
} from "../types/types";
import { BasePage } from "./BasePage";

export class ProductsPage extends BasePage {
  constructor() {
    super();
    this.url = NAVIGATION_LINKS.PHONES;
  }

  public getBreadcrumbs() {
    return cy.get("a[class='breadcrumbs__link']");
  }

  public getRelatedLinksByIndex(index: PRODUCTS_RELATES_LINKS_INDEXES) {
    return cy.get("a[class='b-related-links__item__link']").eq(Number(index));
  }

  public clickOnRelatedLinksByIndex(index: PRODUCTS_RELATES_LINKS_INDEXES) {
    this.getRelatedLinksByIndex(index).click();
  }

  public getAddToCardButton() {
    return cy.get("button[class*='g-button g-buybtn']").eq(1);
  }

  public clickOnGetAddToCardButton() {
    this.getAddToCardButton().click();
  }

  public getBasketCounter() {
    return cy.get("span[data-testid='header-count']");
  }

  public getCompareLink(index: number) {
    return cy.get("a[class='compare__link g-pseudo_href j-compare']").eq(index);
  }

  public clickCompareLink(index: number) {
    this.getCompareLink(index).click();
  }

  public getInCompareLink() {
    return cy.get(
      "a[class='compare__link g-pseudo_href j-compare j-compare__in']"
    );
  }

  public getCompareCounter() {
    return cy.get('span[class="g-counter j-compare_counter"]');
  }

  public getCompareResultLink(){
    return cy.get("div[class='tools-compare']>span>a");
  }

  public clickOnCompareResultLink(){
    this.getCompareResultLink().click();
  }
}
