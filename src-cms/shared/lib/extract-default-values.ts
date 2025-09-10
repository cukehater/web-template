export const extractDefaultValues = (
  dbValues: Record<string, unknown> | null,
  initialValues: Record<string, unknown>,
  excludedFields: string[]
) => {
  if (!dbValues) {
    return Object.fromEntries(
      Object.entries(initialValues).filter(([key]) => !excludedFields.includes(key))
    )
  }

  const mergedValues = { ...initialValues, ...dbValues }

  return Object.fromEntries(
    Object.entries(mergedValues).filter(([key]) => !excludedFields.includes(key))
  )
}
