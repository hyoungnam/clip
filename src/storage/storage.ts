import { PREFIX, PREFIX_LENGTH } from 'libs/constants'
import { INote } from 'libs/types'
import { addPrefix } from 'libs/utils'

export const storage = () => {
  return process.env.NODE_ENV === 'production' ? chromeStorage : localStorages
}

export const chromeStorage = {
  get: () => {
    return new Promise<INote[]>((resolve, reject) => {
      chrome.storage.local.get(null, (response) => {
        const error = chrome.runtime.lastError
        if (error) reject(error)

        const notes = Object.keys(response)
          .filter((key) => key.slice(0, PREFIX_LENGTH) === PREFIX)
          .map((key) => response[key])

        resolve(notes)
      })
    })
  },
  set: (key: string, data: INote) => {
    return new Promise<void>((resolve, reject) => {
      chrome.storage.local.set({ [addPrefix(key)]: data }, () => {
        const error = chrome.runtime.lastError
        error ? reject(error) : resolve()
      })
    })
  },
  remove: (key: string) => {
    return new Promise<void>((resolve, reject) => {
      chrome.storage.local.remove(addPrefix(key), () => {
        const error = chrome.runtime.lastError
        error ? reject(error) : resolve()
      })
    })
  },
}

const localStorages = {
  get: () => {
    return new Promise<INote[]>((resolve) => {
      const notes = []
      const keys = Object.keys(window.localStorage).filter(
        (key) => key.slice(0, PREFIX_LENGTH) === PREFIX
      )
      let i = keys.length
      while (i--) {
        const note = window.localStorage.getItem(keys[i])
        note && notes.push(JSON.parse(note))
      }
      resolve(notes)
    })
  },
  set: (key: string, data: INote) => {
    return new Promise<void>((resolve) => {
      window.localStorage.setItem(addPrefix(key), JSON.stringify(data))
      resolve()
    })
  },
  remove: (key: string) => {
    return new Promise<void>((resolve) => {
      window.localStorage.removeItem(addPrefix(key))
      resolve()
    })
  },
}
