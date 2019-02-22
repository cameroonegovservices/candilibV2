/* eslint-disable import/no-extraneous-dependencies */
import { addDecorator, configure } from '@storybook/vue'

import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'

import 'vuetify/dist/vuetify.css'

import '../../src/plugins/index'

Vue.use(Vuex)
Vue.use(Router)

addDecorator(() => ({
  template: '<v-app><story/></v-app>',
}))

const req = require.context('../../src/stories', true, /.stories.js$/)

function loadStories () {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
