interface Props {
  addresses: string[]
  onGeocode: (addr: string) => void
  onRemove: (addr: string) => void
}

export const AddressList = ({
  addresses,
  onGeocode,
  onRemove,
}: Props) => {
  return (
    <ul>
      {addresses.map((addr) => (
        <li key={addr}>
          {addr}
          <button onClick={() => onGeocode(addr)}>지오코딩</button>
          <button onClick={() => onRemove(addr)}>삭제</button>
        </li>
      ))}
    </ul>
  )
}
