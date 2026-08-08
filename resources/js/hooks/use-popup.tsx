import { useState } from 'react'

export default function usePopUp() {
  const [show, setShow] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  return {
    show,
    setShow,
    confirmDelete,
    setConfirmDelete,
    confirmation,
    setConfirmation
  }
}
