import { countryComponent } from './country.component';
import './country.scss';

export const countrySingle = angular
  .module('components.country-manager.country', [])
  .component('country', countryComponent)
  .name;
