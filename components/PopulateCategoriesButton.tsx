"use client"
import { useState } from "react"
import Button from "./Buttons"

function PopulateCategoriesButton() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handlePopulate = async () => {
    setLoading(true)
    setMessage("")
    
    try {
      const response = await fetch("/api/populate-categories", {
        method: "POST",
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setMessage("✅ Categories populated successfully!")
      } else {
        setMessage(`❌ Error: ${data.error}`)
      }
    } catch (error) {
      setMessage("❌ Failed to populate categories")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* <button 
        onClick={handlePopulate} 
        disabled={loading}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        {loading ? "Populating..." : "Populate Categories"}
      </button> */}
      <Button
        buttonChildren={loading ? "Populating..." : "Populate Categories"}
        buttonType="primary"
        buttonSize="large"
        name="populate-categories-btn"
        type="button"
        ariaLabel="Populate Categories"
        autoFocus={false}
        disabled={loading}
        onClick={handlePopulate}
      />
      {message && <p>{message}</p>}
    </div>
  )
}

export default PopulateCategoriesButton