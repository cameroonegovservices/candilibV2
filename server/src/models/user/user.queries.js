import User from './user.model'

export const findUserByEmail = async email => {
  const user = await User.findOne({ email })
  return user
}

export const findUserByCredentials = async (email, password) => {
  const user = await User.findOne({ email })
  const isValidCredentials = user.comparePassword(password)
  if (!isValidCredentials) {
    return null
  }
  return user
}

export const createUser = async (email, password) => {
  const user = new User({ email, password })
  await user.save()
  return user
}

export const deleteUserByEmail = async email => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('No user found')
  }
  await user.delete()
  return user
}

export const deleteUser = async user => {
  if (!user) {
    throw new Error('No user given')
  }
  await user.delete()
  return user
}

export const updateUserEmail = async (user, email) => {
  if (!user) {
    throw new Error('user is undefined')
  }
  await user.update({ email })
  const updatedUser = await User.findById(user._id)
  return updatedUser
}

export const updateUserPassword = async (user, password) => {
  await user.update({ password })
  const updatedUser = await User.findById(user._id)
  return updatedUser
}
