import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { App } from './App'

function setup() {
  // Ensure clean localStorage per test
  localStorage.clear()
  const ui = render(<App />)
  const input = screen.getByTestId('new-todo-input') as HTMLInputElement
  return { ui, input }
}

describe('ToDo App', () => {
  beforeEach(() => localStorage.clear())

  it('adds new tasks and updates remaining count', async () => {
    const user = userEvent.setup()
    const { input } = setup()
    await user.type(input, 'Купить молоко{Enter}')

    expect(screen.getByText('Купить молоко')).toBeInTheDocument()
    expect(screen.getByTestId('remaining-count').textContent).toContain('1 items left')
  })

  it('toggles completion and filters correctly', async () => {
    const user = userEvent.setup()
    const { input } = setup()
    // Add two tasks
    await user.type(input, 'A{Enter}')
    await user.type(input, 'B{Enter}')

    // Complete task "A" (target the row, not by order)
    const rowA = screen.getByText('A').closest('li')!
    await user.click(within(rowA).getByRole('checkbox'))
    expect(screen.getByTestId('remaining-count').textContent).toContain('1 items left')

    // Filter completed
    await user.click(screen.getByRole('button', { name: 'Completed' }))
    expect(screen.getByText('A')).toBeInTheDocument()
    expect(screen.queryByText('B')).not.toBeInTheDocument()

    // Filter active
    await user.click(screen.getByRole('button', { name: 'Active' }))
    expect(screen.getByText('B')).toBeInTheDocument()
    expect(screen.queryByText('A')).not.toBeInTheDocument()
  })

  it('clears completed tasks', async () => {
    const user = userEvent.setup()
    const { input } = setup()
    await user.type(input, 'Done{Enter}')
    const cb = screen.getAllByRole('checkbox')[0]
    await user.click(cb)
    await user.click(screen.getByTestId('clear-completed'))
    expect(screen.queryByText('Done')).not.toBeInTheDocument()
  })
})
