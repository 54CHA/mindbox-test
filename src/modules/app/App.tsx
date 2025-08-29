import { useEffect, useMemo, useReducer, useState } from 'react'
import { Button } from '../../ui/Button'
import { Checkbox } from '../../ui/Checkbox'
import { Input } from '../../ui/Input'
import { Tabs } from '../../ui/Tabs'

export type Todo = {
  id: string
  title: string
  completed: boolean
}

type Action =
  | { type: 'add'; title: string }
  | { type: 'toggle'; id: string }
  | { type: 'remove'; id: string }
  | { type: 'clearCompleted' }
  | { type: 'hydrate'; items: Todo[] }

function todosReducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'hydrate':
      return action.items
    case 'add':
      if (!action.title.trim()) return state
      const id = (typeof crypto !== 'undefined' && 'randomUUID' in crypto)
        ? (crypto as any).randomUUID()
        : Math.random().toString(36).slice(2)
      return [
        { id, title: action.title.trim(), completed: false },
        ...state,
      ]
    case 'toggle':
      return state.map((t) => (t.id === action.id ? { ...t, completed: !t.completed } : t))
    case 'remove':
      return state.filter((t) => t.id !== action.id)
    case 'clearCompleted':
      return state.filter((t) => !t.completed)
    default:
      return state
  }
}

type Filter = 'all' | 'active' | 'completed'

export function App() {
  const [todos, dispatch] = useReducer(todosReducer, [])
  const [filter, setFilter] = useState<Filter>('all')
  const [title, setTitle] = useState('')

  // hydrate from localStorage
  useEffect(() => {
    const raw = localStorage.getItem('todos')
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Todo[]
        dispatch({ type: 'hydrate', items: parsed })
      } catch {}
    }
  }, [])

  // persist
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const remaining = useMemo(() => todos.filter((t) => !t.completed).length, [todos])

  const visible = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((t) => !t.completed)
      case 'completed':
        return todos.filter((t) => t.completed)
      default:
        return todos
    }
  }, [todos, filter])

  const submit = () => {
    if (!title.trim()) return
    dispatch({ type: 'add', title })
    setTitle('')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20">
      <main className="w-full max-w-2xl">
        {/* Header */}
        <h1 className="text-8xl font-thin text-red-200 text-center mb-8">todos</h1>
        
        <section className="bg-white shadow-lg">
          {/* Main input */}
          <div className="relative flex items-center">
            {/* Decorative arrow */}
            <div className="absolute left-6 z-10 text-gray-300">
              <svg 
                className="w-8 h-8" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path 
                  fillRule="evenodd" 
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                  clipRule="evenodd" 
                />
              </svg>
            </div>
            <Input
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') submit()
              }}
              data-testid="new-todo-input"
              className="w-full text-2xl font-thin pl-20 pr-6 py-4 border-0 focus:ring-0 focus:outline-none placeholder:italic placeholder:text-gray-300"
            />
          </div>

          {/* Todo list */}
          {todos.length > 0 && (
            <>
              <ul className="border-t border-gray-200" data-testid="todo-list">
                {visible.map((t) => (
                  <li
                    key={t.id}
                    className="border-b border-gray-200 last:border-b-0"
                  >
                    <div className="flex items-center px-6 py-4">
                      <Checkbox
                        checked={t.completed}
                        onChange={() => dispatch({ type: 'toggle', id: t.id })}
                        aria-label={t.completed ? 'Отметить как невыполненную' : 'Отметить как выполненную'}
                        className="mr-4"
                      />
                      <span className={`flex-1 text-2xl font-light ${t.completed ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                        {t.title}
                      </span>
                      <button
                        onClick={() => dispatch({ type: 'remove', id: t.id })}
                        className="ml-4 text-gray-400 hover:text-gray-600 text-2xl opacity-0 hover:opacity-100 transition-opacity"
                        aria-label="Удалить"
                      >
                        ×
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Footer */}
              <div className="flex items-center justify-between px-6 py-3 text-sm text-gray-500 border-t border-gray-200 font-light">
                <div data-testid="remaining-count" className="font-light">
                  {remaining} items left
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setFilter('all')}
                    className={`px-2 py-1 font-light ${filter === 'all' ? 'border rounded-md border-red-200 bg-gray-50' : 'hover:underline'}`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilter('active')}
                    className={`px-2 py-1 font-light ${filter === 'active' ? 'border rounded-md border-red-200 bg-gray-50' : 'hover:underline'}`}
                  >
                    Active
                  </button>
                  <button
                    onClick={() => setFilter('completed')}
                    className={`px-2 py-1 font-light ${filter === 'completed' ? 'border rounded-md border-red-200 bg-gray-50' : 'hover:underline'}`}
                  >
                    Completed
                  </button>
                </div>

                <button
                  onClick={() => dispatch({ type: 'clearCompleted' })}
                  className="hover:underline font-light"
                  data-testid="clear-completed"
                >
                  Clear completed
                </button>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  )
}
