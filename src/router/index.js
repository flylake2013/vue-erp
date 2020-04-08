import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home.vue'
import Dashboard from '../components/dashboard.vue'
import Contract from '../components/contract/contract.vue'
import Payment from '../components/payment/payment.vue'
import Customer from '../components/customer/customer.vue'
import Product from '../components/product/product.vue'
import Deliver from '../components/deliver/deliver.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        // redirect重定向
        redirect: '/login'
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/home',
        component: Home,
        redirect: '/home/dashboard',
        children: [{
                path: 'dashboard',
                component: Dashboard
            },
            {
                path: '/contract',
                component: Contract
            },
            {
                path: '/payment',
                component: Payment
            },
            {
                path: '/customer',
                component: Customer
            },
            {
                path: '/product',
                component: Product
            },
            {
                path: '/deliver',
                component: Deliver
            }
        ]
    }

]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path == '/login') return next()

    const token = window.sessionStorage.getItem('token')
    if (token) return next()
    next('/login')
})
export default router