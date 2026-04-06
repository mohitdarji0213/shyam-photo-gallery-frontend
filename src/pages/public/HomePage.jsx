// import { useState, useEffect, useRef } from 'react'
// import { Link } from 'react-router-dom'
// import { motion, AnimatePresence } from 'framer-motion'
// import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import { getNewProducts, getFeaturedProducts, getProducts, getEvents, getCategories } from '../../utils/api'
// import ProductCard from '../../components/shared/ProductCard'
// import ProductSkeleton from '../../components/shared/ProductSkeleton'
// import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

// gsap.registerPlugin(ScrollTrigger)

// const CATEGORIES = [
//   { name: 'Shadi Frames', slug: 'shadi-frames', icon: '💒', color: 'from-rose-100 to-pink-200' },
//   { name: 'Birthday Frames', slug: 'birthday-frames', icon: '🎂', color: 'from-yellow-100 to-orange-200' },
//   { name: 'Clocks', slug: 'clocks', icon: '🕐', color: 'from-blue-100 to-primary-200' },
//   { name: 'Couple Frames', slug: 'couple-frames', icon: '💕', color: 'from-pink-100 to-red-200' },
//   { name: 'Gifts', slug: 'gifts', icon: '🎁', color: 'from-green-100 to-emerald-200' },
//   { name: 'Birthday Gifts', slug: 'birthday-gifts', icon: '🎀', color: 'from-purple-100 to-violet-200' },
//   { name: 'Wedding Gifts', slug: 'wedding-gifts', icon: '💍', color: 'from-gold-100 to-yellow-200' },
//   { name: 'Note Bouquet', slug: 'note-bouquet', icon: '💵', color: 'from-emerald-100 to-teal-200' },
//   { name: 'Flower Bouquet', slug: 'flower-bouquet', icon: '💐', color: 'from-pink-100 to-rose-200' },
//   { name: 'Printed T-Shirts', slug: 'printed-tshirts', icon: '👕', color: 'from-sky-100 to-blue-200' },
// ]

// export default function HomePage() {
//   const [newProducts, setNewProducts] = useState([])
//   const [featured, setFeatured] = useState([])
//   const [allProducts, setAllProducts] = useState([])
//   const [events, setEvents] = useState([])
//   const [eventIdx, setEventIdx] = useState(0)
//   const [loading, setLoading] = useState(true)
//   const heroRef = useRef()
//   const sectionsRef = useRef([])

//   useEffect(() => {
//     Promise.all([getNewProducts(), getFeaturedProducts(), getProducts({ limit: 24 }), getEvents()])
//       .then(([n, f, a, e]) => {
//         setNewProducts(n.data)
//         setFeatured(f.data)
//         setAllProducts(a.data.products)
//         setEvents(e.data)
//       })
//       .finally(() => setLoading(false))
//   }, [])

//   // GSAP scroll animations
//   useEffect(() => {
//     gsap.from(heroRef.current, { opacity: 0, y: 40, duration: 1, ease: 'power3.out' })
//     sectionsRef.current.forEach(el => {
//       if (!el) return
//       gsap.from(el, { opacity: 0, y: 50, duration: 0.8, ease: 'power3.out',
//         scrollTrigger: { trigger: el, start: 'top 80%', once: true } })
//     })
//     return () => ScrollTrigger.getAll().forEach(t => t.kill())
//   }, [loading])

//   // Auto-slide events
//   useEffect(() => {
//     if (!events.length) return
//     const t = setInterval(() => setEventIdx(i => (i + 1) % events.length), 4000)
//     return () => clearInterval(t)
//   }, [events.length])

