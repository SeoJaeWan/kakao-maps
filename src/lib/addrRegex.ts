// 간단한 한국어 도로명 주소 패턴 추출
const addrPattern = /[가-힣0-9\s-]+?(시|도)\s[가-힣0-9\s-]+?(구|군)\s[가-힣0-9\s-]+?(로|길|동)\s?[0-9-]*/g

export const extractAddresses = (text: string): string[] => {
  const matches = text.match(addrPattern)
  return matches ? Array.from(new Set(matches.map((m) => m.trim()))) : []
}
