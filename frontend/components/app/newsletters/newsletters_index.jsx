import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchNewsletters } from '../../../actions/newsletter_actions';
import NewsletterIndexItem from './newsletter_index_item';


function NewsletterIndex({newsletters, getNewsletters}) {
    const history = useHistory();

    useEffect(() => {
        getNewsletters()
    }, [])

    function create() {
        history.push('/app/newsletters/new')
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
    getNewsletters: () => dispatch(fetchNewsletters())
})

export default connect(mSTP, mDTP)(NewsletterIndex)