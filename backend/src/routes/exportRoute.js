import { routeAdm } from "./admRoutes/admRouter.js";
import { routeExercise } from "./exerciseRoutes/exerciseRouter.js";
import { routeGym } from "./gymRoutes/gymRouter.js";
import { routeNotice } from "./noticeRoutes/noticeRouter.js";

export const allRoutes = [
    routeAdm,
    routeGym,
    routeNotice,
    routeExercise
];