import { OptionGroup } from './OptionGroup'
import { QUESTIONS } from '@/lib/planFinderData'

interface Props {
  value: string
  onChange: (id: string) => void
}

export function ExperienceSelection({ value, onChange }: Props) {
  const q = QUESTIONS.find((x) => x.key === 'experience')!
  return <OptionGroup name="Training experience" options={q.options} value={value} onChange={onChange} />
}