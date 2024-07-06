import { ReactElement, useState } from "react"

export const useMultistepForm = (steps: ReactElement[]) => { //array of steps in a multistep form
  // track the current step
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  // go to next step function
  const next = () => {
    setCurrentStepIndex(index => {
        if(index >= steps.length - 1) return index // don't add 1 if on last step  
        return index + 1 
    })
  }

  // go to previous step function
  const back = () => {
    setCurrentStepIndex(index => {
        if(index <= 0) return index // don't subtract 1 if on first step  
        return index - 1 
    })
  }

  // go to specific step function

  const goTo = (index: number) => {
    setCurrentStepIndex(index)

  }

  return { 
    currentStepIndex, // return current step index
    step: steps[currentStepIndex], // return current step
    steps, // return all steps
    isFirstStep: currentStepIndex === 0, // return true if first step
    isLastStep: currentStepIndex === steps.length - 1, // return true if last step
    goTo, // return go to specific step function
    next,// return go to next step function
    back, // return go to previous step function
  }
}