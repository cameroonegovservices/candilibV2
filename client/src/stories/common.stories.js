/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'

import createStore from './utils/create-store-for-stories'

import AppVersion from '../components/AppVersion.vue'
import AppSnackbar from '../components/AppSnackbar.vue'
import CandidatPresignup from '../views/candidat/components/SignupForm.vue'

storiesOf('CandidatPresignup', module)
  .add('Pré-inscription', () => ({
    components: { CandidatPresignup },
    template: `<div :style="{display: 'flex', background: '#118098'}"><candidat-presignup /></div>`,
    store: createStore({
      state: {
        candidat: {
          isSendingPresignup: false,
        },
      },
    }),
  }))

storiesOf('AppVersion', module)
  .add('with text', () => ({
    components: { AppVersion },
    template: `<app-version />`,
  }))

storiesOf('AppSnackbar', module)
  .add('Error', () => ({
    components: { AppSnackbar },
    template: `<app-snackbar :message="message">Hello AppSnackbar</app-snackbar>`,
    store: createStore({
      state: {
        message: {
          content: 'Erreur de la snackbar',
          color: 'error',
          timeout: 0,
          show: true,
        },
      },
      actions: {
        HIDE_MESSAGE: action('closed'),
      },
    }),
  }))
  .add('Info', () => ({
    components: { AppSnackbar },
    template: `<app-snackbar :message="message">Hello AppSnackbar</app-snackbar>`,
    store: createStore({
      state: {
        message: {
          content: 'Info de la snackbar',
          color: 'info',
          timeout: 0,
          show: true,
        },
      },
      actions: {
        HIDE_MESSAGE: action('closed'),
      },
    }),
  }))
  .add('Success', () => ({
    components: { AppSnackbar },
    template: `<app-snackbar :message="message">Hello AppSnackbar</app-snackbar>`,
    store: createStore({
      state: {
        message: {
          content: 'Message de la snackbar',
          color: 'success',
          timeout: 0,
          show: true,
        },
      },
      actions: {
        HIDE_MESSAGE: action('closed'),
      },
    }),
  }))
