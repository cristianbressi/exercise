import { CountryManagerService } from './country-manager.service';
import { countries } from './countries/countries.module';
import { countrySingle } from './country/country.module';
import { autocomplete } from '../../common/autocomplete/autocomplete.module';
import { countryList } from './country-manager.constants';
import ngMockE2E from 'angular-mocks/ngMockE2E';

export const countryManager = angular
  .module('components.country-manager', [
    countries,
    countrySingle,
    autocomplete,
    ngMockE2E,
  ])
  .service('CountryManagerService', CountryManagerService)
  .constant('config', {
    apiUrl: 'https://host:port/',
    countryList: countryList,
    shouldMockApiCalls: true
  })
  .name;
