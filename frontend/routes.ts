import { Route } from '@vaadin/router';
import Role from './generated/com/example/application/data/Role';
import { appStore } from './stores/app-store';
import './views/empty/empty-view';
import './views/main-layout';

export type ViewRoute = Route & {
  title?: string;
  icon?: string;
  requiresLogin?: boolean;
  rolesAllowed?: Role[];
  children?: ViewRoute[];
};

export const hasAccess = (route: Route) => {
  const viewRoute = route as ViewRoute;
  if (viewRoute.requiresLogin && !appStore.loggedIn) {
    return false;
  }

  if (viewRoute.rolesAllowed) {
    return viewRoute.rolesAllowed.some((role) => appStore.isUserInRole(role));
  }
  return true;
};

export const views: ViewRoute[] = [
  // place routes below (more info https://vaadin.com/docs/latest/fusion/routing/overview)
  {
    path: '',
    component: 'empty-view',
    requiresLogin: true,
    icon: '',
    title: '',
    action: async (_context, _command) => {
      if (!hasAccess(_context.route)) {
        return _command.redirect('login');
      }
      return;
    },
  },
  {
    path: 'empty',
    component: 'empty-view',
    requiresLogin: true,
    icon: 'la la-file',
    title: 'Empty',
    action: async (_context, _command) => {
      if (!hasAccess(_context.route)) {
        return _command.redirect('login');
      }
      return;
    },
  },
  {
    path: 'hello-world',
    component: 'hello-world-view',
    requiresLogin: true,
    icon: 'la la-globe',
    title: 'Hello World',
    action: async (_context, _command) => {
      if (!hasAccess(_context.route)) {
        return _command.redirect('login');
      }
      await import('./views/helloworld/hello-world-view');
      return;
    },
  },
  {
    path: 'dashboard',
    component: 'dashboard-view',
    requiresLogin: true,
    icon: 'la la-chart-area',
    title: 'Dashboard',
    action: async (_context, _command) => {
      if (!hasAccess(_context.route)) {
        return _command.redirect('login');
      }
      await import('./views/dashboard/dashboard-view');
      return;
    },
  },
  {
    path: 'card-list',
    component: 'card-list-view',
    requiresLogin: true,
    icon: 'la la-list',
    title: 'Card List',
    action: async (_context, _command) => {
      if (!hasAccess(_context.route)) {
        return _command.redirect('login');
      }
      await import('./views/cardlist/card-list-view');
      return;
    },
  },
  {
    path: 'list',
    component: 'list-view',
    requiresLogin: true,
    icon: 'la la-th',
    title: 'List',
    action: async (_context, _command) => {
      if (!hasAccess(_context.route)) {
        return _command.redirect('login');
      }
      await import('./views/list/list-view');
      return;
    },
  },
  {
    path: 'master-detail',
    component: 'master-detail-view',
    requiresLogin: true,
    icon: 'la la-columns',
    title: 'Master Detail',
    action: async (_context, _command) => {
      if (!hasAccess(_context.route)) {
        return _command.redirect('login');
      }
      await import('./views/masterdetail/master-detail-view');
      return;
    },
  },
  {
    path: 'master-detail-address',
    component: 'master-detail-address-view',
    requiresLogin: true,
    icon: 'la la-columns',
    title: 'Master Detail Address',
    action: async (_context, _command) => {
      if (!hasAccess(_context.route)) {
        return _command.redirect('login');
      }
      await import('./views/masterdetailaddress/master-detail-address-view');
      return;
    },
  },
  {
    path: 'master-detail-book',
    component: 'master-detail-book-view',
    requiresLogin: true,
    icon: 'la la-columns',
    title: 'Master Detail Book',
    action: async (_context, _command) => {
      if (!hasAccess(_context.route)) {
        return _command.redirect('login');
      }
      await import('./views/masterdetailbook/master-detail-book-view');
      return;
    },
  },
  {
    path: 'master-detail-products',
    component: 'master-detail-products-view',
    requiresLogin: true,
    icon: 'la la-columns',
    title: 'Master Detail Products',
    action: async (_context, _command) => {
      if (!hasAccess(_context.route)) {
        return _command.redirect('login');
      }
      await import('./views/masterdetailproducts/master-detail-products-view');
      return;
    },
  },
  {
    path: 'person-form',
    component: 'person-form-view',
    requiresLogin: true,
    icon: 'la la-user',
    title: 'Person Form',
    action: async (_context, _command) => {
      if (!hasAccess(_context.route)) {
        return _command.redirect('login');
      }
      await import('./views/personform/person-form-view');
      return;
    },
  },
  {
    path: 'address-form',
    component: 'address-form-view',
    requiresLogin: true,
    icon: 'la la-map-marker',
    title: 'Address Form',
    action: async (_context, _command) => {
      if (!hasAccess(_context.route)) {
        return _command.redirect('login');
      }
      await import('./views/addressform/address-form-view');
      return;
    },
  },
  {
    path: 'credit-card-form',
    component: 'credit-card-form-view',
    requiresLogin: true,
    icon: 'la la-credit-card',
    title: 'Credit Card Form',
    action: async (_context, _command) => {
      if (!hasAccess(_context.route)) {
        return _command.redirect('login');
      }
      await import('./views/creditcardform/credit-card-form-view');
      return;
    },
  },
  {
    path: 'map',
    component: 'map-view',
    requiresLogin: true,
    icon: 'la la-map',
    title: 'Map',
    action: async (_context, _command) => {
      if (!hasAccess(_context.route)) {
        return _command.redirect('login');
      }
      await import('./views/map/map-view');
      return;
    },
  },
  {
    path: 'editor',
    component: 'editor-view',
    requiresLogin: true,
    icon: 'la la-edit',
    title: 'Editor',
    action: async (_context, _command) => {
      if (!hasAccess(_context.route)) {
        return _command.redirect('login');
      }
      await import('./views/editor/editor-view');
      return;
    },
  },
  {
    path: 'image-list',
    component: 'image-list-view',
    requiresLogin: true,
    icon: 'la la-th-list',
    title: 'Image List',
    action: async (_context, _command) => {
      if (!hasAccess(_context.route)) {
        return _command.redirect('login');
      }
      await import('./views/imagelist/image-list-view');
      return;
    },
  },
  {
    path: 'checkout-form',
    component: 'checkout-form-view',
    requiresLogin: true,
    icon: 'la la-credit-card',
    title: 'Checkout Form',
    action: async (_context, _command) => {
      if (!hasAccess(_context.route)) {
        return _command.redirect('login');
      }
      await import('./views/checkoutform/checkout-form-view');
      return;
    },
  },
  {
    path: 'user-role',
    component: 'user-role-view',
    rolesAllowed: [Role.USER],
    icon: 'la la-globe',
    title: 'User Role',
    action: async (_context, _command) => {
      if (!hasAccess(_context.route)) {
        return _command.redirect('login');
      }
      await import('./views/userrole/user-role-view');
      return;
    },
  },
  {
    path: 'admin-role',
    component: 'admin-role-view',
    rolesAllowed: [Role.ADMIN],
    icon: 'la la-globe',
    title: 'Admin Role',
    action: async (_context, _command) => {
      if (!hasAccess(_context.route)) {
        return _command.redirect('login');
      }
      await import('./views/adminrole/admin-role-view');
      return;
    },
  },
];
export const routes: ViewRoute[] = [
  {
    path: 'login',
    component: 'login-view',
    requiresLogin: true,
    icon: '',
    title: 'Login',
    action: async (_context, _command) => {
      await import('./views/login/login-view');
      return;
    },
  },

  {
    path: '',
    component: 'main-layout',
    children: [...views],
  },
];
