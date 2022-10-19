import { PAGES } from "../types/types";
import { ProductsPage } from "./ProductsPage";
import { HomePage } from "./HomePage";


export class PageFactory {
  static getPage(pageName: PAGES) {
    switch (pageName) {
      case PAGES.HOME:
        return new HomePage();
      case PAGES.PRODUCTS:
        return new ProductsPage();
      default:
        return new HomePage();
    }
  }
}
