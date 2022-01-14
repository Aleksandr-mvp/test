import React from 'react';
import s from './Modal.module.css'

type PropsType = {
    active: boolean
    setActive: (value:boolean) => void
    children: string
}

const Modal = (props: PropsType) => {
    return (
        <div className={s.active ? "modal active" : "modal"} onClick={() => props.setActive(false)}>
            <div className={s.active ? "modal__content active" : "modal__content"} onClick={e => e.stopPropagation()}>
                {props.children}
            </div>
        </div>
    )
}

export default Modal;