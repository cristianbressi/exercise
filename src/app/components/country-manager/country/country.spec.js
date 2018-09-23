describe('Country-Manager', () => {
  beforeEach(() => {
    angular.mock.module('components.country-manager');
  });

  describe('CountryController', () => {
    let $componentController;
    let controller;
    const mockCountry = { name: "Poland", isoCode: "POL" };
    const mockDelete = angular.noop;

    beforeEach(inject(($injector) => {
      $componentController = $injector.get('$componentController');
      controller = $componentController('country',
        { $scope: {} },
        { country: mockCountry, onDelete: mockDelete }
      );
    }));

    it('should bind to the correct country', () => {
      expect(controller.country.isoCode).toEqual(mockCountry.isoCode);
    });

    it('should call onDelete with the correct payload', () => {
      const payload = { $event: { country: mockCountry } };

      spyOn(controller, 'onDelete');
      controller.deleteCountry();
      expect(controller.onDelete).toHaveBeenCalledWith(payload);
    });
  });
});
