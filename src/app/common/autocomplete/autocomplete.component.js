import templateUrl from './autocomplete.html';

export const autocompleteComponent = {
  bindings: {
    onSelect: '&',
    onSearch: '&',
    minLength: '<',
    results: '<',
  },
  templateUrl,
  controller: class AutocompleteComponent {
    constructor($log, cfpLoadingBar) {
      'ngInject';

      this.$log = $log;
      this.cfpLoadingBar = cfpLoadingBar;
      this.searchText = '';
      this.results = [];
      this.showResults = false;
    }
    $onInit() {
    }
    resetResults() {
      this.showResults = false;
      this.results = [];
    }
    selectResult(result) {
      this.onSelect({
        $event: {
          result: result,
        },
      });
      this.searchText = '';
      this.resetResults();
    }
    getResults() {
      this.resetResults();
      if (this.searchText && this.searchText.length >= this.minLength) {
        this.cfpLoadingBar.start();
        return this.onSearch({ $event: { searchText: this.searchText, }, }).then((response) => {
          this.showResults = true;
          this.results = response.data;
          this.cfpLoadingBar.complete();
        }, (error) => {
          this.cfpLoadingBar.complete();
          this.$log.error(error);
        });
      }
    }
  },
};
