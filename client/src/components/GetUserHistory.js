import { useState, useEffect, useContext } from "react"
import { InnerStorage } from "../contexts/AuthContext"

const GetUserHistory = ({ userId }) => {
    const authContext = useContext(InnerStorage)
    const { backEndURL } = authContext

    const [data, setData] = useState([])

    useEffect(() => {
        (async () => {
            const res = await fetch(`${backEndURL}/users/${userId}/history`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${authContext.token}`,
                }
            })
            const result = await res.json()
            setData(result)
            console.log("result", result);
        })()
    }, [])

    console.log(data);
    return (
        <div>
            {data &&
                data.map(d =>
                    <div className='history-log' style={{ display: 'flex', backgroundColor: "lightgray" }}>
                        <p style={{ margin: "0 2rem 0 2rem" }}>{d.state ? "Rented" : "Returned"}</p>
                        <p style={{ margin: "0 2rem 0 2rem" }}>{d.books_id}</p>
                        <p style={{ margin: "0 2rem 0 2rem" }}>{d.date}</p>
                    </div>
                )
            }
        </div>
    )
}

export default GetUserHistory
