import { defineStore } from 'pinia';


export const useHeaderStore = defineStore('header', ()=>{
    const getLink = (item: string): string =>{
        switch (item) {
          case 'Home':
            return '/main-page';
          case 'UAV':
            return '/uav';
          default:
            return '/main-page';
        }
      }

    const icons = [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram',
    ]

    return {
      getLink,
      icons
    }

});



