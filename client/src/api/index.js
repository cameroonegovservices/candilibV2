import 'whatwg-fetch'

import store, { SHOW_ERROR } from '../store'
import apiPaths from './api-paths'
import { ADMIN_TOKEN_STORAGE_KEY, CANDIDAT_TOKEN_STORAGE_KEY } from '../constants'

const checkStatus = async (response) => {
  if (response.status === 401) {
    await store.dispatch(SHOW_ERROR, 'Vous n\'êtes plus connecté')
  }
  return response
}

const checkValidJson = async (response) => {
  let data
  try {
    data = await response.json()
    return data
  } catch (e) {
    throw new Error('invalid_json')
  }
}

export const fetchClient = (url, options) => fetch(url, options).then(checkStatus)
export const jsonClient = (url, options) => fetchClient(url, options).then(checkValidJson)

const apiClient = {
  post: (url, options) => (
    jsonClient(url, { ...options, method: 'post' })
  ),
  get: (url, options) => (
    jsonClient(url, { ...options, method: 'GET' })
  ),
  getRaw: (url, options) => (
    fetchClient(url, { ...options, method: 'GET' })
  ),
  put: (url, options) => (
    jsonClient(url, { ...options, method: 'PUT' })
  ),
  delete: (url, options) => (
    jsonClient(url, { ...options, method: 'DELETE' })
  ),
}

const getHeadersForJson = () => {
  const token = localStorage.getItem(CANDIDAT_TOKEN_STORAGE_KEY)
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }
}

const getHeadersForAdminJson = () => {
  const token = localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY)
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }
}

const getAdminTokenHeader = () => {
  const token = localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY)
  return {
    'Authorization': `Bearer ${token}`,
  }
}

export default {
  candidat: {
    async verifyToken (token) {
      const json = await apiClient.get(`${apiPaths.candidat.verifyToken}?token=${token}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return json
    },

    async presignup (candidat) {
      const json = await apiClient.post(apiPaths.candidat.presignup, {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(candidat),
      })
      return json
    },

    async sendMagicLink (email) {
      const json = await apiClient.post(apiPaths.candidat.magicLink, {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
      return json
    },

    async getMyProfile () {
      const json = await apiClient.get(apiPaths.candidat.myProfile, {
        headers: getHeadersForJson(),
      })
      return json
    },

    async getCentre (departement, nom) {
      const json = await apiClient.get(`${apiPaths.candidat.centres}?departement=${departement}&nom=${nom}`, {
        headers: getHeadersForJson(),
      })
      return json
    },

    async getCentres (departement, end) {
      const json = await apiClient.get(`${apiPaths.candidat.centres}?departement=${departement}&end=${encodeURIComponent(end)}`, {
        headers: getHeadersForJson(),
      })
      return json
    },

    async getPlaces (centreId, begin, end) {
      const json = await apiClient.get(`${apiPaths.candidat.places}/${centreId}?begin=${encodeURIComponent(begin)}&end=${encodeURIComponent(end)}`, {
        headers: getHeadersForJson(),
      })
      return json
    },

    async checkPlacesAvailability (centreId, date) {
      const json = await apiClient.get(`${apiPaths.candidat.places}/${centreId}?dateTime=${encodeURIComponent(date)}`, {
        headers: getHeadersForJson(),
      })
      return json
    },

    async getReservations () {
      const json = await apiClient.get(`${apiPaths.candidat.reservations}`, {
        headers: getHeadersForJson(),
      })
      return json
    },

    async setReservations (centreId, date, isAccompanied, hasDualControlCar) {
      const json = await apiClient.post(`${apiPaths.candidat.reservations}`, {
        body: JSON.stringify({ id: centreId, date, isAccompanied, hasDualControlCar }),
        headers: getHeadersForJson(),
      })
      return json
    },

    async sendEmail () {
      const json = await apiClient.get(`${apiPaths.candidat.reservations}?bymail=${true}`, {
        headers: getHeadersForJson(),
      })
      return json
    },

    async deleteReservation () {
      const json = await apiClient.delete(`${apiPaths.candidat.reservations}`, {
        headers: getHeadersForJson(),
      })
      return json
    },

    async validateEmail (email, hash) {
      const json = await apiClient.put(apiPaths.candidat.myProfile, {
        headers: getHeadersForJson(),
        body: JSON.stringify({
          email,
          hash,
        }),
      })
      return json
    },
  },

  admin: {
    async requestToken (email, password) {
      const json = await apiClient.post(apiPaths.admin.login, {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
      return json
    },

    async verifyToken (token) {
      const json = await apiClient.get(`${apiPaths.admin.verifyToken}?token=${token}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return json
    },

    async getCandidats () {
      const json = await apiClient.get(apiPaths.admin.candidats, {
        headers: getHeadersForAdminJson(),
      })
      return json
    },

    async searchCandidats (search) {
      const json = await apiClient.get(`${apiPaths.admin.searchCandidats}${search || ''}`, {
        headers: getHeadersForAdminJson(),
      })
      return json
    },

    async getCreneaux () {
      const json = await apiClient.get(apiPaths.creneaux(), {
        headers: getHeadersForAdminJson(),
      })
      return json
    },

    async uploadCandidatsJson (body) {
      const json = await apiClient.post(apiPaths.admin.uploadCandidatsJson, {
        headers: getAdminTokenHeader(),
        body,
      })
      return json
    },

    async exportCsv () {
      const json = await apiClient.getRaw(apiPaths.admin.exportCsv, {
        headers: getAdminTokenHeader(),
      })
      return json
    },

    async uploadPlacesCSV (body) {
      const json = await apiClient.post(apiPaths.admin.uploadPlacesCSV, {
        headers: getAdminTokenHeader(),
        body,
      })
      return json
    },

    async getWhitelist () {
      const json = await apiClient.get(apiPaths.admin.whitelist, {
        headers: getAdminTokenHeader(),
      })
      return json
    },

    async removeFromWhitelist (id) {
      const json = await apiClient.delete(`${apiPaths.admin.whitelist}/${id}`, {
        headers: getAdminTokenHeader(),
      })
      return json
    },

    async addBatchToWhitelist (emails) {
      const json = await apiClient.post(apiPaths.admin.whitelist, {
        headers: getHeadersForAdminJson(),
        body: JSON.stringify({ emails }),
      })
      return json
    },

    async addToWhitelist (email) {
      const json = await apiClient.post(apiPaths.admin.whitelist, {
        headers: getHeadersForAdminJson(),
        body: JSON.stringify({ email }),
      })
      return json
    },
  },

  util: {
    async searchAdresses (query) {
      const json = await apiClient.get(apiPaths.util.adressesQuery(query), {
        headers: {
        },
      })
      return json
    },
  },
}
