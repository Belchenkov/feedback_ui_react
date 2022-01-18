import { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

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
        const res = await fetch('http://127.0.0.1:5000/feedback?_sort=id&_order=desc');
        const data = await res.json();
        setFeedback(data);
        setIsLoading(false);
    };

    const addFeedback = newFeedback => {
        newFeedback.id = uuidv4();

        setFeedback([
            newFeedback,
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