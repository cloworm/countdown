import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { useRouter } from 'next/router'
import { DateTime } from 'luxon'

const mockedUseRouter = useRouter as jest.Mock<any>

import Index from '../pages/index'

describe('Index', () => {
  test('should display a countdown timer based on their query param', async () => {
    mockedUseRouter.mockImplementation(() => ({
      query: {},
    }))
    render(<Index />)

    expect(screen.getByRole('heading')).toHaveTextContent('WE’RE LAUNCHING SOON')

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

  test('should display a countdown timer based on their query param that uses the data query param', async () => {
    const testDate = DateTime.local().plus({ days: 7, hours: 3, minutes: 12, seconds: 2 }).toISO()
    mockedUseRouter.mockImplementation(() => ({
      query: {
        date: testDate
      },
    }))
    render(<Index />)

    expect(screen.getByRole('heading')).toHaveTextContent('WE’RE LAUNCHING SOON')

    await waitFor(() => expect(screen.getByTestId('seconds0-1')).toHaveTextContent('01'))
    expect(screen.getByTestId('minutes12-12')).toHaveTextContent('12')
    expect(screen.getByTestId('hours3-3')).toHaveTextContent('03')
    expect(screen.getByTestId('days7-7')).toHaveTextContent('07')

    await waitFor(() => expect(screen.getByTestId('seconds59-0')).toHaveTextContent('00'))
    expect(screen.getByTestId('minutes11-12')).toHaveTextContent('12')
    expect(screen.getByTestId('hours3-3')).toHaveTextContent('03')
    expect(screen.getByTestId('days7-7')).toHaveTextContent('07')

    await waitFor(() => expect(screen.getByTestId('seconds58-59')).toHaveTextContent('59'))
    expect(screen.getByTestId('minutes11-11')).toHaveTextContent('11')
    expect(screen.getByTestId('hours3-3')).toHaveTextContent('03')
    expect(screen.getByTestId('days7-7')).toHaveTextContent('07')
  })
})
