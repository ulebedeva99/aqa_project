import { defaultWaitingTime } from "../constants/constants";
import { NavigationHeader} from "./elements/navigationHeader";

export class BasePage {
  protected url: string;

  public navigationHeader: NavigationHeader;

  constructor() {
    this.navigationHeader = new NavigationHeader();
  }

  public getUrl(){
    return cy.url({timeout:defaultWaitingTime});
  }
  public getTitle() {
    return cy.title();
  }

  public visitPage() {
    cy.visit(this.url);
  }

  public waitForTitleToIncludeText(titleText: string) {
    this.getTitle().should("include", titleText);
  }
}
