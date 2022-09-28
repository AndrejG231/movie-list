type AttributeFiltersMenu<DataType> = {
  [K in keyof DataType]?: Set<DataType[K]>
}

/**
 * Function generates menu with specific filters based on values available in data
 */
export const getAttributeFiltersMenu = <DataType extends object>(
  data: DataType[],
  allowedAttributeKeys: (keyof DataType)[]
): AttributeFiltersMenu<DataType> => {
  const menu: AttributeFiltersMenu<DataType> = {}

  data.forEach((item) => {
    allowedAttributeKeys.forEach((key) => {
      if (!menu[key]) {
        menu[key] = new Set()
      }

      menu[key]!.add(item[key])
    })
  })

  return menu
}

/**
 * Returns list of sorting options from available attributes
 */
export const getSortOptions = (attributes: string[]) =>
  attributes.map((value) => ({}))
