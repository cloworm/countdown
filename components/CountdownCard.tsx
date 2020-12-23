import { ReactElement, useEffect, useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

const usePrevious = (currentValue: number) => {
  const previousValue = useRef(0)
  useEffect(() => {
    previousValue.current = currentValue
  }, [currentValue])
  return previousValue.current
}

const padStart = (number: number): string => {
  return number.toString().padStart(2, '0')
}

const CountdownCard = ({ id, label, children }: { id: string, label: string, children: number }): ReactElement => {
  const [currentNumber, setCurrentNumber] = useState<number>(0)
  const [animate, setAnimate] = useState<boolean>(false)
  const previousChildren = usePrevious(currentNumber)

  const checkShouldAnimate = useCallback(() => {
    if (id === 'HOURS') {
      console.log('animation complete')
    }
    // console.log('children', currentNumber, 'previousChildren', previousChildren)
    // if (currentNumber === previousChildren) {
    // setAnimate(false)
    // }
  }, [id])

  const onStart = useCallback(() => {
    if (id === 'HOURS') {
      console.log('animation starting')
    }
    // console.log('children', currentNumber, 'previousChildren', previousChildren)
    // if (currentNumber === previousChildren) {
    // setAnimate(false)
    // }
  }, [id])

  useEffect(() => {
    if (typeof previousChildren === 'undefined') return

    if (id === 'HOURS') {
      console.table({ id, children, previousChildren, animate: children !== previousChildren })
    }

    const newAnimate = children !== previousChildren
    if (newAnimate) setAnimate(newAnimate)
  }, [id, children, previousChildren, setAnimate])

  useEffect(() => {
    setCurrentNumber(children)
  }, [children])

  return (
    <div>
      <div className="shadow-xl relative">

        {/* Top Half Static */}
        <div
          className="relative rounded-t-lg h-20 w-44 overflow-hidden brightness-90"
        >
          <p className="absolute top-8 left-8 text-theme_softRed text-8xl font-bold">
            {padStart(currentNumber)}
          </p>
          <svg width="11rem" height="5rem">
            <mask id={`${id}-m`} fill="#fff">
              <rect id={`${id}-r`} width="11rem" height="5rem"/>
              <circle r="15" fill="#000" cx="0" cy="5rem" />
              <circle r="15" fill="#000" cx="11rem" cy="5rem" />
            </mask>
            <use href={`#${id}-r`} fill="hsl(236, 21%, 26%)" mask={`url(#${id}-m)`} />
          </svg>
        </div>

        {/* Bottom Half Static */}
        <div
          className="relative rounded-b-lg h-20 w-44 overflow-hidden"
        >
          <p className="absolute bottom-8 left-8 text-theme_softRed text-8xl font-bold">
            {padStart(previousChildren)}
          </p>
          <svg width="11rem" height="5rem">
            <mask id={`${id}-m2`} fill="#fff">
              <rect id={`${id}-r2`} width="11rem" height="5rem"/>
              <circle r="15" fill="#000" cx="0" cy="0" />
              <circle r="15" fill="#000" cx="11rem" cy="0" />
            </mask>
            <use href={`#${id}-r2`} fill="hsl(236, 21%, 26%)" mask={`url(#${id}-m2)`} />
          </svg>
        </div>

        <p className="text-center text-theme_grayishBlue text-lg font-bold tracking-widest pt-8">
          {label}
        </p>

        { animate || currentNumber !== children ?
          <>
            <motion.div
              className="absolute top-0 left-0 rounded-t-lg h-20 w-44 overflow-hidden brightness-90 origin-bottom backface-hidden"
              animate={{
                rotateX: [0, -180]
              }}
              onAnimationStart={onStart}
              onAnimationComplete={checkShouldAnimate}
              transition={{
                duration: 1
              }}
            >
              <div className="relative">
                <p className="absolute top-8 left-8 text-theme_softRed text-8xl font-bold">
                  {padStart(previousChildren)}
                </p>
                <svg width="11rem" height="5rem">
                  <mask id={`${id}-m`} fill="#fff">
                    <rect id={`${id}-r`} width="11rem" height="5rem"/>
                    <circle r="15" fill="#000" cx="0" cy="5rem" />
                    <circle r="15" fill="#000" cx="11rem" cy="5rem" />
                  </mask>
                  <use href={`#${id}-r`} fill="hsl(236, 21%, 26%)" mask={`url(#${id}-m)`} />
                </svg>
              </div>
            </motion.div>

            <motion.div
              className="absolute top-20 left-0 rounded-b-lg h-20 w-44 overflow-hidden origin-top backface-hidden"
              animate={{
                rotateX: [180, 0]
              }}
              transition={{
                repeat: Infinity,
                duration: 1
              }}
            >
              <div className="relative">
                <p className="absolute bottom-8 left-8 text-theme_softRed text-8xl font-bold">
                  {padStart(currentNumber)}
                </p>
                <svg width="11rem" height="5rem">
                  <mask id={`${id}-m2`} fill="#fff">
                    <rect id={`${id}-r2`} width="11rem" height="5rem"/>
                    <circle r="15" fill="#000" cx="0" cy="0" />
                    <circle r="15" fill="#000" cx="11rem" cy="0" />
                  </mask>
                  <use href={`#${id}-r2`} fill="hsl(236, 21%, 26%)" mask={`url(#${id}-m2)`} />
                </svg>
              </div>
            </motion.div>
          </>
          : null
        }


      </div>
    </div>
  )
}

export default CountdownCard
