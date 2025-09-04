/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from 'react'
import { useKakaoLoader } from 'react-kakao-maps-sdk'

export const useGeocode = () => {
  const geocoderRef = useRef<any>(null)

  useKakaoLoader({ appkey: import.meta.env.VITE_KAKAO_APP_KEY, libraries: ['services'] })

  const geocode = async (address: string) => {
    const kakao = window.kakao
    if (!geocoderRef.current) {
      geocoderRef.current = new kakao.maps.services.Geocoder()
    }
    return new Promise<{ lat: number; lng: number } | null>((resolve) => {
      geocoderRef.current.addressSearch(
        address,
        (result: any[], status: string) => {
          if (status === kakao.maps.services.Status.OK && result[0]) {
            resolve({
              lat: parseFloat(result[0].y),
              lng: parseFloat(result[0].x),
            })
          } else {
            resolve(null)
          }
        }
      )
    })
  }

  return { geocode }
}
