"use client"

import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useProductPurchase } from "./ProductPurchaseContext"

const MIN_NOTICE_DAYS = 5

export function ProductDatePicker() {
  const { date, setDate } = useProductPurchase()
  const earliestDate = addDays(new Date(), MIN_NOTICE_DAYS)

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            data-empty={!date}
            className="justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
          />
        }
      >
        <CalendarIcon />
        {date ? format(date, "PPP") : <span>Select a date</span>}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={{ before: earliestDate }}
        />
      </PopoverContent>
    </Popover>
  )
}
