const { CLIENT_BUILD_TARGET, NODE_ENV } = process.env

const isBuildWithAll = NODE_ENV !== 'production' || ['ALL', undefined].includes(CLIENT_BUILD_TARGET)
const isBuildWithCandidat = NODE_ENV !== 'production' || ['ALL', 'CANDIDAT'].includes(CLIENT_BUILD_TARGET)
const isBuildWithAdmin = NODE_ENV !== 'production' || ['ALL', 'ADMIN'].includes(CLIENT_BUILD_TARGET)

const apiPrefix = `${process.env.BASE_URL || '/'}api/v2`

// TODO: Use prepack to avoid presence of admin API paths for candidat build

const candidatApiPaths = (isBuildWithAll || isBuildWithCandidat) && {
  verifyToken: `${apiPrefix}/auth/candidat/verify-token`,
  magicLink: `${apiPrefix}/auth/candidat/magic-link`,
  presignup: `${apiPrefix}/candidat/preinscription`,
  myProfile: `${apiPrefix}/candidat/me`,
  centres: `${apiPrefix}/candidat/centres`,
  places: `${apiPrefix}/candidat/places`,
  reservations: `${apiPrefix}/candidat/reservations`,
}

const adminApiPaths = (isBuildWithAll || isBuildWithAdmin) && {
  login: `${apiPrefix}/auth/admin/token`,
  verifyToken: `${apiPrefix}/auth/admin/verify-token`,
  candidats: `${apiPrefix}/admin/candidats`,
  uploadCandidatsJson: `${apiPrefix}/admin/candidats`,
  exportCsv: `${apiPrefix}/admin/candidats?for=aurige&format=csv`,
  searchCandidats: `${apiPrefix}/admin/candidats?matching=`,
  uploadPlacesCSV: `${apiPrefix}/admin/places`,
  whitelist: `${apiPrefix}/admin/whitelisted`,
}

const utilPaths = {
  adressesQuery (search) { return `https://api-adresse.data.gouv.fr/search/?q=${search}` },
}

const apiPaths = {
  candidat: candidatApiPaths,
  admin: adminApiPaths,
  util: utilPaths,
}

export default apiPaths
