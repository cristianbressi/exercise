describe('Common', () => {
  beforeEach(() => {
    angular.mock.module('common', ($provide) => {
      $provide.value('cfpLoadingBar', {
        start: angular.noop,
        complete: angular.noop,
      });
    });
  });

  describe('AutocompleteController', () => {
    let $componentController;
    let controller;
    let $rootScope;
    let $log;
    let $q;
    let cfpLoadingBar;

    beforeEach(inject(($injector) => {
      $componentController = $injector.get('$componentController');
      $log = $injector.get('$log');
      cfpLoadingBar = $injector.get('cfpLoadingBar');
      $rootScope = $injector.get('$rootScope');
      $q = $injector.get('$q');

      controller = $componentController('autocomplete',
        { $scope: {}, $log: $log, cfpLoadingBar: cfpLoadingBar },
        { onSelect: angular.noop, onSearch: angular.noop, minLength: 2 }
      );
    }));

    it('should call onSearch when searchText length is equal or greater than minLength', () => {
      let promise;
      controller.searchText = "PO";

      spyOn(cfpLoadingBar, 'start');
      spyOn(cfpLoadingBar, 'complete');
      spyOn(controller, 'onSearch').and.callFake(() => $q.when({}));

      promise = controller.getResults();
      expect(controller.onSearch).toHaveBeenCalled();
      expect(cfpLoadingBar.start).toHaveBeenCalled();

      promise.then(() => {
        expect(controller.showResults).toBe(true);
        expect(cfpLoadingBar.complete).toHaveBeenCalled();
      });

      $rootScope.$digest();
    });

    it('should not call onSearch when searchText length is lower than minLength', () => {
      controller.searchText = "P";

      spyOn(cfpLoadingBar, 'start');
      spyOn(cfpLoadingBar, 'complete');
      spyOn(controller, 'onSearch').and.callFake(() => $q.when({}));

      controller.getResults();
      expect(controller.onSearch).not.toHaveBeenCalled();
      expect(controller.showResults).toBe(false);

      $rootScope.$digest();
    });

    it('should call onSelect on the proper country when selectResult is invoked', () => {
      const mockCountry = {name: 'test', isoCode: 'tst'};

      spyOn(controller, 'onSelect').and.callFake(() => $q.when({}));

      controller.selectResult(mockCountry);
      expect(controller.onSelect).toHaveBeenCalledWith({ $event: { result: mockCountry,},});
      expect(controller.showResults).toBe(false);
      expect(controller.searchText).toEqual('');
      expect(controller.results).toEqual([]);

      $rootScope.$digest();
    });

    it('should hide and empty results when resetResults is called', () => {
      controller.resetResults();
      expect(controller.showResults).toBe(false);
      expect(controller.results).toEqual([]);

      $rootScope.$digest();
    });
  });
});
