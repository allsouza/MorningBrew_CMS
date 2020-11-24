import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createNewsletter } from '../../../actions/newsletter_actions';
import NewsletterIndexItem from './newsletter_index_item';


function NewsletterIndex({newsletters, createNewsletter}) {
    const history = useHistory();

    function create() {
        const date = new Date(Date.now())
        const dateString = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
        createNewsletter({date: dateString, html: "new", story_order: ""})
            .then( payload => {
                history.push(`/app/newsletters/${payload.newsletter.id}`)})
    }

    return(
        <div className="newsletter-index">
            <h1>Newsletters</h1>
            <button onClick={create}>New Newsletter</button>
            <ul>
                {newsletters.map(newsletter => {
                    return <NewsletterIndexItem newsletter={newsletter} key={newsletter.id}/>
                })}
            </ul>
        </div>
    )
}

const mSTP = state => ({
    newsletters: Object.values(state.entities.newsletters)
})

const mDTP = dispatch => ({
    createNewsletter: newsletter => dispatch(createNewsletter(newsletter))
})

export default connect(mSTP, mDTP)(NewsletterIndex)