import type { ButtonHTMLAttributes } from 'react'

type Item = { key: string; label: string }

type Props = {
  value: string
  items: Item[]
  onChange: (value: string) => void
}

export function Tabs({ value, items, onChange }: Props) {
  return (
    <div>
      <div role="tablist" aria-label="Фильтры" className="flex gap-4 border-b border-gray-200">
        {items.map((it) => (
          <Tab
            key={it.key}
            aria-selected={value === it.key}
            onClick={() => onChange(it.key)}
          >
            {it.label}
          </Tab>
        ))}
      </div>
    </div>
  )
}

function Tab({ children, ariaSelected, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { ariaSelected?: boolean }) {
  const active = ariaSelected
  const base = 'relative -mb-px py-2 text-sm px-1 border-b-2 font-light'
  const styles = active
    ? 'border-blue-600 text-blue-700'
    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
  return (
    <button role="tab" aria-selected={active} className={`${base} ${styles}`} {...props}>
      {children}
    </button>
  )
}
