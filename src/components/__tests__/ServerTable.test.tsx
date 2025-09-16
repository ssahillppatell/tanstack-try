import { describe, it, expect } from 'vitest'
import { render, screen, within, fireEvent } from '@testing-library/react'
import ServerTable from '../../components/ServerTable'
import type { Server } from '../../types/server'

const sample: Server[] = [
  { id: '1', name: 'Alpha', location: 'NYC', health: 'healthy', ip: '10.0.0.1', volume: 1500, createdAt: '2024-01-01T00:00:00.000Z' },
  { id: '2', name: 'Beta', location: 'SF', health: 'error', ip: '10.0.0.2', volume: 3000, createdAt: '2024-01-02T00:00:00.000Z' },
  { id: '3', name: 'Gamma', location: 'LDN', health: 'disabled', ip: '10.0.0.3', volume: 4500, createdAt: '2024-01-03T00:00:00.000Z' },
  { id: '4', name: 'Delta', location: 'NYC', health: 'healthy', ip: '10.0.0.4', volume: 2700, createdAt: '2024-01-04T00:00:00.000Z' },
  { id: '5', name: 'Omega', location: 'LDN', health: 'error', ip: '10.0.0.5', volume: 1800, createdAt: '2024-01-05T00:00:00.000Z' },
]

function getColumnHeader(name: string) {
  return screen.getByRole('columnheader', { name: new RegExp(name, 'i') })
}

function getBodyRows() {
  const body = document.querySelector('tbody') as HTMLTableSectionElement | null
  if (!body) throw new Error('tbody not found')
  return Array.from(body.querySelectorAll('tr'))
}

describe('ServerTable filters', () => {
  it('filters by Name text input', async () => {
    render(<ServerTable data={sample} />)

    expect(getBodyRows().length).toBe(sample.length)

    const nameHeader = getColumnHeader('Name')
    const nameInput = within(nameHeader).getByPlaceholderText('Filter...') as HTMLInputElement

    fireEvent.input(nameInput, { target: { value: 'Gamma' } })

    const rows = getBodyRows()
    expect(rows.length).toBe(1)
    expect(rows[0]).toHaveTextContent('Gamma')
  })

  it('filters by Health select', async () => {
    render(<ServerTable data={sample} />)

    const healthHeader = getColumnHeader('Health')
    const select = within(healthHeader).getByRole('combobox') as HTMLSelectElement

    fireEvent.change(select, { target: { value: 'error' } })

    const rows = getBodyRows()
    expect(rows.length).toBe(2)
    rows.forEach((row) => expect(row).toHaveTextContent(/error/i))
  })

  it('filters by Volume min/max inputs', async () => {
    render(<ServerTable data={sample} />)

    const volumeHeader = getColumnHeader('Volume')
    const minInput = within(volumeHeader).getByPlaceholderText('Min') as HTMLInputElement
    const maxInput = within(volumeHeader).getByPlaceholderText('Max') as HTMLInputElement

    fireEvent.input(minInput, { target: { value: '2000' } })
    fireEvent.input(maxInput, { target: { value: '3500' } })
    fireEvent.change(minInput, { target: { value: '2000' } })
    fireEvent.change(maxInput, { target: { value: '3500' } })

    const rows = getBodyRows()
    expect(rows.length).toBe(2)
    expect(rows.some((r) => /2700/.test(r.textContent || ''))).toBe(true)
    expect(rows.some((r) => /3000/.test(r.textContent || ''))).toBe(true)
  })
})
