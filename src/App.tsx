import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {News} from "./components/News/News";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import Modal from "./Modal/Modal";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


type NewsType = {
    id: string
    title: string
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    //BLL:

    const newsID_1 = v1()
    const newsID_2 = v1()

    const [news,setNews] = useState<Array<NewsType>>([
        {id: newsID_1, title: "News"},
        {id: newsID_2, title: "News"},
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [newsID_1]: [
            {id: v1(), title: "Kemerovo news", isDone: true},
            {id: v1(), title: "Moscow news", isDone: false},
            {id: v1(), title: "Minsk news", isDone: false},
        ],
        [newsID_2]: [
            {id: v1(), title: "Kiev news", isDone: true},
            {id: v1(), title: "Berlin news", isDone: false},
            {id: v1(), title: "Tokyo news", isDone: false},
        ]
    })

    const [modalActive, setModalActive] = useState<boolean>(false)

    const addTask = (title: string, newsID: string) => {
        const copyTasks = {...tasks}
        copyTasks[newsID] = [{id: v1(), title, isDone: false },...tasks[newsID]]
        setTasks(copyTasks)
    }

    const removeTask = (id: string, newsID: string) => {
        const copyTasks = {...tasks}
        copyTasks[newsID] = tasks[newsID].filter(t => t.id !== id)
        setTasks(copyTasks)
    }

    const changeTaskStatus = (id: string, isDone: boolean, newsID: string) => {
        const copyTasks = {...tasks}
        copyTasks[newsID] = tasks[newsID].map(t => t.id === id ? {...t, isDone} : t)
        setTasks(copyTasks)
    }

    const changeTaskTitle = (id: string, title: string, newsID: string) => {
        const copyTasks = {...tasks}
        copyTasks[newsID] = tasks[newsID].map(t => t.id === id ? {...t, title} : t)
        setTasks(copyTasks)
    }

    const changeNewsTitle = (title: string, newsID: string) => {
        setNews(news.map(tl => tl.id === newsID ? {...tl, title} : tl))
    }


    const removeNews = (newsID: string) => {
        setNews(news.filter(tl => tl.id !== newsID))
        const copyTasks = {...tasks}
        delete copyTasks[newsID]
        setTasks(copyTasks)
    }

    const addNews = (title: string) => {
        const newTaskNewsID = v1()
        setNews( [...news, {id: newTaskNewsID, title: title}])
        setTasks({...tasks, [newTaskNewsID]: []})
    }


    const NewsComp = news.map(tl => {
        return (
            <News
                key={tl.id}
                newsID={tl.id}
                title={tl.title}
                tasks={(tasks[tl.id])}
                addTask={addTask}
                removeTask={removeTask}
                removeNews={removeNews}
                changeTaskStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle}
                changeNewsTitle={changeNewsTitle}
                setActive={setModalActive}
            />
        )
    })


    //UI:
    return (
        <div className="App">
            <AddItemForm addItem={addNews}/>
            {NewsComp}
            <Modal active={modalActive} setActive={setModalActive} children={'Hello Aleksandr'}/>
        </div>
    )
}

export default App;


