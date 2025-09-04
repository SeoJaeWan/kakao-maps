/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react'
import { loadKakaoSdk } from '../lib/kakaoLoader'

export interface Point {
  id: string
  lat: number
  lng: number
  address: string
}

interface Props {
  points: Point[]
  onRemove: (id: string) => void
  userLocation?: { lat: number; lng: number }
}

export const MapView = ({ points, onRemove, userLocation }: Props) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const kakaoRef = useRef<any>(null)
  const markersRef = useRef<Record<string, any>>({})

  useEffect(() => {
    loadKakaoSdk().then((kakao) => {
      kakaoRef.current = kakao
      if (mapRef.current) {
        const map = new kakao.maps.Map(mapRef.current, {
          center: new kakao.maps.LatLng(37.5665, 126.9780),
          level: 5,
        })
        ;(mapRef.current as any).__map = map
      }
    })
  }, [])

  useEffect(() => {
    const kakao = kakaoRef.current
    const map = (mapRef.current as any)?.__map
    if (!kakao || !map) return
    Object.keys(markersRef.current).forEach((id) => {
      if (!points.find((p) => p.id === id)) {
        markersRef.current[id].setMap(null)
        delete markersRef.current[id]
      }
    })
    points.forEach((p) => {
      if (!markersRef.current[p.id]) {
        const marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(p.lat, p.lng),
        })
        marker.setMap(map)
        kakao.maps.event.addListener(marker, 'click', () => onRemove(p.id))
        markersRef.current[p.id] = marker
      }
    })
  }, [points, onRemove])

  useEffect(() => {
    const kakao = kakaoRef.current
    const map = (mapRef.current as any)?.__map
    if (!kakao || !map || !userLocation) return
    const pos = new kakao.maps.LatLng(userLocation.lat, userLocation.lng)
    const marker = new kakao.maps.Marker({ position: pos })
    marker.setMap(map)
    return () => marker.setMap(null)
  }, [userLocation])

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />
}
