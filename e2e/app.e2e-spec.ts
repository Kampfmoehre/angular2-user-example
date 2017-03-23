import { Angular2UserExamplePage } from './app.po';

describe('angular2-user-example App', () => {
  let page: Angular2UserExamplePage;

  beforeEach(() => {
    page = new Angular2UserExamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
