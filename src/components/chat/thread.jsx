import { deleteThread } from "../../api/chatApi.js";


export default function Thread({ thread, onSelect, isSelected, loadThreads, setSelectedThread }) {

    async function handleDeleteThread(threadId, event) {
        event.stopPropagation();
        await deleteThread(threadId);
        await loadThreads();
        setSelectedThread(null);
    }

    return (
        <div
            className={`thread ${isSelected ? 'selected' : ''}`}
            onClick={onSelect} >
            <div className="thread-btn">
                <h4>{thread.title} </h4>
                <span onClick={(event) => { handleDeleteThread(thread._id, event) }} className="deleteThread"><i class="fa-solid fa-trash"></i></span>
            </div>
            <p>{thread.messages?.[0]?.content || 'No messages yet'}</p>
        </div>
    )
}