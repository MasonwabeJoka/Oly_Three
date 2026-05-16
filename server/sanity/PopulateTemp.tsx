"use client";
import { use, useEffect } from "react"
import { populateCategories } from "./populate-categories"

const Populate = () => {
    useEffect(() => {
        populateCategories()
    }, [])
    return <div>Populate</div>
}

export default Populate