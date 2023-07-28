import { createRouter, createMemoryHistory, createWebHistory } from 'vue-router';
import AnomalyDetectionView from '../views/AnomalyDetectionView.vue';
import CellOutageDetectionView from "@/views/CellOutageDetectionView.vue";
import HomeView from "@/views/HomeView.vue";

const isServer = typeof window === 'undefined';
const history = isServer ? createMemoryHistory() : createWebHistory();
const routes = [
    {
        path: '/',
        name: 'HomeView',
        component: HomeView,
    },
    {
        path: '/cod',
        name: 'CellOutageDetectionView',
        component: CellOutageDetectionView,
    },
    {
        path: '/ad',
        name: 'AnomalyDetectionView',
        component: AnomalyDetectionView,
        props: {
            msg: 'test'
        }
    },
];

const router = createRouter({
    history,
    routes,
});



export default router;