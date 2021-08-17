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
      const _key = addPrefix(key)
      chrome.storage.local.set({ [_key]: data }, () => {
        const error = chrome.runtime.lastError
        error ? reject(error) : resolve()
      })
    })
  },
  remove: (key: string) => {
    const _key = addPrefix(key)
    return new Promise<void>((resolve, reject) => {
      chrome.storage.local.remove(_key, () => {
        const error = chrome.runtime.lastError
        error ? reject(error) : resolve()
      })
    })
  },
}
