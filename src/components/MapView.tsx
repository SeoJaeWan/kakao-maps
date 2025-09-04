import { useMemo } from 'react'
import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk'

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
  useKakaoLoader({ appkey: import.meta.env.VITE_KAKAO_APP_KEY, libraries: ['services'] })

  const center = useMemo(() => ({ lat: 37.5665, lng: 126.978 }), [])

  return (
    <Map center={center} level={5} style={{ width: '100%', height: '400px' }}>
      {points.map((p) => (
        <MapMarker
          key={p.id}
          position={{ lat: p.lat, lng: p.lng }}
          onClick={() => onRemove(p.id)}
        />
      ))}
      {userLocation && <MapMarker position={userLocation} />}
    </Map>
  )
}
