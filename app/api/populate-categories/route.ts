'use server'
import { populateCategories } from "@/sanity/populate-categories"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    await populateCategories()
    return NextResponse.json({ success: true, message: "Categories populated successfully" })
  } catch (error) {
    console.error("Population failed:", error)
    return NextResponse.json({ error: "Failed to populate categories" }, { status: 500 })
  }
}