import { useState, useEffect } from 'react'

const FALLBACK_MEMBERS = [
  "大谷映美里", "大場花菜", "音嶋莉沙", "齋藤樹愛羅", "佐々木舞香",
  "髙松瞳", "瀧脇笙古", "野口衣織", "諸橋沙夏", "山本杏奈"
]

export function usePhotoData() {
  const [members, setMembers] = useState(FALLBACK_MEMBERS)
  const [photoSets, setPhotoSets] = useState([])
  const [dataLoading, setDataLoading] = useState(true)

  useEffect(() => {
    const url = `${import.meta.env.BASE_URL}photoSets.json?t=${Date.now()}`
    fetch(url)
      .then(r => r.json())
      .then(data => {
        if (data.members) setMembers(data.members)
        if (data.photoSets) setPhotoSets(data.photoSets)
      })
      .catch(e => console.warn('photoSets.json fetch failed:', e))
      .finally(() => setDataLoading(false))
  }, [])

  return { members, photoSets, dataLoading }
}
