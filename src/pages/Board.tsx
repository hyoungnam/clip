import React, { useState, useEffect, useRef } from 'react'
import { useCanvasRef } from 'hooks/useCanvasRef'
import { useNote, ACTION } from 'hooks/useNote'
import { IconQuick, IconAdd } from 'components/Svgs'
import { Button } from 'components/Button'
import Note from 'components/Note'
import s from './Board.module.scss'

function Board() {
  const [isCreateMode, setCreateMode] = useState(false)
  const [isMouseClicked, setMouseClicked] = useState(false)
  const [notes, dispatch] = useNote([])
  const canvasRef = useCanvasRef()
  const boardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    dispatch({ type: ACTION.READ })
  }, [])

  useEffect(() => {
    document.addEventListener('paste', handleOnPaste)
    return () => {
      document.removeEventListener('paste', handleOnPaste)
    }
  }, [notes])

  const handleOnClickQuick = () => {
    dispatch({ type: ACTION.CREATE_QUICK })
  }

  const handleOnClick = () => {
    setCreateMode(true)
  }

  const handleOnMouseDown = ({ clientX, clientY }: React.MouseEvent) => {
    if (isCreateMode) {
      setMouseClicked(true)
      dispatch({ type: ACTION.CREATE, payload: { clientX, clientY } })
    }
  }
  const handleOnMouseMove = ({ clientX, clientY }: React.MouseEvent) => {
    isCreateMode && isMouseClicked && setNoteDimension({ clientX, clientY, boardRef })
  }
  const handleOnMouseUp = () => {
    if (isCreateMode && isMouseClicked) {
      updateNote()
      setCreateMode(false)
      setMouseClicked(false)
    }
  }
  const handleOnDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const [id, startClientX, startClientY] = e.dataTransfer.getData('drag').split(',')
    const left = Number(e.clientX) - Number(startClientX)
    const top = Number(e.clientY) - Number(startClientY)
    dispatch({ type: ACTION.DRAG, payload: { left, top, id } })
  }

  const handleOnPaste = (e: globalThis.ClipboardEvent) => {
    if (document.activeElement?.tagName === 'BODY' && e.clipboardData) {
      const content = e.clipboardData.getData('Text')
      dispatch({ type: ACTION.PASTE, payload: { content } })
    }
  }

  const setNoteDimension = ({
    clientX,
    clientY,
    boardRef,
  }: {
    clientX: number
    clientY: number
    boardRef: React.RefObject<HTMLDivElement>
  }) => {
    const length = notes.length
    const { x, y } = notes[length - 1].clientXY
    if (boardRef.current) {
      const note = boardRef.current.childNodes[length - 1] as HTMLElement
      note.style.width = `${clientX - x}px`
      note.style.height = `${clientY - y}px`
    }
  }

  const updateNote = () => {
    const length = notes.length
    if (boardRef.current) {
      const note = boardRef.current.childNodes[length - 1] as HTMLElement
      const id = notes[length - 1].id
      const value = notes[length - 1].content
      let width = Number(note.style.width.slice(0, -2))
      let height = Number(note.style.height.slice(0, -2))
      if (isMouseClicked && width < 72 && height < 72) {
        width = 80
        height = 80
      }
      dispatch({ type: ACTION.UPDATE, payload: { id, value, width, height } })
    }
  }

  return (
    <>
      <canvas className={s.canvas} ref={canvasRef} />

      <section className={s.section}>
        <div
          className={`${s.container} ${isCreateMode ? s.crosshair : ''}`}
          onMouseDown={handleOnMouseDown}
          onMouseMove={handleOnMouseMove}
          onMouseUp={handleOnMouseUp}
          onDrop={handleOnDrop}
          onDragOver={handleOnDragOver}
          ref={boardRef}
        >
          {notes.map((note) => (
            <Note key={note.id} {...note} dispatch={dispatch} isCreateMode={isCreateMode} />
          ))}
          <div className={s.buttons}>
            <Button svg={<IconQuick />} handleOnClick={handleOnClickQuick} />
            <Button svg={<IconAdd />} handleOnClick={handleOnClick} />
          </div>
        </div>
      </section>
    </>
  )
}
export default Board
