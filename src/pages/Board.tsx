import React, { useState, useEffect, useRef } from 'react'
import { useCanvasRef } from 'hooks/useCanvasRef'
import { useNote, ACTION } from 'hooks/useNote'
import { IconQuick, IconAdd } from 'components/Svgs'
import { Button } from 'components/Button'
import Note from 'components/Note'
import { INote } from 'libs/types'
import s from './Board.module.scss'

function Board() {
  const [isCreateMode, setCreateMode] = useState(false)
  const [isMouseClicked, setMouseClicked] = useState(false)
  const [notes, dispatch] = useNote([])
  const canvasRef = useCanvasRef()
  const boardRef = useRef<any>(null)

  useEffect(() => {
    dispatch({ type: ACTION.READ })
  }, [])

  useEffect(() => {
    window.addEventListener('paste', handleOnPaste)
    return () => {
      window.removeEventListener('paste', handleOnPaste)
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
    isCreateMode && isMouseClicked && setNoteDimension(notes, { clientX, clientY, boardRef })
  }
  const handleOnMouseUp = () => {
    if (isCreateMode && isMouseClicked) {
      updateNote(notes, boardRef)
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

  const handleOnPaste = (e: any) => {
    if (document.activeElement?.tagName === 'BODY') {
      const content = e.clipboardData.getData('Text')
      console.log('e: ', e)
      dispatch({ type: ACTION.PASTE, payload: { content } })
    }
  }

  const setNoteDimension = (notes: INote[], { clientX, clientY, boardRef }: any) => {
    const length = notes.length
    const { x, y } = notes[length - 1].clientXY
    const note = boardRef.current.childNodes[length - 1]
    note.style.width = `${clientX - x}px`
    note.style.height = `${clientY - y}px`
  }
  const updateNote = (notes: INote[], boardRef: React.RefObject<HTMLDivElement>) => {
    const length = notes.length
    if (boardRef.current) {
      const note = boardRef.current.childNodes[length - 1] as HTMLElement
      const id = notes[length - 1].id
      const value = notes[length - 1].content
      const width = Number(note.style.width.slice(0, -2))
      const height = Number(note.style.height.slice(0, -2))
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
