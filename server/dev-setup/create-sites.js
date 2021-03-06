import { createSite } from '../src/models/site'

import logger from '../src/util/logger'
import sites from './sites'

logger.info('Creating sites')

const sitesInCreation = []

export default async () => {
  for (const { nom, label, adresse } of sites) {
    const createdSites = createSite(nom, label, adresse)
      .then(() => {
        logger.info(`Site ${nom} créé !`)
      })
      .catch(error => logger.error(error))
    sitesInCreation.push(createdSites)
  }

  return Promise.all(sitesInCreation)
}
