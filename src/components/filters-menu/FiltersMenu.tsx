import React, { ChangeEventHandler, memo, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { movieListActions, movieListSelector } from "../../store"
import { createAttributeFiltersMenu } from "./util"
import { IMovie } from "../../services/api"
import styled from "styled-components"
import { SortFilter } from "../../store/movie-list/types"

const StyledFiltersMenu = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin: auto;
  width: 1000px;

  .col {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    label {
      width: 100%;
      height: 25px;
      margin: 5px;
      margin-left: 0;
      display: flex;
      justify-content: space-between;
      gap: 10px;
    }
  }

  select,
  option {
    text-transform: capitalize;
  }
`

const ATTRIBUTE_FILTER_KEYS: (keyof IMovie)[] = [
  "source",
  "isFeatured",
  "disabled",
]

const SORT_FILTER_KEYS = ["name"]

// Component provides filtering menu, saves filter options to the store
const FiltersMenu = memo(() => {
  const { filters, query } = useSelector(movieListSelector)
  const { data } = query

  const dispatch = useDispatch()

  const attributeFilters = useMemo(
    () => data && createAttributeFiltersMenu(data, ATTRIBUTE_FILTER_KEYS),
    [data]
  )

  const makeAttributeChangeHandler =
    (attribute: string): React.ChangeEventHandler<HTMLSelectElement> =>
    ({ target: { value } }) => {
      dispatch(movieListActions.setAttributeFilter({ attribute, value }))
    }

  const handleSortAttrChange: ChangeEventHandler<HTMLSelectElement> = ({
    target: { value },
  }) => {
    dispatch(
      movieListActions.setSortFilter({ attr: value, type: filters.sort.type })
    )
  }

  const handleSortTypeChange: ChangeEventHandler<HTMLSelectElement> = ({
    target: { value },
  }) => {
    dispatch(
      movieListActions.setSortFilter({
        attr: filters.sort.attr,
        type: value as SortFilter["type"],
      })
    )
  }

  const handleSearch: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    dispatch(movieListActions.setSearchFilter(value))
  }

  if (!attributeFilters) {
    return null
  }

  return (
    <StyledFiltersMenu>
      {/* Attribute selector filters */}
      <div className="col">
        <h3 className="col-title">Filters:</h3>
        {Object.keys(attributeFilters).map((key) => (
          <label htmlFor={key} key={key}>
            {key}
            <select
              name={key}
              value={filters.attributes[key]?.toString() || ""}
              onChange={makeAttributeChangeHandler(key)}
            >
              <option label="All" value={""} />
              {Array.from(
                attributeFilters[key as keyof typeof attributeFilters]!
              ).map((option, i) => (
                <option
                  key={`option-${option.label}`}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </select>
          </label>
        ))}
      </div>
      {/* Sorting */}
      <div className="col">
        <h3 className="col-title">Sort:</h3>
        {/* Attribute select */}
        <label htmlFor={"attr"}>
          Attribute:
          <select
            name={"attr"}
            value={filters.sort.attr || ""}
            onChange={handleSortAttrChange}
          >
            <option label={"No sorting"} value={""} />
            {SORT_FILTER_KEYS.map((attr) => (
              <option key={attr} label={attr} value={attr} />
            ))}
          </select>
        </label>
        {/* Sort type (direction) select */}
        <label htmlFor={"attr"}>
          Type:
          <select
            name={"attr"}
            value={filters.sort.type}
            onChange={handleSortTypeChange}
            disabled={filters.sort.attr === ""}
          >
            <option label={"Ascending"} value={"asc"} />
            <option label={"Descending"} value={"desc"} />
          </select>
        </label>
      </div>
      {/* Search */}
      <div className="col">
        <h3 className="col-title">Search:</h3>
        <label htmlFor="search">
          <input
            name={"search"}
            value={filters.search.value}
            onChange={handleSearch}
          />
        </label>
      </div>
    </StyledFiltersMenu>
  )
})

export default FiltersMenu
