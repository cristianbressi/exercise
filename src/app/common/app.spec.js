describe('App', () => {
  beforeEach(() => {
    angular.mock.module('ui.router');
    angular.mock.module('common');
    angular.mock.module(($stateProvider) => {
      $stateProvider.state('countries', { url: '/app/countries' });
    });
  });

  describe('Routes', () => {
    let $state;
    let $location;
    let $rootScope;

    function goTo(url) {
      $location.url(url);
      $rootScope.$digest();
    }

    beforeEach(inject(($injector) => {
      $state = $injector.get('$state');
      $location = $injector.get('$location');
      $rootScope = $injector.get('$rootScope');
    }));

    it('should redirect to countries state', () => {
      goTo('/app');
      expect($state.current.name).toEqual('countries');
    });
  });
});
