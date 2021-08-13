import React, { useState, useRef } from 'react'
import { useCanvasRef } from 'hooks/useCanvasRef'
import { useNote, NOTE_ACTION } from 'hooks/useNote'
import { IconQuick, IconAdd } from 'components/Svgs'
import { Button } from 'components/Button'
import { Note } from 'components/Note'
import { INote } from 'libs/types'
import s from './Board.module.scss'

function Board() {
  const [isCreateMode, setCreateMode] = useState(false)
  const [isMouseClicked, setMouseClicked] = useState(false)
  const [notes, dispatchNote] = useNote([])
  const canvasRef = useCanvasRef()
  const boardRef = useRef<HTMLDivElement>(null)

  const handleOnClick = () => {
    setCreateMode(true)
  }
  const handleOnMouseDown = ({ clientX, clientY }: React.MouseEvent) => {
    if (isCreateMode) {
      setMouseClicked(true)
      dispatchNote({ type: NOTE_ACTION.CREATE, payload: { clientX, clientY } })
    }
  }
  const handleOnMouseMove = ({ clientX, clientY }: React.MouseEvent) => {
    isCreateMode && isMouseClicked && setNoteDimension(notes, { clientX, clientY, boardRef })
  }
  const handleOnMouseUp = () => {
    if (isCreateMode && isMouseClicked) {
      setCreateMode(false)
      setMouseClicked(false)
    }
  }
  const handleOnDragOver = (e: any) => {
    e.preventDefault()
  }

  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const [id, startClientX, startClientY] = e.dataTransfer.getData('drag').split(',')
    const left = Number(e.clientX) - Number(startClientX)
    const top = Number(e.clientY) - Number(startClientY)
    dispatchNote({ type: NOTE_ACTION.DRAG, payload: { left, top, id } })
    const activeEl = document.activeElement as HTMLElement
    activeEl.blur()
  }

  const setNoteDimension = (notes: INote[], { clientX, clientY, boardRef }: any) => {
    const length = notes.length
    const { x, y } = notes[length - 1].clientXY
    const note = boardRef.current.childNodes[length - 1]
    note.style.width = `${clientX - x}px`
    note.style.height = `${clientY - y}px`
  }

  return (
    <>
      <canvas className={s.canvas} ref={canvasRef} />
      <section className={s.section}>
        <div
          className={s.container}
          onMouseDown={handleOnMouseDown}
          onMouseMove={handleOnMouseMove}
          onMouseUp={handleOnMouseUp}
          onDrop={handleOnDrop}
          onDragOver={handleOnDragOver}
          ref={boardRef}
        >
          {notes.map((note) => (
            <Note key={note.id} {...note} dispatchNote={dispatchNote} isCreateMode={isCreateMode} />
          ))}
          <div className={s.buttons}>
            <Button svg={<IconQuick />} handleOnClick={handleOnClick} />
            <Button svg={<IconAdd />} handleOnClick={handleOnClick} />
          </div>
        </div>
      </section>
    </>
  )
}
export default Board
