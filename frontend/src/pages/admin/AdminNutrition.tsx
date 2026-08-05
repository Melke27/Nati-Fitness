import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Apple, Plus, UtensilsCrossed, Flame, Beef, Wheat, Droplet, CheckCircle2, X } from 'lucide-react'
import { useDB } from '@/lib/store'
import { PageHeader, Glass, EmptyState, SearchInput, Segmented, Drawer, MiniBar } from '@/components/trainer'
import { Button } from '@/components/ui'
import { useToast } from '@/context/ToastContext'
import { cn } from '@/lib/utils'
import { MEDIA } from '@/lib/media'

interface PlanCard {
  id: string
  name: string
  member: string
  calories: number
  protein: number
  carbs: number
  fat: number
  meals: number
  tag: string
}

export default function AdminNutrition() {
  const db = useDB()
  const toast = useToast()
  const [q, setQ] = useState('')
  const [cat, setCat] = useState<'All' | 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Shake'>('All')
  const [plans] = useState<PlanCard[]>([
    { id: 'np1', name: 'Weight Loss — 1800 kcal', member: 'Sarah Johnson', calories: 1800, protein: 140, carbs: 170, fat: 55, meals: 4, tag: 'Active' },
    { id: 'np2', name: 'Muscle Gain — 3200 kcal', member: 'David Okafor', calories: 3200, protein: 200, carbs: 400, fat: 90, meals: 5, tag: 'Active' },
    { id: 'np3', name: 'Maintenance — 2200 kcal', member: 'Unassigned', calories: 2200, protein: 160, carbs: 240, fat: 70, meals: 4, tag: 'Draft' },
  ])
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null)

  const recipes = useMemo(() => db.recipes.filter((r) => (cat === 'All' || r.category === cat) && r.name.toLowerCase().includes(q.toLowerCase())), [db, q, cat])
  const recipe = db.recipes.find((r) => r.id === selectedRecipe)

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <PageHeader
        title="Nutrition Plans"
        sub={`${plans.length} plans · ${db.recipes.length} recipes in the library`}
        icon={<Apple className="h-5 w-5" />}
        actions={<Button variant="accent" size="md" onClick={() => toast?.success('Meal plan created')}><Plus className="h-4 w-4" /> New meal plan</Button>}
      />

      {/* Plans */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((p, i) => {
          const proteinPct = Math.round((p.protein * 4 / p.calories) * 100)
          const carbPct = Math.round((p.carbs * 4 / p.calories) * 100)
          const fatPct = Math.max(0, 100 - proteinPct - carbPct)
          return (
            <motion.div key={p.id} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Glass hover className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent/15 text-accent-dark dark:text-accent"><UtensilsCrossed className="h-5 w-5" /></span>
                    <div>
                      <p className="text-sm font-black text-content">{p.name}</p>
                      <p className="text-xs text-content-muted">{p.member}</p>
                    </div>
                  </div>
                  <span className={cn('rounded-full px-2.5 py-1 text-[9px] font-black uppercase', p.tag === 'Active' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning')}>{p.tag}</span>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs font-bold text-content-muted">
                  <span className="flex items-center gap-1"><Flame className="h-3.5 w-3.5 text-warning" /> {p.calories} kcal</span>
                  <span className="flex items-center gap-1"><Beef className="h-3.5 w-3.5 text-error" /> {p.protein}g</span>
                  <span className="flex items-center gap-1"><Wheat className="h-3.5 w-3.5 text-warning" /> {p.carbs}g</span>
                  <span className="flex items-center gap-1"><Droplet className="h-3.5 w-3.5 text-sky-500" /> {p.fat}g</span>
                </div>
                <div className="mt-4 space-y-1.5">
                  <div className="flex items-center gap-2"><span className="w-14 text-[10px] font-black text-error">Protein</span><MiniBar value={proteinPct} color="bg-error" /><span className="text-[10px] font-bold text-content-faint">{proteinPct}%</span></div>
                  <div className="flex items-center gap-2"><span className="w-14 text-[10px] font-black text-warning">Carbs</span><MiniBar value={carbPct} color="bg-warning" /><span className="text-[10px] font-bold text-content-faint">{carbPct}%</span></div>
                  <div className="flex items-center gap-2"><span className="w-14 text-[10px] font-black text-sky-500">Fat</span><MiniBar value={fatPct} color="bg-sky-500" /><span className="text-[10px] font-bold text-content-faint">{fatPct}%</span></div>
                </div>
                <div className="mt-4 flex gap-2">
                  <button onClick={() => toast?.success('Meal plan opened')} className="flex-1 rounded-xl bg-cta-gradient py-2.5 text-xs font-black text-primary transition hover:-translate-y-0.5">Open plan</button>
                  <button onClick={() => toast?.success('Assigned to ' + (p.member === 'Unassigned' ? 'members' : p.member))} className="rounded-xl border border-border px-3 py-2.5 text-xs font-black text-content-muted transition hover:border-accent hover:text-content">Assign</button>
                </div>
              </Glass>
            </motion.div>
          )
        })}
      </div>

      {/* Recipe library */}
      <div>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-black text-content">Recipe library</h2>
            <p className="text-xs text-content-muted">Curated meals to drop into plans</p>
          </div>
          <div className="flex items-center gap-3">
            <SearchInput value={q} onChange={setQ} placeholder="Search recipes…" className="w-52" />
            <Segmented<'All' | 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Shake'> value={cat} onChange={setCat} options={(['All', 'Breakfast', 'Lunch', 'Dinner', 'Snack', 'Shake'] as const).map((c) => ({ id: c, label: c }))} />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {recipes.map((r, i) => (
            <motion.button key={r.id} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} onClick={() => setSelectedRecipe(r.id)}
              className="group overflow-hidden rounded-2xl border border-border bg-surface-subtle/60 text-left transition hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift dark:bg-surface-subtle">
              <div className="relative h-28 overflow-hidden">
                <img src={MEDIA.nutrition} alt={r.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="absolute right-3 top-3 rounded-full bg-accent px-2.5 py-1 text-[9px] font-black text-primary">{r.category}</span>
                <p className="absolute bottom-3 left-4 text-xs font-black text-white">{r.name}</p>
              </div>
              <div className="space-y-2 p-4">
                <div className="flex items-center justify-between text-[11px] font-bold text-content-muted">
                  <span className="flex items-center gap-1"><Flame className="h-3 w-3 text-warning" /> {r.calories} kcal</span>
                  <span className="flex items-center gap-1"><Beef className="h-3 w-3 text-error" /> {r.protein}g</span>
                  <span className="flex items-center gap-1"><Wheat className="h-3 w-3 text-warning" /> {r.carbs}g</span>
                  <span className="flex items-center gap-1"><Droplet className="h-3 w-3 text-sky-500" /> {r.fat}g</span>
                </div>
                <div className="flex flex-wrap gap-1">{r.tags.slice(0, 2).map((t) => <span key={t} className="rounded-full bg-surface-subtle px-2 py-0.5 text-[9px] font-bold text-content-faint dark:bg-surface-subtle">{t}</span>)}</div>
              </div>
            </motion.button>
          ))}
        </div>
        {recipes.length === 0 && <EmptyState title="No recipes found" />}
      </div>

      {/* Recipe drawer */}
      <Drawer open={!!recipe} onClose={() => setSelectedRecipe(null)}>
        {recipe && (
          <div>
            <div className="relative h-52">
              <img src={MEDIA.salad} alt={recipe.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-solid to-transparent" />
              <button onClick={() => setSelectedRecipe(null)} className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-black/50 text-white backdrop-blur" aria-label="Close"><X className="h-4 w-4" /></button>
              <div className="absolute bottom-4 left-5">
                <span className="rounded-full bg-accent px-3 py-1 text-[10px] font-black text-primary">{recipe.category}</span>
                <h3 className="mt-2 text-xl font-black text-white">{recipe.name}</h3>
              </div>
            </div>
            <div className="space-y-6 p-6">
              <div className="grid grid-cols-4 gap-2 text-center">
                {[{ label: 'kcal', value: recipe.calories, color: 'text-warning' }, { label: 'Protein', value: `${recipe.protein}g`, color: 'text-error' }, { label: 'Carbs', value: `${recipe.carbs}g`, color: 'text-warning' }, { label: 'Fat', value: `${recipe.fat}g`, color: 'text-sky-500' }].map((s) => (
                  <div key={s.label} className="rounded-xl bg-surface-subtle/60 py-3 dark:bg-surface-subtle">
                    <p className={cn('text-base font-black', s.color)}>{s.value}</p>
                    <p className="text-[9px] font-black uppercase tracking-wider text-content-faint">{s.label}</p>
                  </div>
                ))}
              </div>
              <div>
                <h4 className="mb-3 flex items-center gap-2 text-xs font-black text-content-muted"><CheckCircle2 className="h-4 w-4 text-accent-dark dark:text-accent" /> Ingredients</h4>
                <div className="flex flex-wrap gap-2">
                  {recipe.ingredients.map((ing) => <span key={ing} className="rounded-full border border-border px-3 py-1.5 text-xs font-bold text-content">{ing}</span>)}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">{recipe.tags.map((t) => <span key={t} className="rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent-dark dark:text-accent">#{t}</span>)}</div>
              <Button variant="accent" className="w-full" onClick={() => { toast?.success(`${recipe.name} added to a meal plan`); setSelectedRecipe(null) }}><Plus className="h-4 w-4" /> Add to meal plan</Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  )
}
