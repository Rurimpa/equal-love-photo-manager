import { useState, useEffect, useCallback } from 'react'
import { usePhotoData } from '../hooks/usePhotoData'
import { getAllOwnership, setOwnership, getSettings } from '../firebase'

export default function MainPage() {
  const { members: allMembers, photoSets, dataLoading } = usePhotoData()
  const [ownership, setOwnershipState] = useState({})
  const [selectedMembers, setSelectedMembers] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (dataLoading) return
    async function load() {
      const [owned, settings] = await Promise.all([
        getAllOwnership(),
        getSettings()
      ])
      setOwnershipState(owned)
      setSelectedMembers(settings && settings.length > 0 ? settings : allMembers)
      setLoading(false)
    }
    load()
  }, [dataLoading, allMembers])

  const toggle = useCallback(async (setId, member) => {
    const key = `${setId}_${member}`
    const newVal = !ownership[key]
    setOwnershipState(prev => ({ ...prev, [key]: newVal }))
    await setOwnership(key, newVal)
  }, [ownership])

  const members = selectedMembers || allMembers
  const totalCards = photoSets.length * members.length
  const ownedCount = photoSets.reduce((acc, set) =>
    acc + members.filter(m => ownership[`${set.id}_${m}`]).length, 0)

  if (loading || dataLoading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-pink-400 text-lg">読み込み中...</div>
    </div>
  )

  return (
    <div className="p-3">
      <div className="bg-gradient-to-r from-pink-500 to-pink-400 text-white rounded-2xl p-4 mb-4 shadow">
        <h1 className="text-lg font-bold">🎀 =LOVE 生写真管理</h1>
        <p className="text-pink-100 text-sm mt-1">所持数：{ownedCount} / {totalCards} 枚</p>
        <div className="mt-2 bg-pink-300 rounded-full h-2">
          <div
            className="bg-white rounded-full h-2 transition-all"
            style={{ width: totalCards > 0 ? `${(ownedCount / totalCards) * 100}%` : '0%' }}
          />
        </div>
      </div>

      {photoSets.map(set => {
        const ownedInSet = members.filter(m => ownership[`${set.id}_${m}`]).length
        return (
          <div key={set.id} className="bg-white rounded-2xl shadow-sm mb-3 overflow-hidden border border-pink-100">
            <div className="bg-pink-50 px-4 py-2 flex justify-between items-center">
              <p className="font-bold text-pink-800 text-sm">{set.name}</p>
              <span className="text-xs bg-pink-200 text-pink-700 rounded-full px-2 py-1 font-bold">
                {ownedInSet}/{members.length}
              </span>
            </div>
            <div className="p-3 flex flex-wrap gap-2">
              {members.map(member => {
                const key = `${set.id}_${member}`
                const owned = !!ownership[key]
                return (
                  <button
                    key={member}
                    onClick={() => toggle(set.id, member)}
                    className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
                      owned ? 'bg-pink-500 text-white shadow-sm' : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {owned ? '✓ ' : ''}{member}
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