//   return (
//     <div className="min-h-screen">
//       {/* Hero / Events Banner */}
//       <section ref={heroRef} className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-gold-600 text-block overflow-hidden">
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white blur-3xl" />
//           <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-gold-400 blur-3xl" />
//         </div>
//         {events.length > 0 ? (
//           <div className="relative max-w-7xl mx-auto px-4 py-10 md:py-16">
//             <AnimatePresence mode="wait">
//               <motion.div key={eventIdx} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
//                 className="flex flex-col md:flex-row items-center gap-8">
//                 {events[eventIdx]?.image && (
//                   <img src={events[eventIdx].image} alt={events[eventIdx].title}
//                     className="w-full md:w-96 h-56 md:h-64 object-cover rounded-2xl shadow-2xl" />
//                 )}
//                 <div>
//                   <span className="text-gold-300 text-sm font-bold uppercase tracking-wider">Special Event</span>
//                   <h1 className="font-display text-3xl md:text-5xl font-bold mt-2 mb-4">{events[eventIdx]?.title}</h1>
//                   <p className="text-white/80 text-base mb-6 max-w-lg">{events[eventIdx]?.description}</p>
//                   <Link to="/search" className="bg-white text-primary-600 font-bold px-8 py-3 rounded-full hover:bg-gold-400 hover:text-white transition-all shadow-lg inline-flex items-center gap-2">
//                     Shop Now <FiArrowRight />
//                   </Link>
//                 </div>
//               </motion.div>
//             </AnimatePresence>
//             {events.length > 1 && (
//               <div className="flex items-center gap-2 mt-6">
//                 <button onClick={() => setEventIdx(i => (i - 1 + events.length) % events.length)} className="p-2 bg-white/20 rounded-full hover:bg-white/30"><FiChevronLeft /></button>
//                 {events.map((_, i) => <button key={i} onClick={() => setEventIdx(i)} className={`w-2 h-2 rounded-full transition-all ${i === eventIdx ? 'bg-white w-6' : 'bg-white/40'}`} />)}
//                 <button onClick={() => setEventIdx(i => (i + 1) % events.length)} className="p-2 bg-white/20 rounded-full hover:bg-white/30"><FiChevronRight /></button>
//               </div>
//             )}
//           </div>
//         ) : (
//           <div className=" relative max-w-7xl mx-auto px-4 py-16 text-center">
//             <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">Shyam Photo Gallery</h1>
//             <p className="text-white/80 text-lg mb-8">Aapke khaas rishton ke liye khaas gifts 🎁</p>
//             <Link to="/search" className="bg-white text-primary-600 font-bold px-8 py-3 rounded-full hover:bg-gold-800 hover:text-white transition-all shadow-lg inline-flex items-center gap-2">
//               Sabhi Products Dekhein <FiArrowRight />
//             </Link>
//           </div>
//         )}
//       </section>

//       {/* Categories */}
//       <section ref={el => sectionsRef.current[0] = el} className="max-w-7xl mx-auto px-4 py-12">
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="section-title">Categories</h2>
//           <Link to="/search" className="text-primary-500 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">All <FiArrowRight /></Link>
//         </div>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
//           {CATEGORIES.map((cat, i) => (
//             <motion.div key={cat.slug} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
//               initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
//               <Link to={`/category/${cat.slug}`}
//                 className={`flex flex-col items-center gap-2 p-4 rounded-2xl bg-gradient-to-br ${cat.color} hover:shadow-md transition-all text-center`}>
//                 <span className="text-3xl">{cat.icon}</span>
//                 <span className="text-xs font-semibold text-anber-800 leading-tight">{cat.name}</span>
//               </Link>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* New Products */}
//       {(newProducts.length > 0 || loading) && (
//         <section ref={el => sectionsRef.current[1] = el} className="max-w-7xl mx-auto px-4 py-8">
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h2 className="section-title">New Arrivals ✨</h2>
//               <p className="text-anber-400 text-sm mt-1">Abhi abhi aaye naye products</p>
//             </div>
//           </div>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
//             {loading ? Array(4).fill(0).map((_, i) => <ProductSkeleton key={i} />) :
//               newProducts.map(p => <ProductCard key={p._id} product={p} />)}
//           </div>
//         </section>
//       )}

//       {/* Featured Banner */}
//       <section ref={el => sectionsRef.current[2] = el} className="mx-4 my-8 md:mx-8 bg-gradient-to-r from-anber-900 to-primary-900 text-white rounded-3xl overflow-hidden">
//         <div className="max-w-7xl mx-auto px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
//           <div>
//             <div className="text-gold-400 text-sm font-bold uppercase tracking-widest mb-2">Special Offer</div>
//             <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">Custom Photo Gifts</h2>
//             <p className="text-white/70 mb-6">Apni photo se banao unique gifts — Frames, T-Shirts, Clocks aur bahut kuch!</p>
//             <Link to="/contact?type=order" className="btn-gold inline-flex items-center gap-2">Order Karo <FiArrowRight /></Link>
//           </div>
//           <div className="text-8xl animate-float">🎁</div>
//         </div>
//       </section>

//       {/* All Products */}
//       <section ref={el => sectionsRef.current[3] = el} className="max-w-7xl mx-auto px-4 py-8 pb-16">
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h2 className="section-title">Hamare Products</h2>
//             <p className="text-anber-400 text-sm mt-1">Sabhi behtareen cheezein ek jagah</p>
//           </div>
//           <Link to="/search" className="text-primary-500 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">Sab Dekhein <FiArrowRight /></Link>
//         </div>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
//           {loading ? Array(10).fill(0).map((_, i) => <ProductSkeleton key={i} />) :
//             allProducts.map(p => <ProductCard key={p._id} product={p} />)}
//         </div>
//         {!loading && (
//           <div className="text-center mt-8">
//             <Link to="/search" className="btn-outline inline-flex items-center gap-2">Aur Products Dekhein <FiArrowRight /></Link>
//           </div>
//         )}
//       </section>
//     </div>
//   )
// }














