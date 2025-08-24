export const getCurrentTime = () => {
  return new Date().toTimeString().slice(0, 8)
}
