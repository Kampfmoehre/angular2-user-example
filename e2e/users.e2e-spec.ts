import { UsersPage } from './users.po';

describe('users view', () => {
  let page: UsersPage;

  beforeEach(() => {
    page = new UsersPage();
  });

  it('should display message saying users view', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Users View');
  });

  it('should display a users name', () => {
    page.navigateTo();
    // We can't rely on the name of the user, so we rather look for the static address label
    expect(page.getFirstUsersAdressText()).toEqual('Address');
  });
});
