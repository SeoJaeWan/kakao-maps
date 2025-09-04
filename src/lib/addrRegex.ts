// 구/시/군 + 도로명/길 + 번지 형태 추출
const addrPattern = /\b[가-힣]+(?:구|시|군)\s*[가-힣0-9]+(?:로|길)\s*\d+(?:-\d+)?/g

export const extractAddresses = (text: string): string[] => {
  const matches = text.match(addrPattern)
  return matches ? Array.from(new Set(matches.map((m) => m.trim()))) : []
}
