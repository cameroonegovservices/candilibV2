import { storiesOf } from '@storybook/vue'

import InfoCandidat from './InfoCandidat'
import { dict } from './SearchCandidat'

let candidat = {
  _id: 1,
  codeNeph: '012345678910',
  nomNaissance: 'Caroline',
  prenom: 'Caroline',
  adresse: 'rue des marguerites',
  email: 'caro@email.fr',
  portable: ' 0102030405',
  presignedUpAt: '2019-04-15',
}

candidat = Object.entries(candidat)
  .reduce((acc, [key, value]) => {
    if (key === '_id') {
      return acc
    }

    return [
      ...acc,
      [(dict[key] || key), value],
    ]
  }, [])

storiesOf('Admin/InfoCandidat', module)
  .add('Basic', () => ({
    components: { InfoCandidat },
    template: `<info-candidat
      :candidat="candidat"
    />`,
    data () {
      return {
        candidat,
      }
    },

  }))
