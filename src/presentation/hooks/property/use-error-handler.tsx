type CallBackType = (error: Error) => void
type ResultType = CallBackType

export const useErrorHandler = (callback: CallBackType): ResultType => {
  return (error: Error): void => {
    callback(error)
  }
}
