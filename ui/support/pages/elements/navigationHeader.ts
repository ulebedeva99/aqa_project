import { defaultWaitingTime } from "../../constants/constants";
import {
  HEADER_NAVIGATION_INDEXES,
  NAVIGATION_DATA_INDEXES,
} from "../../types/types";

export class NavigationHeader {
  constructor() {}

  public getHeaderNavigationLinkByIndex(itemIndex: HEADER_NAVIGATION_INDEXES) {
    return cy.get("a[class='styles_navMenuLink__2qLfm']").eq(Number(itemIndex));
  }

  public clickOnNavigationLinkByIndex(itemIndex: HEADER_NAVIGATION_INDEXES) {
    this.getHeaderNavigationLinkByIndex(itemIndex).click();
  }

  public getHeaderButtonMore() {
    return cy
      .get("button[class*='styles_headerTitle__3Ithf']", {
        timeout: defaultWaitingTime,
      })
      .eq(0);
  }

  public clickOnHeaderButtonMore() {
    this.getHeaderButtonMore().click();
  }

  public getListButtonMore() {
    return cy.get("li[class='styles_listItem__1ssEb']>a");
  }

  public getLocationButton() {
    return cy.get("button[class='styles_localityBtn__3_asA']");
  }

  public clickOnLocationButton() {
    this.getLocationButton().click();
  }

  public clearInputInLocationChangeForm() {
    cy.get('button[class="style_clearBtn__2uYQW"]').click();
  }

  public getNewLocationChangeForm() {
    return cy.get('li[class*="styles_selectOption__uzAMB"]').eq(1);
  }

  public getNewTextOfLocationChangeForm() {
    return cy.get('li[class*="styles_selectOption__uzAMB"]>div').eq(2);
  }

  public clickOnNewLocationChangeForm() {
    this.getNewLocationChangeForm().click();
  }

  public clickOnSaveLocationButton() {
    cy.get(
      'button[class="styles_reactButton__2olKd style_baseActionButton__2LQYJ styles_actionButton__2olFH"]'
    ).click();
  }
  
  public getLocationElementText() {
    return cy.get("button[class='styles_localityBtn__3_asA']>span");
  }

  public getSearchField() {
    return cy.get('input[class="Search_searchInput__mTD6r"]');
  }

  public getSearchResult() {
    return cy.get('div[class="b-content"]>span');
  }

  public getNavigationLinkByDataIndex(index: NAVIGATION_DATA_INDEXES) {
    return cy.get(`a[data-index="${index}"]`);
  }

  public clickOnNavigationLinkByDataIndex(index: NAVIGATION_DATA_INDEXES) {
    this.getNavigationLinkByDataIndex(index).click();
  }
}
