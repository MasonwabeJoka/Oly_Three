export type Task = {
    id:number;
    title: string;
    completed: boolean; 
}

let tasks: Task[] = [
    {id: 1, title: "Learn Next.js", completed: false},
    {id: 2, title: "Build a to-do app", completed: true}
]

let nextId = 3;

export const getTasks = () => {
    return tasks;
}


export const addTask = (title: string) => {
    const newTask ={id: nextId++, title: title, completed: false}
    tasks.push(newTask);
    return newTask; 
}

export const updateTask = (id: number, title: string, completed: boolean) =>{
    const task = tasks.find((task)=>task.id === id )
    if(task){
        task.title = title;
        task.completed = completed;
    }
    return task;
}

export const deleteTask = (id: number) => {
    tasks = tasks.filter((task)=> task.id !== id);
}