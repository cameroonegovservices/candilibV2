<template>
  <div>
    <autocomplete-candidats
      class="search-input"
      @selection="displayCandidatInfo"
    />

    <info-candidat
      v-if="candidat"
      :candidat="candidat"
    />
  </div>
</template>

<script>
import AutocompleteCandidats from './AutocompleteCandidats'
import InfoCandidat from './InfoCandidat'

export const dict = {
  codeNeph: 'NEPH',
  nomNaissance: 'Nom',
  prenom: 'Prénom',
  email: 'Email',
  portable: 'Portable',
  adresse: 'Adresse',
  presignedUpAt: 'Inscrit le',
  isValidatedByAurige: 'Status Aurige',
  isValidatedEmail: 'Email validé',
  dateReussiteETG: 'ETG',
  canBookFrom: 'Reservation possible dès',
  dateDernierEchecPratique: 'Dernier échec pratique',
  reussitePratique: 'Réussite pratique',
  place: 'Place',
}

export default {
  components: {
    AutocompleteCandidats,
    InfoCandidat,
  },

  data () {
    return {
      title: 'Informations Candidat',
      candidat: undefined,
    }
  },

  methods: {
    displayCandidatInfo (candidat) {
      this.candidat = Object.entries(candidat)
        .reduce((acc, [key, value]) => {
          if (key === '_id') {
            return acc
          }

          return [
            ...acc,
            [(dict[key] || key), value],
          ]
        }, [])
    },
  },
}
</script>
