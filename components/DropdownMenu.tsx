"use client"

import styles from './DropdownMenu.module.scss'
import * as React from "react"
import Button from "./Buttons"
import {
  DropdownMenu as ShadcnDropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button as ShadcnButton, ButtonProps } from "@/components/ui/button"

interface MyDropdownMenuProps {
  triggerText?: string
  label?: string
  items: Array<{ label: string; onClick?: () => void }>
  children?: React.ReactNode // For custom content
  triggerElement?: React.ReactNode // Custom trigger element
  buttonSize?: "large" | "medium" | "small" // Size for default Button trigger
}

export function DropdownMenu({
  triggerText = "Open Menu",
  label = "My Account",
  items,
  children,
  triggerElement,
  buttonSize = "small",
}: MyDropdownMenuProps) {
  // Map buttonSize to Button component variants or custom styles
  const sizeStyles: Record<"large" | "medium" | "small", string> = {
    large: "h-12 px-6 text-lg",
    medium: "h-10 px-4 text-base",
    small: "h-8 px-3 text-sm",
  }

  // Default trigger is a Button with size prop
  const defaultTrigger = (
    // <ShadcnButton variant="outline" className={sizeStyles[buttonSize]}>
    //   {triggerText}
    // </ShadcnButton>
    <Button
        buttonChildren={triggerText}
        buttonType="normal"
        buttonSize={buttonSize}
        name="my-dropdown-menu-btn"
        type="button"
        ariaLabel="My Dropdown Menu Button"
        autoFocus={false}
        disabled={false}
      />
  )

  return (
    

    <ShadcnDropdownMenu>
      <DropdownMenuTrigger asChild>
        {triggerElement || defaultTrigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent className={styles.dropdownMenuContent}>
        <DropdownMenuLabel className={styles.dropdownMenuLabel}>{label}</DropdownMenuLabel>
        {/* <DropdownMenuSeparator className={styles.dropdownMenuSeparator}/> */}
        {children || items?.map((item, index) => (
          <DropdownMenuItem key={index} onClick={item.onClick} className={styles.dropdownMenuItem}>
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </ShadcnDropdownMenu>
  )  
}