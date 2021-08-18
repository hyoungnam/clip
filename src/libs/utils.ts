import { PREFIX } from './constants'

export function debounce(func: any, timeout = 100) {
  let timer: number
  return (...args: any[]) => {
    clearTimeout(timer)
    timer = window.setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

export const addPrefix = (key: string) => {
  return `${PREFIX}${key}`
}

export const blurActiveElement = () => {
  const activeEl = document.activeElement as HTMLElement
  activeEl.blur()
}
