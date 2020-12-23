import React from 'react'
import { render, screen, waitFor, act } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { useRouter } from 'next/router'

const mockedUseRouter = useRouter as jest.Mock<any>

import Index from '../pages/index'

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

describe('Index', () => {
  test('should display a countdown timer based on their query param', async () => {
    const mockRouterPush = jest.fn()
    mockedUseRouter.mockImplementation(() => ({
      query: mockRouterPush,
    }))
    render(<Index />)

    expect(screen.getByRole('heading')).toHaveTextContent('WE\'RE LAUNCHING SOON')

    await waitFor(() => expect(screen.getByTestId('seconds1-2')).toHaveTextContent('02'))
    expect(screen.getByTestId('minutes0-0')).toHaveTextContent('00')
    expect(screen.getByTestId('hours0-0')).toHaveTextContent('00')
    expect(screen.getByTestId('days1-1')).toHaveTextContent('01')

    await waitFor(() => expect(screen.getByTestId('seconds0-1')).toHaveTextContent('01'))
    expect(screen.getByTestId('minutes0-0')).toHaveTextContent('00')
    expect(screen.getByTestId('hours0-0')).toHaveTextContent('00')
    expect(screen.getByTestId('days1-1')).toHaveTextContent('01')

    await waitFor(() => expect(screen.getByTestId('seconds59-0')).toHaveTextContent('00'))
    expect(screen.getByTestId('minutes59-0')).toHaveTextContent('00')
    expect(screen.getByTestId('hours23-0')).toHaveTextContent('00')
    expect(screen.getByTestId('days0-1')).toHaveTextContent('01')

    await waitFor(() => expect(screen.getByTestId('seconds58-59')).toHaveTextContent('59'))
    expect(screen.getByTestId('minutes59-59')).toHaveTextContent('59')
    expect(screen.getByTestId('hours23-23')).toHaveTextContent('23')
    expect(screen.getByTestId('days0-0')).toHaveTextContent('00')
  })
})
