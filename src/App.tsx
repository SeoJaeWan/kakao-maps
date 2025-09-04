import { useEffect, useState } from 'react'
import { ImagePicker } from './components/ImagePicker'
import { AddressList } from './components/AddressList'
import { MapView } from './components/MapView'
import type { Point } from './components/MapView'
import { useGeocode } from './hooks/useGeocode'
import { useGeolocation } from './hooks/useGeolocation'
import { loadState, saveState } from './lib/storage'
import { v4 as uuidv4 } from 'uuid'

interface PersistedState {
  addresses: string[]
  points: Point[]
}

function App() {
  const [addresses, setAddresses] = useState<string[]>([])
  const [points, setPoints] = useState<Point[]>([])
  const { geocode } = useGeocode()
  const { position } = useGeolocation()

  useEffect(() => {
    const state = loadState<PersistedState>()
    if (state) {
      setAddresses(state.addresses || [])
      setPoints(state.points || [])
    }
  }, [])

  useEffect(() => {
    saveState({ addresses, points })
  }, [addresses, points])

  const handleAddresses = (list: string[]) => {
    setAddresses(list)
  }

  const handleGeocode = async (addr: string) => {
    const res = await geocode(addr)
    if (res) {
      setPoints((prev) => [...prev, { id: uuidv4(), address: addr, ...res }])
    }
  }

  const removeAddress = (addr: string) => {
    setAddresses((prev) => prev.filter((a) => a !== addr))
  }

  const removePoint = (id: string) => {
    setPoints((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <div>
      <h1>OCR Kakao Map</h1>
      <ImagePicker onAddresses={handleAddresses} />
      <AddressList
        addresses={addresses}
        onGeocode={handleGeocode}
        onRemove={removeAddress}
      />
      <MapView
        points={points}
        onRemove={removePoint}
        userLocation={position ? { lat: position.lat, lng: position.lng } : undefined}
      />
    </div>
  )
}

export default App
