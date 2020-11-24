import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { destroyNewsletter } from '../../../actions/newsletter_actions';

function NewsletterIndexItem({newsletter, author, destroy}) {
    const history = useHistory();

    return(
        <li>
            <h1 onClick={() => history.push(`/app/newsletters/${newsletter.id}`)}>{new Date(newsletter.date).toDateString()}</h1>
            <p>by {`${author.firstName} ${author.lastName}`}</p>
            <button onClick={() => destroy(newsletter.id)}>Delete</button>
        </li>
    )
}

const mSTP = (state, ownProps) => {
    return({
        author: state.entities.users[ownProps.newsletter.author_id],
        newsletter: ownProps.newsletter
    })
}

const mDTP = dispatch => ({
    destroy: id => dispatch(destroyNewsletter(id))
})

export default connect(mSTP, mDTP)(NewsletterIndexItem);