import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getNewProducts, getFeaturedProducts, getProducts, getEvents, getCategories } from '../../utils/api'
import ProductCard from '../../components/shared/ProductCard'
import ProductSkeleton from '../../components/shared/ProductSkeleton'
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

gsap.registerPlugin(ScrollTrigger)

const CATEGORIES = [
  { name: 'Shadi Frames', slug: 'shadi-frames', icon: '💒', color: 'from-rose-100 to-pink-200' },
  { name: 'Birthday Frames', slug: 'birthday-frames', icon: '🎂', color: 'from-yellow-100 to-orange-200' },
  { name: 'Clocks', slug: 'clocks', icon: '🕐', color: 'from-blue-100 to-primary-200' },
  { name: 'Couple Frames', slug: 'couple-frames', icon: '💕', color: 'from-pink-100 to-red-200' },
  { name: 'Gifts', slug: 'gifts', icon: '🎁', color: 'from-green-100 to-emerald-200' },
  { name: 'Birthday Gifts', slug: 'birthday-gifts', icon: '🎀', color: 'from-purple-100 to-violet-200' },
  { name: 'Wedding Gifts', slug: 'wedding-gifts', icon: '💍', color: 'from-gold-100 to-yellow-200' },
  { name: 'Note Bouquet', slug: 'note-bouquet', icon: '💵', color: 'from-emerald-100 to-teal-200' },
  { name: 'Flower Bouquet', slug: 'flower-bouquet', icon: '💐', color: 'from-pink-100 to-rose-200' },
  { name: 'Printed T-Shirts', slug: 'printed-tshirts', icon: '👕', color: 'from-sky-100 to-blue-200' },
]

