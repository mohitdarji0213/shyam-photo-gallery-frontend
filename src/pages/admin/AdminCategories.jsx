import { useState, useEffect } from 'react'
import { getCategories, createCategory, deleteCategory } from '../../utils/api'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { FiPlus, FiTrash2, FiX, FiUpload } from 'react-icons/fi'

const ICONS = ['💒','🎂','🕐','💕','🎁','🎀','💍','💵','💐','👕','🖼️','🎪','🌸','✨','🎉']

export default function AdminCategories() {
  const [categories, setCategories] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', description: '', icon: '🎁' })
  const [image, setImage] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const load = () => getCategories().then(({ data }) => setCategories(data))
  useEffect(() => { load() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => fd.append(k, v))
      if (image) fd.append('image', image)
      await createCategory(fd)
      toast.success('Category create ho gayi! ✅')
      setShowForm(false)
      setForm({ name: '', description: '', icon: '🎁' })
      setImage(null)
      load()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error creating category')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id, name) => {
    if (!confirm(`"${name}" delete karein?`)) return
    await deleteCategory(id)
    toast.success('Category delete ho gayi')
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-warm-900">Categories</h1>
          <p className="text-warm-400 text-sm">{categories.length} categories</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary flex items-center gap-2"><FiPlus /> New Category</button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-lg">Nayi Category</h2>
              <button onClick={() => setShowForm(false)}><FiX /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-warm-700 mb-1 block">Category Name *</label>
                <input className="input-field" placeholder="Wedding Frames" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
              </div>
              <div>
                <label className="text-sm font-medium text-warm-700 mb-1 block">Description</label>
                <input className="input-field" placeholder="Short description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
              </div>
              <div>
                <label className="text-sm font-medium text-warm-700 mb-2 block">Icon Choose Karein</label>
                <div className="flex flex-wrap gap-2">
                  {ICONS.map(icon => (
                    <button key={icon} type="button" onClick={() => setForm(f => ({ ...f, icon }))}
                      className={`text-2xl p-2 rounded-xl transition-all ${form.icon === icon ? 'bg-primary-100 ring-2 ring-primary-500' : 'hover:bg-warm-100'}`}>
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-warm-700 mb-2 block">Category Image (optional)</label>
                <label className="flex items-center gap-3 border-2 border-dashed border-warm-200 rounded-xl p-4 cursor-pointer hover:border-primary-400">
                  <FiUpload className="text-warm-400" />
                  <span className="text-sm text-warm-400">{image ? image.name : 'Image select karein'}</span>
                  <input type="file" accept="image/*" className="hidden" onChange={e => setImage(e.target.files[0])} />
                </label>
              </div>
              <div className="flex gap-3">
                <button type="submit" disabled={submitting} className="btn-primary flex items-center gap-2">
                  {submitting ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <FiPlus />}
                  Category Create Karein
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-outline">Cancel</button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map((cat, i) => (
          <motion.div key={cat._id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
            className="bg-white rounded-2xl p-5 shadow-sm relative group hover:shadow-md transition-shadow">
            <button onClick={() => handleDelete(cat._id, cat.name)}
              className="absolute top-2 right-2 p-1.5 bg-red-50 text-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100">
              <FiTrash2 className="text-sm" />
            </button>
            {cat.image ? <img src={cat.image} alt={cat.name} className="w-12 h-12 rounded-xl object-cover mb-3" /> : <div className="text-4xl mb-3">{cat.icon || '🎁'}</div>}
            <div className="font-semibold text-warm-900 text-sm">{cat.name}</div>
            {cat.description && <div className="text-xs text-warm-400 mt-1 line-clamp-2">{cat.description}</div>}
          </motion.div>
        ))}
        {categories.length === 0 && (
          <div className="col-span-full text-center py-12 text-warm-400">Koi category nahi hai. Pehli category add karein!</div>
        )}
      </div>
    </div>
  )
}
