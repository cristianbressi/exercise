import { autocompleteComponent } from './autocomplete.component';
import './autocomplete.scss';

export const autocomplete = angular
  .module('common.autocomplete', [])
  .component('autocomplete', autocompleteComponent)
  .name;
