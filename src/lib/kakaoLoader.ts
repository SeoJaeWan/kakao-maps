/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    kakao: any
  }
}

export const loadKakaoSdk = (): Promise<typeof window.kakao> =>
  new Promise((resolve, reject) => {
    if (window.kakao?.maps) return resolve(window.kakao)
    const s = document.createElement('script')
    s.async = true
    s.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_APP_KEY}&libraries=services`
    s.onload = () => resolve(window.kakao)
    s.onerror = () => reject(new Error('Kakao SDK 로드 실패'))
    document.head.appendChild(s)
  })
