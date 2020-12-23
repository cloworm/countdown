import { ReactElement, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { DateTime } from 'luxon'

import CountdownCard from './CountdownCard'
import useIsMounted from './hooks/useIsMounted'

// 3. save current & previous for each id (days, hours...) with each tick of the tock
// - every second, previous = current & current = new
// 1. give each CountdownCard a key = id-current-previous - dont do this maybe
// 2. send current & previous in to CountdownCard as props
// - only animate CountdownCard once & stop after animationComplete

interface CurrentPrevious {
  current: Countdown
  previous: Countdown
}

interface Countdown {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const getTimeLeft = (endDate: DateTime): Countdown => {
  const now = DateTime.local()
  const { days, hours, minutes, seconds } = endDate.diff(now, ['days', 'hours', 'minutes', 'seconds'])
  return {
    days: Math.trunc(days),
    hours: Math.trunc(hours),
    minutes: Math.trunc(minutes),
    seconds: Math.trunc(seconds)
  }
}

const useCountdown = (endDate: DateTime): CurrentPrevious => {
  const initial = getTimeLeft(endDate)
  const [previous, setPrevious] = useState<Countdown>(initial)
  const [current, setCurrent] = useState<Countdown>(initial)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPrevious(current)
      setCurrent(getTimeLeft(endDate))
    }, 1000)
    return () => clearInterval(timer)
  }, [current, endDate])

  return { previous, current }
}

const Countdown = (): ReactElement => {
  const isMounted = useIsMounted()
  const router = useRouter()
  const debugTime = useMemo(() => DateTime.local().plus({ days: 1, hours: 0, minutes: 0, seconds: 3 }), [])
  const { current, previous } = useCountdown(
    router.query?.date
      ? DateTime.fromISO(router.query.date)
      : debugTime
  )

  if (!isMounted) return <></>

  return (
    <div className="flex space-x-4">
      <CountdownCard id="DAYS" label="DAYS" current={current.days} previous={previous.days} />
      <CountdownCard id="HOURS" label="HOURS" current={current.hours} previous={previous.hours} />
      <CountdownCard id="MINUTES" label="MINUTES" current={current.minutes} previous={previous.minutes} />
      <CountdownCard id="SECONDS" label="SECONDS" current={current.seconds} previous={previous.seconds} />
    </div>
  )
}

export default Countdown
