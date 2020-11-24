import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

function NewsletterPreview({newsletter}) {
    const history = useHistory();

    useEffect(() => {
        document.querySelector('#preview').innerHTML = newsletter.html
    }, [])

    return(
        <div className="newsletter-preview">
            <div id="preview"></div>
            <button onClick={() => history.push('/app/newsletters')}>Back</button>
        </div>
    )
}

const mSTP = (state, ownProps) => ({
    newsletter: state.entities.newsletters[ownProps.match.params.newsletter_id],
})

const mDTP = dispatch => ({

})

export default connect(mSTP, mDTP)(NewsletterPreview)