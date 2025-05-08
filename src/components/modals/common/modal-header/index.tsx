import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}
const ModalHeader = ({ children }: Props) => {
  return <div className='bg-jcb rounded-0 h-11 text-center p-1 text-2xl text-black'>{children}</div>
}

export default ModalHeader
