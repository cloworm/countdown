import { ReactElement } from 'react'
import { motion } from 'framer-motion'

const padStart = (number: number): string => {
  return number.toString().padStart(2, '0')
}

const CountdownCard = ({ id, label, current, previous }: { id: string, label: string, current: number, previous: number }): ReactElement => {
  return (
    <div>
      <div className="shadow-xl relative">

        {/* Top Half Static */}
        <div
          className="relative rounded-t-lg h-20 w-44 overflow-hidden brightness-90"
        >
          <p className="absolute top-8 left-8 text-theme_softRed text-8xl font-bold">
            {padStart(current)}
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
            {padStart(previous)}
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

        { previous !== current ?
          <>
            <motion.div
              className="absolute top-0 left-0 rounded-t-lg h-20 w-44 overflow-hidden brightness-90 origin-bottom backface-hidden"
              animate={{
                rotateX: [0, -180]
              }}
              transition={{
                duration: 1
              }}
            >
              <div className="relative">
                <p className="absolute top-8 left-8 text-theme_softRed text-8xl font-bold">
                  {padStart(previous)}
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
                  {padStart(current)}
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
