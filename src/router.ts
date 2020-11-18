import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/layout/index.vue';

Vue.use(Router);

/*
  redirect:                      if set to 'noredirect', no redirect action will be trigger when clicking the breadcrumb
  meta: {
    title: 'title'               the name showed in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon showed in the sidebar
    breadcrumb: false            if false, the item will be hidden in breadcrumb (default is true)
    hidden: true                 if true, this route will not show in the sidebar (default is false)
  }
*/

export default new Router({
  // mode: 'history',  // Enable this if you need.
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      component: () =>
        import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
      meta: { hidden: true }
    },
    {
      path: '/404',
      component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue'),
      meta: { hidden: true }
    },
    {
      path: '/',
      component: Layout,
      redirect: '/dashboard',
      children: [
        {
          path: 'dashboard',
          component: () =>
            import(
              /* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'
            ),
          meta: {
            title: 'kms密钥管理系统',
            icon: 'dashboard'
          }
        }
      ]
    },
    {
      path: '/example',
      component: Layout,
      redirect: '/example/tree',
      meta: {
        title: '系统管理',
        icon: 'example'
      },
      children: [
        {
          path: 'tree',
          component: () =>
            import(/* webpackChunkName: "tree" */ '@/views/userop/index.vue'),
          meta: {
            title: '用户管理',
            icon: 'tree'
          }
        },
        {
          path: 'table',
          component: () =>
            import(/* webpackChunkName: "table" */ '@/views/table/index.vue'),
          meta: {
            title: '角色管理',
            icon: 'table'
          }
        }
      ]
    },
    {
      path: '/keyuser',
      component: Layout,
      redirect: '/keyuser/info',
      meta: {
        title: '密钥使用方',
        icon: 'example'
      },
      children: [
        {
          path: 'info',
          component: () =>
            import(
              /* webpackChunkName: "tree" */ '@/views/keyclient/info/index.vue'
            ),
          meta: {
            title: '使用方详情',
            icon: 'tree'
          }
        },
        {
          path: 'record',
          component: () =>
            import(/* webpackChunkName: "table" */ '@/views/table/index.vue'),
          meta: {
            title: '申请记录',
            icon: 'table'
          }
        }
      ]
    },
    {
      path: '/key',
      component: Layout,
      redirect: '/key/info',
      meta: {
        title: '密钥管理',
        icon: 'example'
      },
      children: [
        {
          path: 'info',
          component: () =>
            import(
              /* webpackChunkName: "tree" */ '@/views/keymanage/index.vue'
            ),
          meta: {
            title: '密钥详情',
            icon: 'tree'
          }
        },
        {
          path: 'manualget',
          component: () =>
            import(/* webpackChunkName: "table" */ '@/views/table/index.vue'),
          meta: {
            title: '手动获取',
            icon: 'table'
          }
        },
        {
          path: 'dispatch',
          component: () =>
            import(/* webpackChunkName: "table" */ '@/views/table/index.vue'),
          meta: {
            title: '分发记录',
            icon: 'table'
          }
        }
      ]
    },
    {
      path: '/form',
      component: Layout,
      children: [
        {
          path: 'index',
          component: () =>
            import(/* webpackChunkName: "form" */ '@/views/form/index.vue'),
          meta: {
            title: 'Form',
            icon: 'form'
          }
        }
      ]
    },
    {
      path: '/sign',
      component: Layout,
      children: [
        {
          path: '',
          component: () =>
            import(
              /* webpackChunkName: "login" */ '@/views/register/index.vue'
            ),
          meta: {
            title: 'Sign',
            icon: 'form'
          }
        }
      ]
    },

    {
      path: '/nested',
      component: Layout,
      redirect: '/nested/menu1',
      meta: {
        title: 'Nested',
        icon: 'nested'
      },
      children: [
        {
          path: 'menu1',
          component: () =>
            import(
              /* webpackChunkName: "menu1" */ '@/views/nested/menu1/index.vue'
            ),
          redirect: '/nested/menu1/menu1-1',
          meta: { title: 'Menu1' },
          children: [
            {
              path: 'menu1-1',
              component: () =>
                import(
                  /* webpackChunkName: "menu1-1" */ '@/views/nested/menu1/menu1-1/index.vue'
                ),
              meta: { title: 'Menu1-1' }
            },
            {
              path: 'menu1-2',
              component: () =>
                import(
                  /* webpackChunkName: "menu1-2" */ '@/views/nested/menu1/menu1-2/index.vue'
                ),
              redirect: '/nested/menu1/menu1-2/menu1-2-1',
              meta: { title: 'Menu1-2' },
              children: [
                {
                  path: 'menu1-2-1',
                  component: () =>
                    import(
                      /* webpackChunkName: "menu1-2-1" */ '@/views/nested/menu1/menu1-2/menu1-2-1/index.vue'
                    ),
                  meta: { title: 'Menu1-2-1' }
                },
                {
                  path: 'menu1-2-2',
                  component: () =>
                    import(
                      /* webpackChunkName: "menu1-2-2" */ '@/views/nested/menu1/menu1-2/menu1-2-2/index.vue'
                    ),
                  meta: { title: 'Menu1-2-2' }
                }
              ]
            },
            {
              path: 'menu1-3',
              component: () =>
                import(
                  /* webpackChunkName: "menu1-3" */ '@/views/nested/menu1/menu1-3/index.vue'
                ),
              meta: { title: 'Menu1-3' }
            }
          ]
        },
        {
          path: 'menu2',
          component: () =>
            import(
              /* webpackChunkName: "menu2" */ '@/views/nested/menu2/index.vue'
            ),
          meta: { title: 'Menu2' }
        }
      ]
    },
    {
      path: 'external-link',
      component: Layout,
      children: [
        {
          path: 'https://github.com/Armour/vue-typescript-admin-template',
          meta: {
            title: 'External Link',
            icon: 'link'
          }
        }
      ]
    },
    {
      path: '*',
      redirect: '/404',
      meta: { hidden: true }
    }
  ]
});
