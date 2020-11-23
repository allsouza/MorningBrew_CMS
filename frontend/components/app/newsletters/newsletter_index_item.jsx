import React from 'react';
import { connect } from 'react-redux';

function NewsletterIndexItem({newsletter, author}) {
    return(
        <li>
            <h1>{new Date(newsletter.date).toDateString()}</h1>
            <p>by {`${author.firstName} ${author.lastName}`}</p>
        </li>
    )
}

const mSTP = (state, ownProps) => {
    return({
        author: state.entities.users[ownProps.newsletter.author_id],
        newsletter: ownProps.newsletter
    })
}

export default connect(mSTP)(NewsletterIndexItem);