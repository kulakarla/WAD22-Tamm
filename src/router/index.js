import { createRouter, createWebHistory } from 'vue-router'
import Courses from "../views/Courses.vue";
import AboutView from "../views/AboutView.vue";

const routes = [{
        path: '/',
        name: 'Courses',
        component: Courses,
    },
    {
        path: '/about',
        name: 'AboutView',
        component: AboutView,
    },
    { //will route to AllPosts view if none of the previous routes apply
        path: "/:catchAll(.*)",
        name: "courses",
        component: Courses,
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router