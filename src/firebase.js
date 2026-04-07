// Firebase設定
// Firebaseコンソールで「ウェブアプリを追加」した後、ここの値を書き換えてください
const firebaseConfig = {
  apiKey: "REPLACE_ME",
  authDomain: "REPLACE_ME",
  projectId: "REPLACE_ME",
  storageBucket: "REPLACE_ME",
  messagingSenderId: "REPLACE_ME",
  appId: "REPLACE_ME"
}

let dbInstance = null

async function getDb() {
  if (dbInstance) return dbInstance
  if (firebaseConfig.apiKey === "REPLACE_ME") return null
  try {
    const { initializeApp, getApps } = await import('firebase/app')
    const { getFirestore } = await import('firebase/firestore')
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
    dbInstance = getFirestore(app)
    return dbInstance
  } catch (e) {
    console.warn('Firebase初期化失敗。localStorageで動作します:', e)
    return null
  }
}

// 所持状態を取得
export async function getOwnership(key) {
  const db = await getDb()
  if (!db) {
    return localStorage.getItem(`own_${key}`) === '1'
  }
  const { doc, getDoc } = await import('firebase/firestore')
  const snap = await getDoc(doc(db, 'ownership', key))
  return snap.exists() ? snap.data().owned : false
}

// 所持状態を保存
export async function setOwnership(key, owned) {
  const db = await getDb()
  if (!db) {
    if (owned) {
      localStorage.setItem(`own_${key}`, '1')
    } else {
      localStorage.removeItem(`own_${key}`)
    }
    return
  }
  const { doc, setDoc, deleteDoc } = await import('firebase/firestore')
  if (owned) {
    await setDoc(doc(db, 'ownership', key), { owned: true })
  } else {
    await deleteDoc(doc(db, 'ownership', key))
  }
}

// 全所持状態を取得
export async function getAllOwnership() {
  const db = await getDb()
  if (!db) {
    const result = {}
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)
      if (k && k.startsWith('own_')) {
        result[k.slice(4)] = true
      }
    }
    return result
  }
  const { collection, getDocs } = await import('firebase/firestore')
  const snap = await getDocs(collection(db, 'ownership'))
  const result = {}
  snap.forEach(d => { result[d.id] = d.data().owned })
  return result
}

// メンバー設定を取得
export async function getSettings() {
  const db = await getDb()
  if (!db) {
    const saved = localStorage.getItem('settings_members')
    return saved ? JSON.parse(saved) : null
  }
  const { doc, getDoc } = await import('firebase/firestore')
  const snap = await getDoc(doc(db, 'settings', 'members'))
  return snap.exists() ? snap.data().selected : null
}

// メンバー設定を保存
export async function saveSettings(selected) {
  const db = await getDb()
  if (!db) {
    localStorage.setItem('settings_members', JSON.stringify(selected))
    return
  }
  const { doc, setDoc } = await import('firebase/firestore')
  await setDoc(doc(db, 'settings', 'members'), { selected })
}
