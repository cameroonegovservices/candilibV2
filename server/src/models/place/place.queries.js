import mongoose from 'mongoose'

import Place from './place.model'
import '../inspecteur/inspecteur.model'
import { appLogger } from '../../util'

export const PLACE_ALREADY_IN_DB_ERROR = 'PLACE_ALREADY_IN_DB_ERROR'

export const createPlace = async leanPlace => {
  appLogger.debug(JSON.stringify({ func: 'createPlace', leanPlace }))
  const previousPlace = await Place.findOne(leanPlace)
  if (previousPlace && !(previousPlace instanceof Error)) {
    throw new Error(PLACE_ALREADY_IN_DB_ERROR)
  }

  const place = new Place(leanPlace)

  return place.save()
}

export const deletePlace = async place => {
  const deletedPlace = place
  await place.delete()
  return deletedPlace
}

export const findAllPlaces = async () => {
  const places = await Place.find({})
  return places
}

export const findPlaceById = async id => {
  const place = await Place.findById(id)
  return place
}
export const findPlaceByIdAndPopulate = async (id, populate) => {
  const query = Place.findById(id)
  queryPopulate(populate, query)
  const place = await query.exec()
  return place
}

export const findPlaceByCandidatId = async id => {
  const places = await Place.find({ candidat: new mongoose.Types.ObjectId(id) })
  return places
}

/**
 *
 * @param {*} centreId - centreId : recupére l'Id de l'object centre
 * @param {*} beginDate - date de debut de recherche
 * @param {*} endDate - date de fin de recherche
 */
const queryAvailablePlacesByCentre = (centreId, beginDate, endDate) => {
  const query = Place.where('centre').exists(true)
  if (beginDate || endDate) {
    query.where('date')

    if (beginDate) query.gte(beginDate)
    if (endDate) query.lt(endDate)
  }

  query.where('candidat').equals(undefined)

  return query.where('centre', centreId)
}

/**
 *
 * @param {*} centreId - centreId : recupére l'Id de l'object centre
 * @param {*} beginDate - date de debut de recherche
 * @param {*} endDate - date de fin de recherche
 */
export const findAllPlacesByCentre = (centreId, beginDate, endDate) => {
  const query = Place.where('centre').exists(true)
  if (beginDate || endDate) {
    query.where('date')

    if (beginDate) query.gte(beginDate)
    if (endDate) query.lt(endDate)
  }
  return query.where('centre', centreId).exec()
}

export const findAvailablePlacesByCentre = async (
  centreId,
  beginDate,
  endDate
) => {
  appLogger.debug(
    JSON.stringify({
      func: 'findAvailablePlacesByCentre',
      args: { centreId, beginDate, endDate },
    })
  )

  const places = await queryAvailablePlacesByCentre(
    centreId,
    beginDate,
    endDate
  ).exec()
  return places
}

export const countAvailablePlacesByCentre = async (
  centreId,
  beginDate,
  endDate
) => {
  appLogger.debug(
    JSON.stringify({
      func: 'countAvailablePlacesByCentre',
      args: { centreId, beginDate, endDate },
    })
  )

  const nbPlaces = await queryAvailablePlacesByCentre(
    centreId,
    beginDate,
    endDate
  ).countDocuments()
  return nbPlaces
}

export const findPlacesByCentreAndDate = async (_id, date) => {
  appLogger.debug(
    JSON.stringify({
      func: 'findPlacesByCentreAndDate',
      args: { _id, date },
    })
  )
  const places = await Place.find({
    centre: _id,
    date,
  })
    .where('candidat')
    .equals(undefined)
  return places
}

export const findPlaceBookedByCandidat = async (
  candidat,
  options = {},
  populate
) => {
  const query = Place.findOne({ candidat }, options)
  queryPopulate(populate, query)

  const place = await query.exec()
  return place
}

export const findAndbookPlace = async (
  candidat,
  centre,
  date,
  fields,
  populate
) => {
  const query = Place.findOneAndUpdate(
    { centre, date, candidat: { $eq: undefined } },
    { $set: { candidat } },
    { new: true, fields }
  )
  if (populate && populate.centre) {
    query.populate('centre')
  }
  if (populate && populate.candidat) {
    query.populate('candidat')
  }

  const place = await query.exec()
  return place
}

export const removeBookedPlace = place => {
  place.candidat = undefined

  return place.save()
}

const queryPopulate = (populate, query) => {
  if (populate && populate.centre) query.populate('centre')
  if (populate && populate.candidat) query.populate('candidat')
}
