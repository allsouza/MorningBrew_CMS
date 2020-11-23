import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchNewsletters } from '../../../actions/newsletter_actions';
import NewsletterIndexItem from './newsletter_index_item';


function NewsletterIndex({newsletters, getNewsletters}) {
    useEffect(() => {
        getNewsletters()
    }, [])

    return(
        <div className="newsletter-index">
            <h1>Newsletters</h1>
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
    getNewsletters: () => dispatch(fetchNewsletters())
})

export default connect(mSTP, mDTP)(NewsletterIndex)