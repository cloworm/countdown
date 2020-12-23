import { ReactElement, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { DateTime } from 'luxon'

import CountdownCard from './CountdownCard'
import useIsMounted from './hooks/useIsMounted'

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

const useCountdown = (endDate: DateTime): Countdown => {
  const [countdown, setCountdown] = useState<Countdown>(getTimeLeft(endDate))

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(getTimeLeft(endDate))
    }, 1000)
    return () => clearInterval(timer)
  }, [setCountdown, endDate])

  return countdown
}

const Countdown = (): ReactElement => {
  const isMounted = useIsMounted()
  const router = useRouter()
  const debugTime = useMemo(() => DateTime.local().plus({ days: 1, hours: 0, minutes: 0, seconds: 3 }), [])
  const { days, hours, minutes, seconds } = useCountdown(
    router.query?.date
      ? DateTime.fromISO(router.query.date)
      : debugTime
  )

  if (!isMounted) return <></>

  return (
    <div className="flex space-x-4">
      <CountdownCard id="DAYS" label="DAYS">{days}</CountdownCard>
      <CountdownCard id="HOURS" label="HOURS">{hours}</CountdownCard>
      <CountdownCard id="MINUTES" label="MINUTES">{minutes}</CountdownCard>
      <CountdownCard id="SECONDS" label="SECONDS">{seconds}</CountdownCard>
    </div>
  )
}

export default Countdown
