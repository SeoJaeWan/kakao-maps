/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from 'react'
import { loadKakaoSdk } from '../lib/kakaoLoader'

export const useGeocode = () => {
  const geocoderRef = useRef<any>(null)

  const geocode = async (address: string) => {
    const kakao = await loadKakaoSdk()
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
