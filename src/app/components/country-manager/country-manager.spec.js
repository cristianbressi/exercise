describe('Country-Manager', () => {
  beforeEach(() => {
    angular.mock.module('components');
  });

  describe('CountryManagerService', () => {
    let CountryManagerService;
    let $rootScope;
    const greece = { name: 'Greece', isoCode: 'GRE' };
    const poland = { name: 'Poland', isoCode: 'POL' };

    beforeEach(inject(($injector) => {
      CountryManagerService = $injector.get('CountryManagerService');
      $rootScope = $injector.get('$rootScope');
    }));

    afterEach(() => {
      CountryManagerService.clearList();
    });

    it('should search countries', () => {
      const promise = CountryManagerService.getCountries("POLA");

      promise.then((response) => {
        expect(response.data[0].name).toEqual("Poland");
      });

      $rootScope.$digest();
    });

    it('should create a country', () => {
      const response = CountryManagerService.createNewCountry(greece);

      expect(response[0].name).toEqual("Greece");

      $rootScope.$digest();
    });

    it('should get country list', () => {
      const list = CountryManagerService.getCountriesList();
      expect(list).toEqual([]);
    });

    it('should delete a country', () => {
      CountryManagerService.createNewCountry(greece);

      const list = CountryManagerService.deleteCountry(greece);
      expect(list.some(e => e.name === 'Greece')).toBe(false);
    });

    it('should submit countries isoCodes', () => {
      CountryManagerService.createNewCountry(greece);
      CountryManagerService.createNewCountry(poland);

      const promise = CountryManagerService.submitCountries();

      promise.then((response) => {
        expect(response.status).toEqual("200");
        expect(response.data).toEqual(['GRE', 'POL']);
      });

      $rootScope.$digest();
    });

    it('should get the country index', () => {
      CountryManagerService.createNewCountry(greece);

      const index = CountryManagerService.getCountryIndex(greece);
      expect(index).toEqual(0);
    });

    it('should clear the list', () => {
      CountryManagerService.createNewCountry(greece);

      CountryManagerService.clearList();
      expect(CountryManagerService.getCountriesList()).toEqual([]);
    });
  });
});
