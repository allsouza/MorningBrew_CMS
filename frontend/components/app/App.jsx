import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, useHistory } from 'react-router-dom';
import { getUsers, logout } from '../../actions/user_actions';
import { fetchStories } from '../../actions/story_actions';
import { fetchNewsletters, createNewsletter } from '../../actions/newsletter_actions';
import ReactDOMServer from 'react-dom/server';
import Header from './header/header';
import StoriesIndex from './stories/stories_index';
import NewsletterIndex from './newsletters/newsletters_index';
import { EditStory, NewStory } from './stories/story_editor';
import StoryView from './stories/story_view';
import NewsletterEditor from './newsletters/newsletter_editor';
import NewsletterPreview from './newsletters/newsletter_preview';
import Footer from './footer/footer';

function App({getUsers, getNewsletters, getStories, newsletter, createNewsletter}) {
    const [ready, setReady] = useState(false)
    const history = useHistory();

    useEffect(() => {
        async function getData() {
            await getUsers()
            await getStories()
            await getNewsletters()
            setReady(true)
        }
        getData()
    }, [])
    

    function newNewsletter() {
        const date = new Date(Date.now())
        const dateString = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
        createNewsletter({date: dateString, html: "new", story_order: ""})
            .then( payload => {
                history.push(`/app/newsletters/${payload.newsletter.id}`)})
    }

    function Main() {
        return(
            <div className="main">
                <h2>Today is {new Date(Date.now()).toDateString()}</h2>
                <h1>Let's get to work!</h1>
                <div className='options'>
                    <button onClick={() => history.push('/app/stories/new')}>Create a new Story</button>
                    <button onClick={newNewsletter}>Create a new Newsletter</button>
                </div>
                <div className='last-issue'>
                    <h1>Last Published Issue:</h1>
                    <div dangerouslySetInnerHTML={{__html: newsletter === undefined ? "No issues created yet" : newsletter.html}}></div>
                </div>
            </div>
        )
    }

    return(
        <div className='app'>
            <Header />
            {ready ? <Switch>
                <Route exact path='/app/stories' component={StoriesIndex} />
                <Route exact path='/app/stories/new' component={NewStory} />
                <Route exact path='/app/stories/:story_id' component={EditStory} />
                <Route exact path='/app/stories/:story_id/preview' component={StoryView} />
                <Route exact path='/app/newsletters' component={NewsletterIndex} />
                <Route exact path='/app/newsletters/:newsletter_id' component={NewsletterEditor} />
                <Route exact path='/app/newsletters/:newsletter_id/preview' component={NewsletterPreview} />
                <Main />
            </Switch> :null }
            <Footer/>
        </div>
    )
}

const mSTP = state => ({
    currentUser: state.entities.users[state.session.id],
    newsletter: Object.values(state.entities.newsletters).sort((a,b) => a.date > b.date ? -1 : 1)[0]
})

const mDTP = dispatch => ({
    logout: () => dispatch(logout()),
    getUsers: () => dispatch(getUsers()),
    getStories: () => dispatch(fetchStories()),
    getNewsletters: () => dispatch(fetchNewsletters()),
    createNewsletter: newsletter => dispatch(createNewsletter(newsletter))
})

export default connect(mSTP, mDTP)(App);