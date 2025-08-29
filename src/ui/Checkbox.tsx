import type { InputHTMLAttributes } from 'react'

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

export function Checkbox({ className = '', checked, onChange, ...props }: Props) {
  return (
    <label className={`inline-flex items-center justify-center w-8 h-8 ${className}`}>
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onChange}
        {...props}
      />
      <span className="flex items-center justify-center rounded-full bg-white h-7 w-7 border border-gray-300">
        {checked && (
          <svg
            className="h-5 w-5 text-teal-500"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </span>
    </label>
  )
}
