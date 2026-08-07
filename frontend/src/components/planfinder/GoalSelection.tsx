import { OptionGroup } from './OptionGroup'
import { QUESTIONS } from '@/lib/planFinderData'

interface Props {
  value: string
  onChange: (id: string) => void
}

export function GoalSelection({ value, onChange }: Props) {
  const q = QUESTIONS.find((x) => x.key === 'goal')!
  return <OptionGroup name="Primary fitness goal" options={q.options} value={value} onChange={onChange} />
}