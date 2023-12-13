"use client"

import { Dispatch, SetStateAction } from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

import { Categories } from "@/hooks/use-device-graph"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Checked = DropdownMenuCheckboxItemProps["checked"]

export function GraphFilter({
  categories,
  setCategories,
}: {
  categories: Categories
  setCategories: Dispatch<SetStateAction<Categories>>
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Filtrar sensores</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Sensores</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {Object.entries(categories).map((c) => {
          const key = c[0] as keyof typeof categories
          const value = c[1]
          return (
            <DropdownMenuCheckboxItem
              checked={value}
              onCheckedChange={() =>
                setCategories((prevState) => {
                  const updatedCategories = { ...prevState }
                  updatedCategories[key] = !value
                  return updatedCategories
                })
              }
            >
              {key}
            </DropdownMenuCheckboxItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
