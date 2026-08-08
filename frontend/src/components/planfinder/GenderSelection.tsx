import { OptionGroup } from './OptionGroup'
import { QUESTIONS } from '@/lib/planFinderData'

interface Props {
  value: string
  onChange: (id: string) => void
}

export function GenderSelection({ value, onChange }: Props) {
  const q = QUESTIONS.find((x) => x.key === 'gender')!
  return <OptionGroup name="Gender" options={q.options} value={value} onChange={onChange} />
}