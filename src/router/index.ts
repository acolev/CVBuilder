import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { nextFactory } from "./utils";


const routes: Array<RouteRecordRaw> = [];
const requireRoute = import.meta.glob("@/pages/**/router/**/index.ts", { eager: true})

Object.keys(requireRoute).forEach((fileName: any) => {
  // @ts-ignore
  routes.push(...requireRoute[fileName].default);
});

routes.push({
  path: "/:pathMatch(.*)*",
  name: "Error",
  component: () => import("../pages/Errors/404.vue"),
  meta: {
    title: "Page not found",
    layout: "Default",
  },
});
routes.map((el: RouteRecordRaw) => {
  if (el?.meta && !el?.meta?.layout) el.meta.layout = "Default";
  return el;
});

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to: any, from: any, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };
    const nextMiddleware = nextFactory({
      context: context,
      middleware: middleware,
      index: 1,
    });

    return middleware[0]({ ...context, next: nextMiddleware });
  }

  return next();
});

export default router;
