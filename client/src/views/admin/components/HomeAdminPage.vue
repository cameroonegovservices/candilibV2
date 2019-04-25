<template>
  <div>
    <h1>
      Home page admin
    </h1>
    <div class="u-flex  u-flex--center">
      <search-candidat class="search-input" />
      <search-inspecteurs class="search-input" />
    </div>
  </div>
</template>

<script>
import SearchInspecteurs from './SearchInspecteurs'
import SearchCandidat from './SearchCandidat'

export default {
  components: {
    SearchInspecteurs,
    SearchCandidat,
  },
}
</script>

<style lang="stylus" scoped>
.search-input {
  margin: 0 1em;
}
</style>
