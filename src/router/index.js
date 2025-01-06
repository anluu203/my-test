
import { createRouter, createWebHistory } from 'vue-router';
// import HomePage from '@/pages/HomePage.vue';
// import ExtractTextPage from '@/pages/ExtractTextPage.vue';

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: HomePage,
  // },
  // {
  //   path: '/extract-text',
  //   name: 'ExtractText',
  //   component: ExtractTextPage,
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

