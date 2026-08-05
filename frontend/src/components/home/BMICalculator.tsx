import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Scale, Ruler, User, Cake } from 'lucide-react'
import { bmi, bmiCategory, bmr } from '@/lib/utils'
import { SectionHeading, Progress, Badge } from '@/components/ui'
import { Reveal } from '@/components/motion'

const GENDERS = ['Male', 'Female'] as const

export function BMICalculator() {
  const [weight, setWeight] = useState(75)
  const [height, setHeight] = useState(175)
  const [age, setAge] = useState(28)
  const [gender, setGender] = useState<(typeof GENDERS)[number]>('Male')

  const result = useMemo(() => {
    const value = bmi(weight, height)
    const cat = bmiCategory(value)
    const calories = bmr({ weightKg: weight, heightCm: height, age, male: gender === 'Male' })
    const pct = Math.min(100, Math.max(0, ((value - 12) / (40 - 12)) * 100))
    return { value, ...cat, calories, pct }
  }, [weight, height, age, gender])

  return (
    <section id="bmi" className="relative overflow-hidden bg-surface-subtle/50 py-24 lg:py-32">
      <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-accent/10 blur-[120px]" />
      <div className="container-shell relative">
        <SectionHeading
          eyebrow="Free tools"
          title={<>Know your numbers in <span className="text-gradient-accent">10 seconds</span></>}
          description="Calculate your BMI, daily calorie target and see where you stand. Free for everyone."
        />

        <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-2">
          <Reveal dir="right">
            <div className="rounded-3xl border border-border bg-surface-subtle/70 p-8 shadow-card dark:bg-surface-subtle">
              <div className="mb-8 grid grid-cols-2 gap-3">
                {GENDERS.map((g) => (
                  <button
                    key={g}
                    onClick={() => setGender(g)}
                    className={`flex items-center justify-center gap-2 rounded-xl border py-3.5 text-sm font-bold transition-all duration-300 ${
                      gender === g
                        ? 'border-accent bg-accent/15 text-primary shadow-glow dark:text-accent'
                        : 'border-border text-content-muted hover:border-accent/40'
                    }`}
                  >
                    <User className="h-4 w-4" /> {g}
                  </button>
                ))}
              </div>

              <SliderField icon={Scale} label="Weight" value={weight} unit="kg" min={35} max={180} onChange={setWeight} />
              <SliderField icon={Ruler} label="Height" value={height} unit="cm" min={130} max={220} onChange={setHeight} />
              <SliderField icon={Cake} label="Age" value={age} unit="yrs" min={14} max={90} onChange={setAge} />
            </div>
          </Reveal>

          <Reveal dir="left">
            <div className="flex h-full flex-col rounded-3xl bg-primary p-8 text-white shadow-lift">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold uppercase tracking-widest text-white/50">Your BMI</p>
                <Badge variant="accent">{result.label}</Badge>
              </div>

              <motion.div
                key={Math.round(result.value * 10)}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                className="my-6 text-center"
              >
                <p className="text-7xl font-black tracking-tight">
                  {result.value.toFixed(1)}
                </p>
                <p className="mt-1 text-sm text-white/50">kg/m²</p>
              </motion.div>

              <Progress value={result.pct} className="h-3 bg-white/10" />

              <div className="mt-2 flex justify-between text-[11px] font-bold text-white/40">
                <span>18.5</span><span>25</span><span>30</span><span>40</span>
              </div>

              <div className="mt-8 space-y-3 border-t border-white/10 pt-6 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Category</span>
                  <span className="font-black" style={{ color: result.color }}>{result.label}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Daily calorie target</span>
                  <span className="font-black text-accent">{Math.round(result.calories).toLocaleString()} kcal</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Ideal weight range</span>
                  <span className="font-black text-white">
                    {((18.5 * (height / 100) ** 2).toFixed(0))}–{((24.9 * (height / 100) ** 2).toFixed(0))} kg
                  </span>
                </div>
              </div>

              <p className="mt-auto pt-6 text-xs leading-relaxed text-white/40">
                {result.value < 18.5
                  ? 'Underweight — a focus on muscle gain and calorie surplus would move you forward.'
                  : result.value < 25
                    ? 'Healthy range — body recomposition or targeted performance goals next.'
                    : result.value < 30
                      ? 'Overweight — a sustainable fat loss program with strength training works best.'
                      : 'Obese — let’s start with a doctor-approved, sustainable fat loss plan.'}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function SliderField({
  icon: Icon,
  label,
  value,
  unit,
  min,
  max,
  onChange,
}: {
  icon: typeof Scale
  label: string
  value: number
  unit: string
  min: number
  max: number
  onChange: (v: number) => void
}) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div className="mb-6 last:mb-0">
      <div className="mb-3 flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm font-bold text-content">
          <Icon className="h-4 w-4 text-accent-dark dark:text-accent" /> {label}
        </span>
        <span className="rounded-full border border-border px-3 py-1 text-sm font-black text-content">
          {value} <span className="text-xs font-semibold text-content-faint">{unit}</span>
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-border"
        style={{
          background: `linear-gradient(90deg, #7CFF4F ${pct}%, #EAEAEA ${pct}%)`,
        }}
      />
    </div>
  )
}
