import { PREFIX, PREFIX_LENGTH } from 'libs/constants'
import { addPrefix } from 'libs/utils'

export const storage = {
  get: () => {
    return new Promise<any>((resolve, reject) => {
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
  set: (key: string, data: any) => {
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
