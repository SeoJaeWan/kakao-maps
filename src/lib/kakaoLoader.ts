/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    kakao: any
  }
}

export const loadKakaoSdk = (): Promise<typeof window.kakao> =>
  new Promise((resolve, reject) => {
    if (window.kakao?.maps) return resolve(window.kakao)
    const appKey = import.meta.env.VITE_KAKAO_APP_KEY
    if (!appKey) {
      reject(new Error('VITE_KAKAO_APP_KEY is not set'))
      return
    }
    const scriptUrl = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&libraries=services`
    const s = document.createElement('script')
    s.async = true
    s.src = scriptUrl
    s.onload = () => {
      if (window.kakao?.maps) resolve(window.kakao)
      else reject(new Error('Kakao SDK did not initialize'))
    }
    s.onerror = () => reject(new Error(`Kakao SDK load failed: ${scriptUrl}`))
    document.head.appendChild(s)
  })
