import React, {ChangeEvent, useState} from 'react';
import {TaskType} from "../../App";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";


type NewsPropsType = {
    title: string
    newsID: string
    tasks: Array<TaskType>
    addTask: (title: string, newsID: string) => void
    removeTask: (id: string, newsID: string) => void
    removeNews: (newsID: string) => void
    changeTaskStatus: (id: string, isDone: boolean, newsID: string) => void
    changeTaskTitle: (id: string, title: string, newsID: string) => void
    changeNewsTitle: (title: string, newsID: string) => void
    setActive: (value:boolean) => void
}

export const News = (props: NewsPropsType) => {

    const tasksList = props.tasks.map((t: TaskType) => {
        const removeTask = () => props.removeTask(t.id, props.newsID)
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.newsID)
        const changeTaskTitle = (newTitle: string) => {
            props.changeTaskTitle(t.id, newTitle, props.newsID)
        }

        return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={changeStatus}
                />
                {t.isDone
                    ? <span>{t.title}</span>
                    : <EditableSpan setActive={props.setActive} title={t.title} changeTitle={changeTaskTitle}/>
                }

                <button onClick={removeTask}>x</button>
            </li>
        )
    })


    const removeNews = () => props.removeNews(props.newsID)
    const changeNewsTitle = (title: string) => props.changeNewsTitle(title, props.newsID)


    const addTask = (newTitleTask: string) => {
        props.addTask(newTitleTask, props.newsID)
    }

    return (
        <div>
            <h3>
                <EditableSpan setActive={props.setActive} title={props.title} changeTitle={changeNewsTitle}/>
                <button onClick={removeNews}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {tasksList}
            </ul>
        </div>
    )
}

