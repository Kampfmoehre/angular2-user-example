import { browser, element, by } from 'protractor';

export class UsersPage {
  navigateTo() {
    return browser.get('/users');
  }

  getParagraphText() {
    return element(by.css('app-users h2')).getText();
  }

  getFirstUsersAdressText() {
    return element(by.css('app-users div .col-1-3 .subheading')).getText();
  }
}
