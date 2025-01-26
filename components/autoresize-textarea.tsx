"use client"

import { cn } from "@/lib/utils"
import React, { useRef, useEffect, type TextareaHTMLAttributes, forwardRef, useImperativeHandle } from "react"

interface AutoResizeTextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "onChange"> {
  value: string
  onChange: (value: string) => void
}

export interface AutoResizeTextareaRef {
  focus: () => void
}

export const AutoResizeTextarea = forwardRef<AutoResizeTextareaRef, AutoResizeTextareaProps>(
  ({ className, value, onChange, ...props }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useImperativeHandle(ref, () => ({
      focus: () => {
        textareaRef.current?.focus()
      }
    }))

    const resizeTextarea = () => {
      const textarea = textareaRef.current
      if (textarea) {
        textarea.style.height = "auto"
        textarea.style.height = `${textarea.scrollHeight}px`
      }
    }

    useEffect(() => {
      resizeTextarea()
    }, [value])

    return (
      <textarea
        value={value}
        ref={textareaRef}
        rows={1}
        onChange={(e) => {
          onChange(e.target.value)
          resizeTextarea()
        }}
        className={cn("resize-none min-h-4 max-h-80", className)}
        {...props}
      />
    )
  }
)

