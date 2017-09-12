import React from 'react';
import PropTypes from 'prop-types';
import localizer from 'utils/Localizer';

function ReadingSessionProgressComponent (props) {
    let readingSessionProgress = props.readingSessionProgress;
    return (
        <article className="result-single">
            <div>
                {localizer.localize('reading-session-progress-status-label')}
                &nbsp;
                <span className="result-important">{readingSessionProgress.readPercentage}%</span>
            </div>
            <div>
                <span className="result-important">{readingSessionProgress.averagePagesPerDay}</span>
                &nbsp;
                {localizer.localize('reading-session-progress-average-pages-label')}
            </div>
            <div>
                <span className="result-important">{readingSessionProgress.pagesTotal - readingSessionProgress.lastReadPage}</span>
                &nbsp;
                {localizer.localize('reading-session-progress-estimated-pages-left-label')}
             </div>
            <div>
                <span className="result-important">{readingSessionProgress.estimatedReadDaysLeft}</span>
                &nbsp;
                {localizer.localize('reading-session-progress-estimated-read-days-left-label')}
                &nbsp;
                /
                &nbsp;
                <span className="result-important">{readingSessionProgress.estimatedDaysLeft}</span>
                &nbsp;
                {localizer.localize('reading-session-progress-estimated-days-left-label')}
            </div>
            <div>
                {localizer.localize('reading-session-progress-estimated-finish-date-label')}
                &nbsp;
                <span className="result-important ">{readingSessionProgress.estimatedFinishDate}</span>
            </div>
            {readingSessionProgress.deadline ? (
                <div>
                    {localizer.localize('reading-session-progress-deadline-label')}
                    &nbsp;
                    <span className="result-important ">{readingSessionProgress.deadline}</span>
                </div>
            ) : null}
        </article>
    );
}

ReadingSessionProgressComponent.propTypes = {
    readingSessionProgress: PropTypes.shape({
        readPercentage: PropTypes.number.isRequired,
        averagePagesPerDay: PropTypes.number.isRequired,
        pagesTotal: PropTypes.number.isRequired,
        lastReadPage: PropTypes.number.isRequired,
        estimatedReadDaysLeft: PropTypes.number.isRequired,
        estimatedDaysLeft: PropTypes.number.isRequired,
        estimatedFinishDate: PropTypes.string.isRequired,
        deadline: PropTypes.string
    }).isRequired
};

export default ReadingSessionProgressComponent;