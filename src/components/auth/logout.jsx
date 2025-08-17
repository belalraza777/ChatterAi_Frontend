import { logout } from "../../api/userApi.js";
import "../chat/chat.css"
export default function Logout({ loadThreads }) {

    async function handleLogout() {
        try {
            await logout();
            await loadThreads();

        } catch (err) {
            console.log(error);
        }
    }

    return (
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
    )
}
