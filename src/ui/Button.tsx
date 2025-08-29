import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
}

export function Button({ variant = 'primary', children, className = '', ...props }: PropsWithChildren<Props>) {
  const base = 'inline-flex items-center justify-center h-10 px-4 text-sm font-light border focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-gray-400 active:translate-y-px select-none'
  const styles = {
    primary: 'bg-gray-600 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-700',
    secondary: 'bg-gray-100 text-gray-900 border-gray-200 hover:bg-gray-200',
    ghost: 'bg-transparent text-gray-600 border-transparent hover:bg-gray-100',
  }[variant]
  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  )
}
