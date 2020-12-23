import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Index from '../pages/index'

describe('Index', () => {
  test('should display a countdown timer based on their query param', async () => {
    render(<Index />)

    expect(screen.getByRole('h1')).toHaveTextContent('WE&apos;RE LAUNCHING SOON')
    expect(screen.getByRole('p')).toHaveTextContent('00')
  })
})
