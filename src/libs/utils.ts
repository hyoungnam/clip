export function debounce(func: any, timeout = 100) {
  let timer: number
  return (...args: any[]) => {
    clearTimeout(timer)
    timer = window.setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}
