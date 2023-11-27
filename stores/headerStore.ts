import { defineStore } from 'pinia';

export const useHeaderStore = defineStore({
  id: 'header', // 唯一标识符
  state: () => ({
    // 这里定义你的状态
  }),
  actions: {
    // 在这里定义你的逻辑
    getLink(item: string): string {
      switch (item) {
        case 'Home':
          return '/main-page';
        case 'UAV':
          return '/uav';
        default:
          return '/main-page';
      }
    },
  },
});
