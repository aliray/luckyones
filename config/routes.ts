export default [
  {
    path: '/lottery',
    layout: false,
    component: '@/layouts/layout',
    routes: [
      {
        path: '/lottery',
        component: './lottery/main',
        name: 'main',
      },
      {
        path: '/lottery/rules',
        component: './lottery/rules',
        name: 'rules',
      },
      {
        path: '/lottery/user/trades',
        component: './user/trades',
        name: 'trades',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/',
    redirect: '/lottery',
    routes: [
      {
        component: './404',
      },
    ]
  },
];
