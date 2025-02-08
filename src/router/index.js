import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Input from '../views/Input.vue';
import Analyze from '../views/Analyze.vue';
import LoginPage from '../views/Login.vue';
const routes = [
  {
    path: '/',
    component: Home,
    children: [
      { path: 'input', component: Input },
      { path: 'analyze', component: Analyze },
      { path: '', redirect: 'input' },
    ],
  },
  {
    path: '/',
    component: LoginPage,
    beforeEnter: (to, from, next) => {
        if (isAuthenticated()) {
            next('/home')
        } else {
            next()
        }
    },
},
  {
    path: "/home",
    name: "/home",
    component: Home,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next();  // Nếu đã đăng nhập, tiếp tục vào trang home
      } else {
        next("/");  // Nếu chưa đăng nhập, chuyển hướng về trang login
      }
    },
  },


  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;