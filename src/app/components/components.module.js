import { countryManager } from './country-manager/country-manager.module';

export const components = angular
  .module('components', [
    countryManager,
  ])
  .name;
