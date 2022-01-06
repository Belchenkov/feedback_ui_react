import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header';
import FeedbackData from './data/FeedbackData';
import FeedbackList from './components/FeedbackList';
import FeedbackStats from './components/FeedbackStats';
import FeedbackForm from './components/FeedbackForm';
import AboutPage from './pages/AboutPage';

function App() {
    const [feedback, setFeedback] = useState(FeedbackData);
    const deleteFeedback = id => {
        if (window.confirm('Are you sure you want to delete?')) {
            setFeedback(feedback.filter((item) => item.id !== id));
        }
    };

    const addFeedback = newFeedback => {
        newFeedback.id = uuidv4();

        setFeedback([
            newFeedback,
            ...feedback
        ])
    };

    return (
        <Router>
            <Header text="Feedback UI" />
            <div className="container">
                <Route path='/' exact>
                    <FeedbackForm
                        handleAdd={addFeedback}
                    />
                    <FeedbackStats
                        feedback={feedback}
                    />
                    <FeedbackList
                        feedback={feedback}
                        handleDelete={deleteFeedback}
                    />
                </Route>
                <Route path='/about' component={AboutPage} />
            </div>
        </Router>
    );
}

export default App;