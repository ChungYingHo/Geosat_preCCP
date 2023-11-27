import { defineStore } from 'pinia';

export const useHeaderStore = defineStore('header', () => {

  const getLink = (item: string) => {
    switch (item) {
      case 'Home':
        return '/main-page';
      case 'UAV':
        return '/uav';
      default:
        return '/main-page';
    }
  };

  return {
    getLink,
  };
});



