import angular from 'angular'
import templateUrl from './countries.html';

export const countriesComponent = {
  bindings: {
    showMessage: '<',
    listedCountries: '<',
  },
  templateUrl,
  controller: class CountriesComponent {
    constructor(CountryManagerService, cfpLoadingBar, $log) {
      'ngInject';

      this.countryService = CountryManagerService;
      this.cfpLoadingBar = cfpLoadingBar;
      this.$log = $log;
      this.listedCountries = [];
      this.showMessage = false;
      this.submissionSuccessfull;
    }
    $onInit() {
      this.listedCountries = this.countryService.getCountriesList();
    }
    searchCountries(event) {
      return this.countryService.getCountries(event.searchText);
    }
    addCountry(event) {
      this.listedCountries = this.countryService.createNewCountry(event.result);
      this.showMessage = false;
    }
    deleteCountry(event) {
      this.listedCountries = this.countryService.deleteCountry(event.country);
      this.showMessage = false;
    }
    submitCountries() {
      this.cfpLoadingBar.start();
      return this.countryService.submitCountries().then((success) => {
        this.showMessage = true;
        this.submissionSuccessfull = true;
        this.listedCountries = [];
        this.countryService.clearList();
        this.cfpLoadingBar.complete();
      }, (error) => {
        this.showMessage = true;
        this.submissionSuccessfull = false;
        this.cfpLoadingBar.complete();
        this.$log.error(error);
      });
    }
  },
};
