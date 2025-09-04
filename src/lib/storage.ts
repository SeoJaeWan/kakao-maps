const KEY = 'ocr-map/state/kakao/v3'

export const loadState = <T>(): T | null => {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

export const saveState = (state: unknown) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    // ignore
  }
}

export const clearState = () => {
  localStorage.removeItem(KEY)
}
