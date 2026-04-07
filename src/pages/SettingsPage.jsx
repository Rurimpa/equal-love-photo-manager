import { useState, useEffect } from 'react'
import { MEMBERS } from '../data/photoSets'
import { getSettings, saveSettings } from '../firebase'

export default function SettingsPage() {
  const [selected, setSelected] = useState(new Set(MEMBERS))
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    getSettings().then(settings => {
      if (settings && settings.length > 0) {
        setSelected(new Set(settings))
      }
    })
  }, [])

  const toggle = (member) => {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(member)) {
        if (next.size > 1) next.delete(member) // 最低1人は残す
      } else {
        next.add(member)
      }
      return next
    })
    setSaved(false)
  }

  const selectAll = () => { setSelected(new Set(MEMBERS)); setSaved(false) }
  const clearAll = () => { setSelected(new Set([MEMBERS[0]])); setSaved(false) }

  const handleSave = async () => {
    setSaving(true)
    await saveSettings([...selected])
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-3">
      <div className="bg-gradient-to-r from-pink-500 to-pink-400 text-white rounded-2xl p-4 mb-4 shadow">
        <h1 className="text-lg font-bold">⚙️ 設定</h1>
        <p className="text-pink-100 text-sm mt-1">表示するメンバーを選んでね</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-pink-100 overflow-hidden mb-4">
        <div className="flex gap-2 p-3 border-b border-pink-50">
          <button onClick={selectAll} className="text-xs px-3 py-1 bg-pink-100 text-pink-700 rounded-full">全員選択</button>
          <button onClick={clearAll} className="text-xs px-3 py-1 bg-gray-100 text-gray-500 rounded-full">全員解除</button>
          <span className="ml-auto text-xs text-gray-400 self-center">{selected.size}人選択中</span>
        </div>
        {MEMBERS.map(member => (
          <div
            key={member}
            onClick={() => toggle(member)}
            className={`flex items-center px-4 py-3 cursor-pointer border-b border-gray-50 transition-colors ${
              selected.has(member) ? 'bg-pink-50' : 'bg-white'
            }`}
          >
            <div className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center border-2 transition-colors ${
              selected.has(member) ? 'bg-pink-500 border-pink-500' : 'border-gray-300'
            }`}>
              {selected.has(member) && <span className="text-white text-xs">✓</span>}
            </div>
            <span className={`text-sm ${selected.has(member) ? 'text-pink-800 font-medium' : 'text-gray-400'}`}>
              {member}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full py-3 bg-pink-500 text-white rounded-2xl font-bold text-sm shadow transition-colors active:bg-pink-600 disabled:opacity-50"
      >
        {saving ? '保存中...' : saved ? '✓ 保存しました！' : '設定を保存する'}
      </button>
    </div>
  )
}
