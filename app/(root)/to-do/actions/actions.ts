'use server'
import {addTask, updateTask, deleteTask } from "../data/data";
import { revalidatePath } from "next/cache";

export const addTaskAction =async (formData: FormData) => {

 const title = formData.get("title") as string;

    if(!title) {
        throw new Error("Title is required");
    };
    addTask(title)
    revalidatePath('/to-do')
   
}

export const updateTaskAction = async (id: number, title: string, completed: boolean) => {
    updateTask(id, title, completed)
    revalidatePath('/to-do')
}

export const deleteTaskAction = async (id: number) => {
    deleteTask(id)
    revalidatePath('/to-do')
}