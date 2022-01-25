import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ text, bgColor, textColor }) => {
    const headerStyles = {
        backgroundColor: bgColor,
        color: textColor,
    };

    return (
        <header style={headerStyles}>
            <div
                style={{ display: 'flex', alignItems: 'center' }}
                className="container">
                <img
                    style={{ marginRight: '15px' }}
                    src="https://img.icons8.com/external-wanicon-lineal-color-wanicon/50/000000/external-feedback-business-motivation-wanicon-lineal-color-wanicon.png"
                />
                <h2>{ text }</h2>
            </div>
        </header>
    );
};


Header.defaultProps = {
    text: 'Feedback UI',
    bgColor: 'rgba(0,0,0,0.4)',
    textColor: '#c18c98',
}

Header.propTypes = {
    text: PropTypes.string,
    bgColor: PropTypes.string,
    textColor: PropTypes.string,
}
export default Header;