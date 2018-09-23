const STORAGE_ID = 'countries-angularjs';

export class CountryManagerService {
  constructor($httpBackend, $log, $timeout, config, $http) {
    'ngInject';
    this.$log = $log;
    this.$timeout = $timeout;
    this.config = config;
    this.$http = $http;
    this.$httpBackend = $httpBackend;
  }
  mockApiGetCall() {
    //Mocking the http GET call to the API
    this.$httpBackend.whenGET(new RegExp(this.config.apiUrl + 'country\\?search=(\\.*)')).respond(
      (method, url, data, headers, params) => { return [200,
        this.config.countryList.filter(
          country => country.name.toLowerCase().includes(params.search))
      ] });
  }
  mockApiPostCall(data) {
    //Mocking the http Post call to the API
    this.$httpBackend.whenPOST(new RegExp(this.config.apiUrl + 'selectedCountries'), data).respond(
      () => { return [200, data] });
  }
  getCountries(searchText) {
    if (this.config.shouldMockApiCalls) this.mockApiGetCall();
    return this.$http.get(this.config.apiUrl+'country?search='+searchText);
  }
  createNewCountry(country) {
    if (this.getCountryIndex(country) === -1) {
      let saved = this.getCountriesList();
      saved.push(country);
      localStorage.setItem(STORAGE_ID, JSON.stringify(saved));
    }
    return this.getCountriesList();
  }
  getCountriesList() {
    return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
  }
  deleteCountry(country) {
    var saved = this.getCountriesList();
    var index = this.getCountryIndex(country);
    saved.splice(index, 1);
    localStorage.setItem(STORAGE_ID, JSON.stringify(saved));
    return this.getCountriesList();
  }
  submitCountries() {
    var data = {isoCodes: this.getCountriesList().map(country => country.isoCode)};
    if (this.config.shouldMockApiCalls) this.mockApiPostCall(data);
    return this.$http.post(this.config.apiUrl + 'selectedCountries', data);
  }
  getCountryIndex(country) {
    return this.getCountriesList().findIndex((countryItem) => countryItem.name === country.name);
  }
  clearList() {
    localStorage.clear();
  }
}
