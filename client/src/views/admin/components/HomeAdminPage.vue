<template>
  <div>
    <h1>
      Home page admin
    </h1>
    <div class="u-flex  u-flex--center">
      <search-candidats class="search-input" />
      <search-inspecteurs class="search-input" />
    </div>
  </div>
</template>

<script>
import SearchCandidats from './SearchCandidats'
import SearchInspecteurs from './SearchInspecteurs'

export default {
  components: {
    SearchCandidats,
    SearchInspecteurs,
  },
}
</script>

<style lang="stylus" scoped>
.search-input {
  margin: 0 1em;
}
</style>
