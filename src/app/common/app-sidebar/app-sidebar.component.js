import templateUrl from './app-sidebar.html';

export const sidebarComponent = {
  templateUrl,
  controller: class SidebarComponent {
    constructor() {
      'ngInject';

      this.menuTags = [{
        label: 'Countries Manager',
        icon: 'star',
        tag: 'countries',
      }];
    }
  },
};
