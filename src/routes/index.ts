import express, { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.route.js';
import { UserRoutes } from '../modules/user/user.route.js';
import { ProduceRoutes } from '../modules/Produce/produce.route.js';

const router: Router = express.Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: AuthRoutes,
    },
    {
        path: '/users',
        route: UserRoutes,
    },
    {
        path: '/produces',
        route: ProduceRoutes,
    },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
