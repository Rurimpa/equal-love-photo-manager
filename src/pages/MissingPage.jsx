import { useState, useEffect } from 'react'
import { MEMBERS, PHOTO_SETS } from '../data/photoSets'
import { getAllOwnership, getSettings } from '../firebase'

export default function MissingPage() {
  const [ownership, setOwnership] = useState({})
  const [selectedMembers, setSelectedMembers] = useState(MEMBERS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [owned, settings] = await Promise.all([
        getAllOwnership(),
        getSettings()
      ])
      setOwnership(owned)
      if (settings && settings.length > 0) setSelectedMembers(settings)
      setLoading(false)
    }
    load()
  }, [])

  const missingBySet = PHOTO_SETS.map(set => ({
    ...set,
    missing: selectedMembers.filter(m => !ownership[`${set.id}_${m}`])
  })).filter(set => set.missing.length > 0)

  const totalMissing = missingBySet.reduce((acc, s) => acc + s.missing.length, 0)

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-pink-400 text-lg">読み込み中...</div>
    </div>
  )

  return (
    <div className="p-3">
      <div className="bg-gradient-to-r from-pink-500 to-pink-400 text-white rounded-2xl p-4 mb-4 shadow">
        <h1 className="text-lg font-bold">📋 未所持リスト</h1>
        <p className="text-pink-100 text-sm mt-1">
          {totalMissing === 0 ? '全部持ってるよ！🎉' : `あと ${totalMissing} 枚`}
        </p>
      </div>

      {totalMissing === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-4">🎉</p>
          <p className="text-pink-600 font-bold text-xl">コンプリート！</p>
          <p className="text-gray-400 text-sm mt-2">選択中のメンバーの生写真を全部持っています</p>
        </div>
      ) : (
        missingBySet.map(set => (
          <div key={set.id} className="bg-white rounded-2xl shadow-sm mb-3 overflow-hidden border border-pink-100">
            <div className="bg-pink-50 px-4 py-2">
              <p className="font-bold text-pink-800 text-sm">{set.name}</p>
              <p className="text-xs text-pink-400">{set.date}</p>
            </div>
            <div className="p-3 flex flex-wrap gap-2">
              {set.missing.map(member => (
                <span
                  key={member}
                  className="text-xs px-3 py-1.5 rounded-full bg-gray-100 text-gray-500"
                >
                  {member}
                </span>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
