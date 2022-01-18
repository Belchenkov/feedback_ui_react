import { createContext, useState, useEffect } from 'react';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [feedback, setFeedback] = useState([]);
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false,
    });

    useEffect(() => {
        fetchFeedback();
    }, [])

    const fetchFeedback = async () => {
        const res = await fetch('/feedback?_sort=id&_order=desc');
        const data = await res.json();
        setFeedback(data);
        setIsLoading(false);
    };

    const addFeedback = async newFeedback => {
        const res = await fetch('/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFeedback),
        });
        const data = await res.json();

        setFeedback([
            data,
            ...feedback
        ])
    };

    const editFeedback = item => {
      setFeedbackEdit({
          item,
          edit: true,
      })
    };

    const updateFeedback = (id, updItem) => {
        setFeedback(feedback.map(item => item.id === id ? { ...item, ...updItem } : item));
    };

    const deleteFeedback = id => {
        if (window.confirm('Are you sure you want to delete?')) {
            setFeedback(feedback.filter((item) => item.id !== id));
        }
    };

    return (
        <FeedbackContext.Provider
            value={{
                isLoading,
                feedback,
                addFeedback,
                feedbackEdit,
                editFeedback,
                updateFeedback,
                deleteFeedback,
            }}
        >
            {children}
        </FeedbackContext.Provider>
    )
}

export default FeedbackContext;