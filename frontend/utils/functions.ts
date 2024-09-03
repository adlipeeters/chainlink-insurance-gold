import { TruncateParams } from "@/interfaces/General"
import { ethers } from "ethers"

export const toWei = (num: string | number) => ethers.utils.parseEther(num.toString())
export const fromWei = (num: string | number) => ethers.utils.formatEther(num)

export const generateLuckyNumbers = (count: number) => {
    const result = []
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < count; i++) {
        let string = ''
        for (let j = 0; j < 6; j++) {
            string += characters.charAt(Math.floor(Math.random() * charactersLength))
        }
        result.push(string)
    }
    return result
}

export const truncate = ({ text, startChars, endChars, maxLength }: TruncateParams): string => {
    if (text.length > maxLength) {
        let start = text.substring(0, startChars)
        let end = text.substring(text.length - endChars, text.length)
        while (start.length + end.length < maxLength) {
            start = start + '.'
        }
        return start + end
    }
    return text
}

export const convertDaysToMiliseconds = (days: number) => {
    return days * 24 * 60 * 60 * 1000
}

export const convertMilisecondsToDays = (miliseconds: number) => {
    return miliseconds / (24 * 60 * 60 * 1000)
}

export const timestampToDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('ro-RO');
}