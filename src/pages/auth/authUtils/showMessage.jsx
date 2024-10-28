import React from 'react'
import Swal from 'sweetalert2'


const showMessage = ({ msg = '', type = 'success' }: Props) => {
    return (
        <Swal
            title={msg}
            icon={type}
            toast
            position='top'
            showConfirmButton={false}
            timer={3000}
            customClass={{ container: 'toast' }}
        />
    )
}

export default showMessage
