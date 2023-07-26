import { createRouter, createMemoryHistory, createWebHistory } from 'vue-router';
import Home from '../views/HomePage.vue';
import AnomalyDetectionView from '../views/AnomalyDetectionView.vue';
import MyTest from "@/components/MyTest.vue";

const isServer = typeof window === 'undefined';
const history = isServer ? createMemoryHistory() : createWebHistory();
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/ad',
        name: 'AnomalyDetectionView',
        component: AnomalyDetectionView,
    },
    { path: '/user/:id', component: MyTest }
];

const router = createRouter({
    history,
    routes,
});

export default router;