import { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import ModalHeader from '@/components/modals/common/modal-header'
import ModalFooter from '@/components/modals/common/modal-footer'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import axios from 'axios'

type Props = {
  showAddModal: boolean
  handleHideAddModal: any
  categoryId: string
}

export default function AddSavingModal({ showAddModal, handleHideAddModal, categoryId }: Props) {
  const [loading, setLoading] = useState(false)
  const [description, setDescription] = useState('')
  const [saving, setSaving] = useState('')
  const [cutInMonth, setCutInMonth] = useState('')
  const [inForecast, setInForecast] = useState('')
  const [owner, setOwner] = useState('')

  const router = useRouter()

  const d = new Date()
  const month = d.getMonth()
  const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  const monthsOptions = monthsArr.filter((_, index) => index >= month)

  const resetForm = () => {
    setDescription('')
    setSaving('')
    setCutInMonth('')
    setInForecast('')
    setOwner('')
  }

  const submitHandler = async (e: any) => {
    e.preventDefault()

    if (description.trim().length < 1) {
      toast.error('Please add description')
      setLoading(false)
      return
    }
    if (saving.trim().length < 1) {
      toast.error('Please add saving amount')
      setLoading(false)
      return
    }
    // if (cutInMonth.trim().length < 1) {
    //   toast.error('Please add cut in month')
    //   setLoading(false)
    //   return
    // }
    if (owner.trim().length < 1) {
      toast.error('Please add owner')
      setLoading(false)
      return
    }

    try {
      setLoading(true)

  

      let data = {
        categoryId,
        description,
        saving,
        cutInMonth,
        inForecast,
        owner,
      }
      let link = `/api/saving/add`

      //post user data to back end
      const response = await axios.post(link, { data })

      //handle if data has an error
      if (response.data.error) {
        toast.error(response.data.error)
        setLoading(false)
      }
      if (response.data._id) {
        setLoading(false)
        toast.success('Saving Created')
        handleHideAddModal()
        resetForm()
        router.refresh()
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      toast.error('Somehing went wrong')
      setLoading(false)
      // handleHideAddModal()
    }
  }

  return (
    <Modal show={showAddModal} onHide={handleHideAddModal}>
      <ModalHeader>Add Saving</ModalHeader>

      <Form className='p-2'>
        <div className='flex gap-2'>
          <Form.Group className='mb-3 w-50'>
            <Form.Label className='pl-2 font-LatoBold'>Cut in month</Form.Label>
            <Form.Select onChange={(e) => setCutInMonth(e.target.value)}>
              <option></option>
              {monthsArr.map((month) => (
                <option key={month}>{month}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className='mb-3 w-50'>
            <Form.Label className='pl-2 font-LatoBold'>In forecast</Form.Label>
            <Form.Select onChange={(e) => setInForecast(e.target.value)}>
              <option></option>
              <option>Yes</option>
              <option>No</option>
            </Form.Select>
          </Form.Group>
        </div>
        <div className='flex gap-2'>
          <Form.Group className='mb-3 w-50'>
            <Form.Label className='pl-2 font-LatoBold'>Saving</Form.Label>
            <Form.Control type='number' value={saving} onChange={(e) => setSaving(e.target.value)} />
          </Form.Group>
          <Form.Group className='mb-3 w-50'>
            <Form.Label className='pl-2 font-LatoBold'>Owner</Form.Label>
            <Form.Control value={owner} onChange={(e) => setOwner(e.target.value)} />
          </Form.Group>
        </div>
        <div className='flex gap-2 mb-2'>
          <Form.Group className='w-100'>
            <Form.Label className='pl-2 font-LatoBold'>Description</Form.Label>
            <Form.Control
              as='textarea'
              // rows={8}
              type='text'
              style={{ resize: 'none' }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='h-[280px]'
            />
          </Form.Group>
        </div>
      </Form>

      <div className='flex gap-2 justify-end pr-2 mb-2'>
        <Button disabled={loading} variant='success' size='sm' onClick={submitHandler} className='py-1'>
          {loading ? 'Loading' : 'Confirm'}
        </Button>
        <Button variant='danger' size='sm' onClick={handleHideAddModal}>
          Cancel
        </Button>
      </div>
      <ModalFooter />
    </Modal>
  )
}
