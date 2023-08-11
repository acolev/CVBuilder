export default [
  {
    path: "/resumes",
    name: 'Resumes',
    component: () => import("../index.vue"),
    meta: {
      title: 'text',
      header: false
    }
  },
  {
    path: "/resumes/edit/:id",
    name: 'EditResume',
    component: () => import("../edit.vue"),
    meta: {
      title: 'text',
      header: false
    }
  }
];