export default function HomePage() {
  const [newProducts, setNewProducts] = useState([])
  const [featured, setFeatured] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [events, setEvents] = useState([])
  const [categories, setCategories] = useState([])
  const [eventIdx, setEventIdx] = useState(0)
  const [loading, setLoading] = useState(true)
  const heroRef = useRef()
  const sectionsRef = useRef([])

  useEffect(() => {
    Promise.all([getNewProducts(), getFeaturedProducts(), getProducts({ limit: 24 }), getEvents(),getCategories()])
      .then(([n, f, a, e , c]) => {
        setNewProducts(n.data || [])
        setFeatured(f.data || [])
        setAllProducts(a.data?.products || [])
        setEvents(e.data || [])
        
        setCategories(c.data || [])
      })
      .catch(err => console.error("API Error:", err))
      .finally(() => setLoading(false))
  }, [])

  // GSAP scroll animations
  useEffect(() => {
    if (loading) return;

    // Hero animation
    gsap.fromTo(heroRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    )

    // Sections animation
    sectionsRef.current.forEach(el => {
      if (!el) return
      gsap.fromTo(el, 
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: 'power3.out',
          scrollTrigger: { 
            trigger: el, 
            start: 'top 85%', 
            toggleActions: 'play none none none' 
          } 
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [loading])

  // Auto-slide events
  useEffect(() => {
    if (!events.length) return
    const t = setInterval(() => setEventIdx(i => (i + 1) % events.length), 5000)
    return () => clearInterval(t)
  }, [events.length])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero / Events Banner */}
      <section ref={heroRef} className="relative bg-gradient-to-br from-primary-600 via-amber-600 to-red-500 text-white overflow-hidden min-h-[400px] flex items-center">
        {/* Background Decorative Circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-72 h-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 rounded-full bg-yellow-400/20 blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-12">
          {events.length > 0 ? (
            <div>
              <AnimatePresence mode="wait">
                <motion.div 
                  key={eventIdx} 
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col md:flex-row items-center gap-10"
                >
                  {events[eventIdx]?.image && (
                    <div className="w-full md:w-1/2">
                      <img src={events[eventIdx].image} alt={events[eventIdx].title}
                        className="w-full h-64 md:h-80 object-cover rounded-3xl shadow-2xl border-4 border-white/20" />
                    </div>
                  )}
                  <div className="w-full md:w-1/2 text-left">
                    <span className="bg-yellow-400 text-black text-xs font-bold uppercase px-3 py-1 rounded-full tracking-wider">Special Event</span>
                    <h1 className="font-display text-4xl md:text-6xl font-extrabold mt-4 mb-6 leading-tight">
                      {events[eventIdx]?.title}
                    </h1>
                    <p className="text-white/90 text-lg mb-8 max-w-lg leading-relaxed">
                      {events[eventIdx]?.description}
                    </p>
                    <Link to="/search" className="bg-white text-primary-600 font-bold px-10 py-4 rounded-full hover:scale-105 transition-all shadow-xl inline-flex items-center gap-3">
                      Shop Now <FiArrowRight size={20} />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {events.length > 1 && (
                <div className="flex items-center gap-3 mt-10">
                  <button onClick={() => setEventIdx(i => (i - 1 + events.length) % events.length)} className="p-3 bg-white/20 rounded-full hover:bg-white/40 backdrop-blur-md transition-colors"><FiChevronLeft /></button>
                  <div className="flex gap-2">
                    {events.map((_, i) => (
                      <button key={i} onClick={() => setEventIdx(i)} className={`h-2 rounded-full transition-all duration-300 ${i === eventIdx ? 'bg-white w-8' : 'bg-white/40 w-2'}`} />
                    ))}
                  </div>
                  <button onClick={() => setEventIdx(i => (i + 1) % events.length)} className="p-3 bg-white/20 rounded-full hover:bg-white/40 backdrop-blur-md transition-colors"><FiChevronRight /></button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-10">
              <h1 className="font-display text-5xl md:text-7xl font-black mb-6">Shyam Photo Gallery</h1>
              <p className="text-white/90 text-xl mb-10">Aapke khaas rishton ke liye khaas gifts 🎁</p>
              <Link to="/search" className="bg-white text-primary-600 font-bold px-10 py-4 rounded-full hover:bg-yellow-400 hover:text-black transition-all shadow-2xl inline-flex items-center gap-3">
                Sabhi Products Dekhein <FiArrowRight size={20} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Categories */}
      <section ref={el => sectionsRef.current[0] = el} className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Shop by Categories</h2>
          <Link to="/search" className="text-primary-600 font-semibold flex items-center gap-2 hover:underline">View All <FiArrowRight /></Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {(categories.length > 0 ? categories : CATEGORIES).map((cat, i) => (
            <motion.div key={cat._id} whileHover={{ y: -5 }} whileTap={{ scale: 0.95 }}>
              <Link to={`/category/${cat.slug}`}
                className={`flex flex-col items-center gap-3 p-6 rounded-3xl bg-gradient-to-br ${cat.color} shadow-sm hover:shadow-md transition-all text-center border border-white`}>
                <span className="text-4xl">{cat.icon}</span>
                <span className="text-sm font-bold text-gray-800 uppercase tracking-tight">{cat.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* New Products */}
      {(newProducts.length > 0 || loading) && (
        <section ref={el => sectionsRef.current[1] = el} className="max-w-7xl mx-auto px-4 py-12">
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">New Arrivals ✨</h2>
            <p className="text-gray-500 mt-2">Check out our latest collection</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {loading ? Array(4).fill(0).map((_, i) => <ProductSkeleton key={i} />) :
              newProducts.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        </section>
      )}

      {/* Featured Banner */}
      <section ref={el => sectionsRef.current[2] = el} className="mx-4 my-16 md:mx-auto max-w-7xl bg-[rgba(219,102,7,0.4)] rounded-[2rem] overflow-hidden relative shadow-2xl">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-600/60 skew-x-12 transform translate-x-20" />
        <div className="px-8 py-16 md:px-16 flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
          <div className="text-center md:text-left">
            <div className="text-white text-sm font-bold uppercase tracking-[0.2em] mb-4">Limited Edition</div>
            <h2 className="text-3xl md:text-5xl font-bold text-amber-700 mb-6">Custom Photo Gifts</h2>
            <p className="text-white text-lg mb-10 max-w-md">Apni photo se banao unique gifts — Frames, T-Shirts, Clocks aur bahut kuch!</p>
            <Link to="/contact?type=order" className="bg-black text-gray-400 font-bold px-10 py-4 rounded-full hover:bg-white transition-colors inline-flex items-center gap-3">
              Order Karo <FiArrowRight />
            </Link>
          </div>
          <div className="text-9xl animate-bounce duration-[3000ms] hidden md:block">🎁</div>
        </div>
      </section>

      {/* All Products */}
      <section ref={el => sectionsRef.current[3] = el} className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Hamare Products</h2>
            <p className="text-gray-500 mt-2">Sabhi behtareen cheezein ek jagah</p>
          </div>
          <Link to="/search" className="text-primary-600 font-semibold flex items-center gap-2 hover:underline">Sab Dekhein <FiArrowRight /></Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {loading ? Array(10).fill(0).map((_, i) => <ProductSkeleton key={i} />) :
            allProducts.map(p => <ProductCard key={p._id} product={p} />)}
        </div>
        {!loading && (
          <div className="text-center mt-16">
            <Link to="/search" className="border-2 border-primary-600 text-primary-600 font-bold px-10 py-3 rounded-full hover:bg-primary-600 hover:text-white transition-all inline-flex items-center gap-3">
              Aur Products Dekhein <FiArrowRight />
            </Link>
          </div>
        )}
      </section>
    </div>
  )
}