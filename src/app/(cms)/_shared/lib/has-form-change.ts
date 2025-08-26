export function hasFormChange(
  watchedValues: Record<string, unknown>,
  defaultValues: Record<string, unknown>,
) {
  if (JSON.stringify(watchedValues) !== JSON.stringify(defaultValues)) {
    return true
  }

  return false
}
