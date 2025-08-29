import type { InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement>

export function Input({ className = '', ...props }: Props) {
  const base = 'w-full px-4 py-3 border border-gray-200 bg-white text-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 font-light'
  return <input className={`${base} ${className}`} {...props} />
}
