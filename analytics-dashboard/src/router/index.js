import { createRouter, createWebHistory } from 'vue-router';

import AnalyticsDashboard from '../components/AnalyticsDashboard.vue';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: AnalyticsDashboard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;