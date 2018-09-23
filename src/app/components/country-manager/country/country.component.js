import templateUrl from './country.html';

export const countryComponent = {
  bindings: {
    country: '<',
    onDelete: '&',
  },
  templateUrl,
  controller: class CountryComponent {
    constructor() {
      'ngInject';
    }
    deleteCountry() {
      this.onDelete({
        $event: {
          country: this.country,
        },
      });
    }
  },
};
