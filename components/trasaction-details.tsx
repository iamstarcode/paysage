"use client"

import { ReactNode, useRef, useState } from "react"
import * as React from "react"
import * as Dialog from "@radix-ui/react-dialog"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import {
  CheckIcon,
  MoreHorizontal,
  PencilIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Props = {
  triggerChildren: ReactNode
  children: ReactNode
  onSelect: () => void
  onOpenChange: (open: boolean) => void
}

const DialogItem = ({
  triggerChildren,
  children,
  onSelect,
  onOpenChange,
}: Props) => {
  return (
    <Dialog.Root onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          className="p-3"
          onSelect={(event) => {
            event.preventDefault()
            onSelect && onSelect()
          }}
        >
          {triggerChildren}
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogPortal>
        <DialogContent>
          {children}
          <DialogClose asChild>
            <button className="IconButton" aria-label="Close">
              <XIcon />
            </button>
          </DialogClose>
        </DialogContent>
      </DialogPortal>
    </Dialog.Root>
  )
}
//export default DialogItem

export default DropdownWithDialogItemsSolution2
function DropdownWithDialogItemsSolution2() {
  const [dropdownOpen, setDropdownOpen] = React.useState(false)
  const [hasOpenDialog, setHasOpenDialog] = React.useState(false)
  const dropdownTriggerRef = React.useRef(null)
  const focusRef = React.useRef(null)

  function handleDialogItemSelect() {
    focusRef.current = dropdownTriggerRef.current
  }

  function handleDialogItemOpenChange(
    open: boolean | ((prevState: boolean) => boolean)
  ) {
    setHasOpenDialog(open)
    if (open === false) {
      setDropdownOpen(false)
    }
  }

  return (
    <DropdownMenu.Root open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenu.Trigger asChild>
        <button className="Button violet" ref={dropdownTriggerRef}>
          Actions
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        className="DropdownMenuContent"
        sideOffset={5}
        hidden={hasOpenDialog}
        onCloseAutoFocus={(event) => {
          if (focusRef.current) {
            focusRef.current?.focus()
            focusRef.current = null
            event.preventDefault()
          }
        }}
      >
        <DropdownMenu.Group>
          <DropdownMenu.Label className="DropdownMenuLabel">
            Items with dialog
          </DropdownMenu.Label>
          <DialogItem
            triggerChildren="Edit"
            onSelect={handleDialogItemSelect}
            onOpenChange={handleDialogItemOpenChange}
          >
            <Dialog.Title className="DialogTitle">Edit</Dialog.Title>
            <Dialog.Description className="DialogDescription">
              Edit this record below.
            </Dialog.Description>
            <p>…</p>
          </DialogItem>

          <DialogItem
            triggerChildren="Delete"
            onSelect={handleDialogItemSelect}
            onOpenChange={handleDialogItemOpenChange}
          >
            <Dialog.Title className="DialogTitle">Delete</Dialog.Title>
            <Dialog.Description className="DialogDescription">
              Are you sure you want to delete this record?
            </Dialog.Description>
          </DialogItem>
        </DropdownMenu.Group>

        <DropdownMenu.Separator className="DropdownMenuSeparator" />

        <DropdownMenu.Group>
          <DropdownMenu.Label className="DropdownMenuLabel">
            Regular items
          </DropdownMenu.Label>
          <DropdownMenu.Item className="DropdownMenuItem">
            Duplicate
          </DropdownMenu.Item>
          <DropdownMenu.Item className="DropdownMenuItem">
            Copy
          </DropdownMenu.Item>
          <DropdownMenu.Item className="DropdownMenuItem">
            Save
          </DropdownMenu.Item>
        </DropdownMenu.Group>

        <DropdownMenu.Arrow className="DropdownMenuArrow" />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
