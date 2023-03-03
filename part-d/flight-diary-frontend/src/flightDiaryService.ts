import axios from "axios"
import { DiaryEntry, NewDiaryEntry } from "./types"

const baseUrl = "http://localhost:3001/api/diaries"

export const getAllDiaries = () => {
    return axios.get<DiaryEntry[]>(baseUrl).then((response) => response.data)
}

export const addDiary = (diary: NewDiaryEntry) => {
    return axios.post<DiaryEntry>(baseUrl, diary).then((response) => response.data)
}
