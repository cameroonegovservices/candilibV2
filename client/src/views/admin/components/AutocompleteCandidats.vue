<template>
  <v-autocomplete
    v-model="selectedCandidat"
    label="Candidats"
    append-outer-icon="search"
    placeholder="Dupont"
    :items="candidats"
    :search-input.sync="autocompleteCandidats"
    return-object
    item-text="nomNaissance"
    item-value="_id"
  />
</template>

<script>
import { FETCH_AUTOCOMPLETE_CANDIDATS_REQUEST } from '@/store'

export default {
  data () {
    return {
      autocompleteCandidats: undefined,
      selectedCandidat: undefined,
    }
  },

  computed: {
    candidats () {
      return this.$store.state.adminSearch.candidats.list
    },
  },

  watch: {
    autocompleteCandidats (searchQuery) {
      this.$store.dispatch(FETCH_AUTOCOMPLETE_CANDIDATS_REQUEST, searchQuery)
    },
    selectedCandidat (selectedCandidat) {
      this.$emit('selection', selectedCandidat)
    },
  },
}
</script>
