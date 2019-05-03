<template>
  <div class="candidat-info">
    <div class="title">
      <h3>{{ title }}</h3>
    </div>
      <v-layout column >
      <v-flex xs12>
        <v-card class="container" color="white" >
          <div>
            <p><strong>{{ orderedList[0].nom[0] }}&nbsp;:</strong>&nbsp; {{ orderedList[0].nom[1] }}</p>
            <p><strong>{{ orderedList[0].prenom[0] }}&nbsp;:</strong>&nbsp;{{ orderedList[0].prenom[1] }}</p>
          </div>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card class="container label" dark color="white">
          <div>
            <p><strong>{{ orderedList[1].email[0] }}&nbsp;:</strong>&nbsp;{{ orderedList[1].email[1] }}</p>
            <p><strong>{{ orderedList[1].portable[0] }}&nbsp;:</strong>&nbsp;{{ orderedList[1].portable[1] }}</p>
            <p><strong>{{ orderedList[1].adresse[0] }}&nbsp;:</strong>&nbsp;{{ orderedList[1].adresse[1] }}</p>
          </div>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card class="container" dark color="white">
          <div>
            <p><strong>{{ orderedList[2].presignedUpAt[0] }}&nbsp;:</strong>&nbsp;{{ getFrenchDateFromIso(orderedList[2].presignedUpAt[1]) }}</p>
            <p><strong>{{ orderedList[2].isValidatedByAurige[0] }}&nbsp;:</strong>&nbsp;{{ transformBoolean(orderedList[2].isValidatedByAurige[1]) }}</p>
            <p><strong>{{ orderedList[2].isValidatedEmail[0] }}&nbsp;:</strong>&nbsp;{{ transformBoolean(orderedList[2].isValidatedEmail[1]) }}</p>
            <p><strong>{{ orderedList[2].canBookFrom[0] }}&nbsp;:</strong>&nbsp;{{ getFrenchDateFromIso(orderedList[2].canBookFrom[1]) }}</p>
            <p><strong>{{ orderedList[2].dateReussiteETG[0] }}&nbsp;:</strong>&nbsp;{{ getFrenchDateFromIso(orderedList[2].dateReussiteETG[1]) }}</p>
            <p><strong>{{ orderedList[2].dateDernierEchecPratique[0] }}&nbsp;:</strong>&nbsp;{{ getFrenchDateFromIso(orderedList[2].dateDernierEchecPratique[1]) }}</p>
            <p><strong>{{ orderedList[2].ReussitePratique[0] }}&nbsp;:</strong>&nbsp;{{ isReussitePratiqueExist(orderedList[2].ReussitePratique[1]) }}</p>
            <!-- ToDo: voir le contenu de l'objet place afin de l'afficher correctement!! -->
            <!-- <p><strong>{{ orderedList[2].place[0] }}&nbsp;:</strong>&nbsp;{{ () => console.log(orderedList[2].place[1]) }}</p> -->

          </div>
        </v-card>
      </v-flex>
      </v-layout>

  </div>
</template>

<script>
import {
  getFrenchDateFromIso,
} from '../../../util/dateTimeWithSetLocale.js'

export default {
  data () {
    return {
      title: 'Informations Candidat',
    }
  },

  computed: {
    orderedList () {
      return [
        {
          blockName: '',
          codeNeph: this.candidat[3],
          nom: this.candidat[5],
          prenom: this.candidat[7],
        },
        {
          blockName: '',
          email: this.candidat[4],
          portable: this.candidat[6],
          adresse: this.candidat[2],
        },
        {
          blockName: '',
          presignedUpAt: this.candidat[8],
          isValidatedByAurige: this.candidat[0],
          isValidatedEmail: this.candidat[1],
          canBookFrom: this.candidat[10],
          dateReussiteETG: this.candidat[12],
          dateDernierEchecPratique: this.candidat[11],
          ReussitePratique: this.candidat[13],
          place: this.candidat[14],
        },
      ]
    },
  },

  props: {
    candidat: Array,
  },

  methods: {
    getFrenchDateFromIso (date) {
      if (date) {
        return getFrenchDateFromIso(date)
      }
      return 'Non renseigné'
    },

    isReussitePratiqueExist (value) {
      if (value) {
        return value
      }
      return ''
    },

    transformBoolean (value) {
      if (value) {
        return 'Oui'
      }
      return 'Non'
    },
  },
}
</script>

<style lang="stylus" scoped>

p {
  display: flex;
  color: black;
}

.title {
  margin: auto;
  padding-bottom: 1 rem;
  text-align: center;
  font-family: "Raleway", sans-serif;
  font-size: 1 rem;
  text-transform: uppercase;
  font-weight: 600;
}

.candidat-info {
  display: flex;
  flex-direction: column;
  margin: 15 px;
  padding: 15 px;
  font-family: 'Poppins-Regular', Arial, Helvetica, sans-serif;
  box-shadow: 0 0 1px #555;
}

.container {
  margin: 5px;
  display: flex;
  width: 100%;
}

.label {
  flex-basis: 9 rem;
}

.value {
  flex-grow: 1;
}
</style>
