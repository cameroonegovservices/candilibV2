import api from '@/api'

export const FETCH_SEARCH_CANDIDATS_REQUEST = 'FETCH_SEARCH_CANDIDATS_REQUEST'
export const FETCH_SEARCH_CANDIDATS_SUCCESS = 'FETCH_SEARCH_CANDIDATS_SUCCESS'
export const FETCH_SEARCH_CANDIDATS_FAILURE = 'FETCH_SEARCH_CANDIDATS_FAILURE'

export default {
  state: {
    candidats: {
      isFetching: false,
      list: [],
      error: undefined,
    },
  },

  mutations: {
    FETCH_SEARCH_CANDIDATS_REQUEST (state) {
      state.candidats.isFetching = true
      state.candidats.error = undefined
    },
    FETCH_SEARCH_CANDIDATS_SUCCESS (state, list) {
      state.candidats.isFetching = false
      state.candidats.list = list
    },
    FETCH_SEARCH_CANDIDATS_FAILURE (state, error) {
      state.candidats.isFetching = false
      state.candidats.error = error
    },
  },

  actions: {
    async FETCH_SEARCH_CANDIDATS_REQUEST ({ state, commit }, search) {
      try {
        const list = await api.admin.searchCandidats(search)
        commit(FETCH_SEARCH_CANDIDATS_SUCCESS, list)
      } catch (error) {
        commit(FETCH_SEARCH_CANDIDATS_FAILURE, error)
      }
    },
  },
}
