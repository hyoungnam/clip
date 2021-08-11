import React from 'react'
import { useCanvasRef } from 'hooks/useCanvasRef'
import s from './board.module.scss'

export default function Board() {
  const canvasRef = useCanvasRef()

  return (
    <>
      <canvas className={s.canvas} ref={canvasRef} />
      <section className={s.section}>
        <div className={s.container}>
          <span>card</span>
        </div>
      </section>
    </>
  )
}
