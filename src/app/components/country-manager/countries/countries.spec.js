describe('Country-Manager', () => {
  beforeEach(() => {
    angular.mock.module('components.country-manager', ($provide) => {
      $provide.value('CountryManagerService', {
        getCountries: angular.noop,
        createNewCountry: angular.noop,
        deleteCountry: angular.noop,
        submitCountries: angular.noop,
        clearList: angular.noop,
      });
    });
    angular.mock.module('common', ($provide) => {
      $provide.value('cfpLoadingBar', {
        start: angular.noop,
        complete: angular.noop,
      });
    });
  });

  describe('CountriesController', () => {
    let $componentController;
    let controller;
    let $rootScope;
    let $log;
    let $q;
    let cfpLoadingBar;
    let countryManagerService;

    beforeEach(inject(($injector) => {
      $componentController = $injector.get('$componentController');
      $log = $injector.get('$log');
      cfpLoadingBar = $injector.get('cfpLoadingBar');
      $rootScope = $injector.get('$rootScope');
      $q = $injector.get('$q');
      countryManagerService = $injector.get('CountryManagerService');

      controller = $componentController('countries',
        { $scope: {}, countryManagerService, cfpLoadingBar, $log },
        {}
      );
    }));

    it('should call getCountries on the service when searchCountries is invoked', () => {
      const event = { searchText: "PO" };

      spyOn(controller.countryService, 'getCountries').and.callFake(() => $q.when({}));

      controller.searchCountries(event);
      expect(controller.countryService.getCountries).toHaveBeenCalled();

      $rootScope.$digest();
    });

    it('should call createNewCountry on the service when addCountry is invoked', () => {
      const event = { result: {name: "Portugal", isoCode: "POR"} };

      spyOn(controller.countryService, 'createNewCountry').and.callFake(() => $q.when({}));

      controller.addCountry(event);
      expect(controller.countryService.createNewCountry).toHaveBeenCalled();

      $rootScope.$digest();
    });

    it('should call deleteCountry on the service when deleteCountry is invoked', () => {
      const event = { result: {name: "Portugal", isoCode: "POR"} };

      spyOn(controller.countryService, 'deleteCountry').and.callFake(() => $q.when({}));

      controller.deleteCountry(event);
      expect(controller.countryService.deleteCountry).toHaveBeenCalled();

      $rootScope.$digest();
    });

    it('should call submitCountries on the service when submitCountries is invoked', () => {
      let promise;

      spyOn(cfpLoadingBar, 'start');
      spyOn(cfpLoadingBar, 'complete');
      spyOn(controller.countryService, 'submitCountries').and.callFake(() => $q.when({}));
      spyOn(controller.countryService, 'clearList').and.callFake(() => $q.when({}));

      promise = controller.submitCountries();
      expect(controller.countryService.submitCountries).toHaveBeenCalled();
      expect(cfpLoadingBar.start).toHaveBeenCalled();

      promise.then(() => {
        expect(controller.showMessage).toBe(true);
        expect(controller.listedCountries).toEqual([]);
        expect(controller.countryService.clearList).toHaveBeenCalled();
        expect(cfpLoadingBar.complete).toHaveBeenCalled();
      });

      $rootScope.$digest();
    });
  });
});
