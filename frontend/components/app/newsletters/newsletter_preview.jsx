import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

function NewsletterPreview({newsletter, stories}) {
    const history = useHistory();

    return(
        <div className="newsletter-preview">
            <ul>
                <h1>MorningBrew ({newsletter.date})</h1>
                {newsletter.story_order.map( story => {
                    return (<li key={story} 
                        dangerouslySetInnerHTML={{__html: stories[story].html}}
                        style={{padding: '20px 0', borderBottom: '1px solid black', listStyle: 'none'}}></li>)
                    }
                )}
            </ul>
            <button onClick={() => history.push('/app/newsletters')}>Back</button>
        </div>
    )
}

const mSTP = (state, ownProps) => ({
    newsletter: state.entities.newsletters[ownProps.match.params.newsletter_id],
    stories: state.entities.stories
})

const mDTP = dispatch => ({

})

export default connect(mSTP, mDTP)(NewsletterPreview)