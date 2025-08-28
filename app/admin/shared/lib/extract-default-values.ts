export const extractDefaultValues = (
  dbValues: Record<string, unknown> | null,
  initialValues: Record<string, unknown>,
  excludedFields: string[],
) => {
  return Object.fromEntries(
    Object.entries(dbValues || initialValues).filter(
      ([key]) => !excludedFields.includes(key),
    ),
  )
}
