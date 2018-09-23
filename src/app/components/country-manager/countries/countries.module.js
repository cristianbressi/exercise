import uiRouter from 'angular-ui-router';
import { countriesComponent } from './countries.component';
import './countries.scss';

export const countries = angular
  .module('components.country-manager.countries', [
    uiRouter,
  ])
  .component('countries', countriesComponent)
  .config(($stateProvider) => {
      'ngInject';

      $stateProvider
        .state('countries', {
          parent: 'app',
          url: '/countries',
          component: 'countries',
        });
    })
  .name;
