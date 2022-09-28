type AttributeFiltersMenu<DataType> = {
  [K in keyof DataType]?: { label: string; value: string | number }[]
}

const parseAttributeValue = (value: string | number | boolean) => {
  return {
    label: value.toString(),
    value: typeof value === "boolean" ? Number(value) : value,
  }
}

/**
 * Function generates menu with specific filters based on values available in data
 * Supports object property @type { string | number | boolean}
 *  - object properties with different type are ignored
 */
export const createAttributeFiltersMenu = <DataType extends object>(
  data: DataType[],
  allowedAttributeKeys: (keyof DataType)[]
): AttributeFiltersMenu<DataType> => {
  const menu: AttributeFiltersMenu<DataType> = {}

  allowedAttributeKeys.forEach((key) => {
    const values = new Set<string | number | boolean>()

    data.forEach((item) => {
      if (
        typeof item[key] !== "string" &&
        typeof item[key] !== "number" &&
        typeof item[key] !== "boolean"
      )
        return

      values.add(item[key] as string | number | boolean)
    })

    menu[key] = Array.from(values).map(parseAttributeValue)
  })

  return menu
}
