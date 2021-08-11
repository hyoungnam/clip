import React, { useRef, useEffect } from 'react'
import { debounce } from 'libs/utils'
import { CTX } from 'libs/constants'
export const useCanvasRef = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    handleCanvasResize(canvasRef)()
    window.addEventListener('resize', handleCanvasResize(canvasRef))
    return () => {
      window.removeEventListener('resize', handleCanvasResize(canvasRef))
    }
  }, [])

  return canvasRef
}

const handleCanvasResize = (canvasRef: React.RefObject<HTMLCanvasElement>) =>
  debounce(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    canvas && ctx && drawDotGrid(canvas, ctx)
  })

const drawDotGrid = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  ctx.fillStyle = CTX.rgba
  for (let x = CTX.pos; x <= window.innerWidth; x += CTX.space) {
    for (let y = CTX.pos; y <= window.innerHeight; y += CTX.space) {
      ctx.fillRect(x, y, CTX.rectDistance, CTX.rectDistance)
    }
  }
}
