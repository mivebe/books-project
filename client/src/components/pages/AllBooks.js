import { useContext } from "react"
import { InnerStorage } from "../contexts/AuthContext";

const AllBooks = () => {
    const authContext = useContext(InnerStorage);
    const { backEndURL } = authContext;


    return (
        <div>

        </div>
    )
}

export default AllBooks
