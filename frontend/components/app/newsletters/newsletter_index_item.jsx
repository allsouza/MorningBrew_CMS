import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { destroyNewsletter } from '../../../actions/newsletter_actions';

function NewsletterIndexItem({newsletter, author, destroy, edit}) {
    const history = useHistory();

    return(
        <li>
            <h1>{newsletter.date}</h1>
            <p>by {`${author.firstName} ${author.lastName}`}</p>

            <div className='buttons'>
                <button onClick={() => history.push(`/app/newsletters/${newsletter.id}/preview`)}>Preview</button>
                {edit ? <div className='options'>
                    <button onClick={() => history.push(`/app/newsletters/${newsletter.id}`)}>Edit</button>
                    <button onClick={() => destroy(newsletter.id)}>Delete</button>
                </div> : null }
                
            </div>
        </li>
    )
}

const mSTP = (state, ownProps) => {
    return({
        author: state.entities.users[ownProps.newsletter.author_id],
        newsletter: ownProps.newsletter,
        edit: ownProps.newsletter.author_id === state.session.id || state.entities.users[state.session.id].username === 'admin'
    })
}

const mDTP = dispatch => ({
    destroy: id => dispatch(destroyNewsletter(id))
})

export default connect(mSTP, mDTP)(NewsletterIndexItem);