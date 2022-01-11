import React, { useContext } from 'react';
import { FaTimes, FaEdit } from 'react-icons/fa';
import PropTypes from 'prop-types';

import Card from './shared/Card';
import FeedbackContext from '../context/FeedbackContext';

const FeedbackItem = ({ item }) => {
    const { handleDelete, editFeedback } = useContext(FeedbackContext);

    return (
        <Card>
            <div className="num-display">{ item.rating }</div>
            <button
                onClick={() => handleDelete(item.id)}
                className="close"
            >
                <FaTimes color='purple' />
            </button>
            <button
                className="edit"
                onClick={() => editFeedback(item)}
            >
                <FaEdit color='purple' />
            </button>
            <div className="text-display">{ item.text }</div>
        </Card>
    );
};

FeedbackItem.propTypes = {
    item: PropTypes.object.isRequired,
}


export default FeedbackItem;