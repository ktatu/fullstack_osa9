import React, { useEffect, useState } from "react"
import { DiaryEntry, NewDiaryEntry, Weather, Visibility } from "./types"
import { getAllDiaries, addDiary } from "./flightDiaryService"
import axios from "axios"

function App() {
    const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([])
    const [errorMessage, setErrorMessage] = useState("")

    const [date, setDate] = useState("")
    const [weather, setWeather] = useState<Weather>(Weather.Sunny)
    const [visibility, setVisibility] = useState<Visibility>(Visibility.Great)
    const [comment, setComment] = useState("")

    useEffect(() => {
        getAllDiaries().then((diaries) => setDiaryEntries(diaries))
    }, [])

    const handleDiarySubmit = (event: React.SyntheticEvent) => {
        event.preventDefault()

        const newDiary: NewDiaryEntry = {
            date: date,
            weather: weather,
            visibility: visibility,
            comment: comment,
        }

        addDiary(newDiary)
            .then((returnedDiary: DiaryEntry) => {
                setDiaryEntries(diaryEntries.concat(returnedDiary))

                setDate("")
                setWeather(Weather.Sunny)
                setVisibility(Visibility.Great)
                setComment("")
            })
            .catch((error) => {
                if (axios.isAxiosError(error)) {
                    if (error.response?.data) {
                        setErrorMessage(error.response.data)
                    } else {
                        setErrorMessage("Something went wrong: adding diary failed")
                    }
                }
            })
    }

    return (
        <div>
            <div>
                <h2>Add new diary</h2>
                <div>
                    <h4 style={{ color: "red" }}>{errorMessage}</h4>
                </div>
                <form
                    method="post"
                    onSubmit={handleDiarySubmit}
                >
                    <label>
                        date
                        <input
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            type="text"
                        />
                    </label>
                    <br />
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div>visibility:</div>
                        <div>
                            <input
                                defaultChecked
                                value="great"
                                onChange={(e) => setVisibility(e.target.value as Visibility)}
                                name="visibility"
                                type="radio"
                            />
                            <span>great</span>
                        </div>
                        <div>
                            <input
                                value="good"
                                onChange={(e) => setVisibility(e.target.value as Visibility)}
                                name="visibility"
                                type="radio"
                            />
                            <span>good</span>
                        </div>
                        <div>
                            <input
                                value="ok"
                                onChange={(e) => setVisibility(e.target.value as Visibility)}
                                name="visibility"
                                type="radio"
                            />
                            <span>ok</span>
                        </div>
                        <div>
                            <input
                                value="poor"
                                onChange={(e) => setVisibility(e.target.value as Visibility)}
                                name="visibility"
                                type="radio"
                            />
                            <span>poor</span>
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div>weather:</div>
                        <div>
                            <input
                                defaultChecked
                                value="sunny"
                                onChange={(e) => setWeather(e.target.value as Weather)}
                                name="weather"
                                type="radio"
                            />
                            <span>sunny</span>
                        </div>
                        <div>
                            <input
                                value={Weather.Rainy}
                                onChange={(e) => setWeather(e.target.value as Weather)}
                                name="weather"
                                type="radio"
                            />
                            <span>rainy</span>
                        </div>
                        <div>
                            <input
                                value="cloudy"
                                onChange={(e) => setWeather(e.target.value as Weather)}
                                name="weather"
                                type="radio"
                            />
                            <span>cloudy</span>
                        </div>
                        <div>
                            <input
                                value="stormy"
                                onChange={(e) => setWeather(e.target.value as Weather)}
                                name="weather"
                                type="radio"
                            />
                            <span>stormy</span>
                        </div>
                        <div>
                            <input
                                value="windy"
                                onChange={(e) => setWeather(e.target.value as Weather)}
                                name="weather"
                                type="radio"
                            />
                            <span>windy</span>
                        </div>
                    </div>
                    <br />
                    <label>
                        comment
                        <input
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            type="text"
                        />
                    </label>
                    <br />
                    <button type="submit">add</button>
                </form>
            </div>
            <div>
                <h2>Diary entries</h2>
                {diaryEntries.map((entry) => (
                    <DiaryEntryContainer
                        key={entry.id}
                        diaryEntry={entry}
                    />
                ))}
            </div>
        </div>
    )
}

interface DiaryEntryContainerProps {
    diaryEntry: DiaryEntry
}

const DiaryEntryContainer = ({ diaryEntry }: DiaryEntryContainerProps) => {
    return (
        <div>
            <h3>{diaryEntry.date}</h3>
            <span>visibility: {diaryEntry.visibility}</span>
            <br />
            <span>weather: {diaryEntry.weather}</span>
        </div>
    )
}

export default App
