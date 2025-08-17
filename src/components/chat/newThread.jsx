import React, { useEffect, useState } from 'react'
import { newThread } from "../../api/chatApi.js";  // Import the API function
import './newThread.css';

export default function NewThread({ setSelectedThread, loadThreads }) {
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState("");

    useEffect(() => {
        setShowForm(false);
        setTitle("");
    }, [])

    function formRender() {
        setShowForm((!showForm));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const newth = await newThread(title);
        setSelectedThread(newth.data.data);
        await loadThreads();
        setShowForm(false);
        setTitle("");
    }

    return(
        <div className="new-thread-container">
            {showForm ? (
                <form onSubmit={handleSubmit} className="new-thread-form">
                    <input
                        type="text"
                        placeholder="New Chat title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        autoFocus
                    />
                    <div className="form-actions">
                        <button type="button" onClick={() => setShowForm(false)}>
                            Cancel
                        </button>
                        <button type="submit" disabled={!title.trim()}>
                            Create
                        </button>
                    </div>
                </form>
            ) : (
                <button 
                    className="new-thread-button"
                    onClick={() => setShowForm(true)}
                >
                    + New Chat
                </button>
            )}
        </div>
    )
}
