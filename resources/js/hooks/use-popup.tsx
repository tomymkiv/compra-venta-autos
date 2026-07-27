import { useState } from 'react'

export default function usePopUp() {
  const [show, setShow] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  return {
    show,
    setShow,
    confirmDelete,
    setConfirmDelete
  }
}
