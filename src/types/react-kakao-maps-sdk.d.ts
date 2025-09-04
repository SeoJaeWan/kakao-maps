/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'react-kakao-maps-sdk' {
  export const Map: any
  export const MapMarker: any
  export function useKakaoLoader(options: any): void
}

declare global {
  interface Window {
    kakao: unknown
  }
}
export {}
