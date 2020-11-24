import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchNewsletters, createNewsletter } from '../../../actions/newsletter_actions';
// import { createNewsletter } from '../../../util/newsletters_api_util';
import NewsletterIndexItem from './newsletter_index_item';


function NewsletterIndex({newsletters, getNewsletters, createNewsletter}) {
    const history = useHistory();

    useEffect(() => {
        getNewsletters()
    }, [])

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
    getNewsletters: () => dispatch(fetchNewsletters()),
    createNewsletter: newsletter => dispatch(createNewsletter(newsletter))
})

export default connect(mSTP, mDTP)(NewsletterIndex)