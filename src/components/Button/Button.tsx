import React from 'react'
import s from './Button.module.scss'

interface IButton {
  svg?: React.ReactElement
}

function Button({ svg }: IButton) {
  return <button className={s.button}>{svg}</button>
}

export { Button }
