import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from './EditableSpan.module.css'

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
    setActive: (value:boolean) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [title, setTitle] = useState<string>(props.title)
    const [editMode, setEditMode] = useState<boolean>(false)


    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        props.changeTitle(title)
        setEditMode(false)
    }

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyPressOffEditMode = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            offEditMode()
        }
    }

    return (
        editMode
            ? <input onBlur={offEditMode}
                     autoFocus={true}
                     value={title}
                     onChange={onChangeSetTitle}
                     onKeyPress={onKeyPressOffEditMode}
            />
            : <span onClick={() => props.setActive(true)} onDoubleClick={onEditMode} className={s.span} title={'click me'}>{props.title}</span>
    )
}

