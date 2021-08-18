import React, { Component, ReactNode, ErrorInfo } from 'react'
import { IconAlert } from 'components/Svgs'
import s from './ErrorBoundary.module.scss'

interface IProps {
  children: ReactNode
}

interface IState {
  error: Error
  errorInfo: ErrorInfo
}

class ErrorBoundary extends Component<IProps, IState> {
  state = {
    error: null as unknown as Error,
    errorInfo: null as unknown as ErrorInfo,
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ error, errorInfo })
  }

  render() {
    if (this.state.error)
      return (
        <section className={s.section}>
          <div className={s.icon}>
            <IconAlert />
          </div>
          <h1>Message: {this.state.error.message}</h1>
        </section>
      )
    return this.props.children
  }
}
export default ErrorBoundary
