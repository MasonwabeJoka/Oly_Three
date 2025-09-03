import { type ClassValue, clsx } from "clsx"

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export const isBase64Image =(imageData: string) => {
    const base64Rex = /^data:image\/(png|jpe?g|gif|webp);base64;/
    return base64Rex.test(imageData)
}

export const formatDateString =(dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
    }


    const date = new Date(dateString)
    const formattedDate= date.toLocaleDateString(undefined, options)
    const time = date.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
    })

    return `${time} - ${formattedDate}`
}

