/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'

import router from './utils/min-router-for-stories'
import createStore from './utils/create-store-for-stories'

import AdminLogin from '../views/admin/components/Login.vue'
import AdminCalendar from '../views/admin/components/AdminCalendar.vue'
import AdminHeader from '../views/admin/components/AdminHeader.vue'
import AdminFooter from '../views/admin/components/AdminFooter.vue'
import AdminAurige from '../views/admin/components/Aurige.vue'
import AdminCandidatsList from '../views/admin/components/CandidatsList.vue'
import AdminWhitelist from '../views/admin/components/Whitelist.vue'

storiesOf('Admin Components', module)
  .add('AdminLogin', () => ({
    components: { AdminLogin },
    template: '<admin-login />',
  }))
  .add('AdminCalendar', () => ({
    components: { AdminCalendar },
    template: '<admin-calendar />',
  }))
  .add('AdminHeader', () => ({
    components: { AdminHeader },
    template: '<admin-header />',
    router,
  }))
  .add('AdminFooter', () => ({
    components: { AdminFooter },
    template: '<admin-footer />',
  }))
  .add('AdminAurige', () => ({
    components: { AdminAurige },
    template: '<admin-aurige />',
    store: createStore({
      state: {
        aurige: {
          candidats: [],
        },
      },
    }),
  }))
  .add('AdminCandidatsList', () => ({
    components: { AdminCandidatsList },
    template: '<admin-candidats-list />',
    store: createStore({
      state: {
        candidats: {
          list: [{
            place: {
              inspecteur: 'Columbo',
              centre: 'Bobigny',
              date: new Date().toISOString(),
            },
            codeNeph: '0000000000',
            nomNaissance: 'Dupont',
            prenom: 'Jean',
            email: 'fifi@loulou.com',
          }],
        },
      },
      actions: {
        FETCH_CANDIDATS_REQUEST: () => {},
      },
    }),
  }))
  .add('AdminWhitelist', () => ({
    components: { AdminWhitelist },
    store: createStore({
      state: {
        whitelist: {
          list: [
            {
              _id: '5c701e954b20b04e52ff3cbc',
              email: 'jean@dupont.fr',
            },
            {
              _id: '5c701e954b20b04e52ff3cbd',
              email: 'jacques@dupond.fr',
            },
          ],
        },
      },
      actions: {
        FETCH_WHITELIST_REQUEST: () => {},
      },
    }),
    template: '<admin-whitelist />',
  }))
