import React from 'react'
import { useCanvasRef } from 'hooks/useCanvasRef'
import { IconQuick, IconAdd } from 'components/svgs'
import { Button } from 'components/Button'
import s from './Board.module.scss'

export default function Board() {
  const canvasRef = useCanvasRef()

  return (
    <>
      <canvas className={s.canvas} ref={canvasRef} />
      <section className={s.section}>
        <div className={s.container}>
          <div className={s.buttons}>
            <Button svg={<IconQuick />} />
            <Button svg={<IconAdd />} />
          </div>
        </div>
      </section>
    </>
  )
}
