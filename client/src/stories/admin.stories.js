/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'

import Vuex from 'vuex'

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
  }))
  .add('AdminFooter', () => ({
    components: { AdminFooter },
    template: '<admin-footer />',
  }))
  .add('AdminAurige', () => ({
    components: { AdminAurige },
    template: '<admin-aurige />',
  }))
  .add('AdminCandidatsList', () => ({
    components: { AdminCandidatsList },
    template: '<admin-candidats-list />',
    store: new Vuex.Store({
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
    store: new Vuex.Store({
      state: {
        whitelist: [],
      },
      actions: {
        FETCH_WHITELIST_REQUEST: () => {},
      },
    }),
    template: '<admin-whitelist />',
  }))
