import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import '../../../../app/assets/stylesheets/components/story_template.css';
import 'quill/dist/quill.snow.css';
import { useHistory } from 'react-router-dom';

function StoryView({story, type}) {
    const history = useHistory();

    useEffect(() => {
        document.querySelector(`#story${story.id}-html`).innerHTML=story.html
    }, [])
    
    return(
        <div className='story-view'>
            
            <table width="100%" cellPadding="0" cellSpacing="0" border="0" >
            <tbody>
                <tr>
                    <td className="section body-copy">
                    <table width="100%" cellPadding="0" cellSpacing="0" border="0">
                    <tbody>
                        <tr>
                        <td className="tag-outer">
                            <table align="left" cellPadding="0" cellSpacing="0" border="0">
                            <tbody>
                                <tr>
                                    <td className="tag-inner" >{story.tag}</td>
                                </tr>
                            </tbody>
                            </table>
                        </td>
                        </tr>
                    </tbody>
                    </table>

                    <h1>
                        <font color="#000000">{story.title}</font>
                    </h1>
                    <div id={`story${story.id}-html`}></div>
                    <p className="p_btn-social">
                        <a href="https://www.facebook.com" target="_blank"><img
                            src="https://img.createsend1.com/ei/j/30/B40/C56/csimport/facebook_icon.png"
                            width="20" alt="" /></a>&nbsp;&nbsp;
                        <a href="https://www.twitter.com" target="_blank"><img
                            src="https://img.createsend1.com/ei/j/30/B40/C56/csimport/twitter_icon.png"
                            width="20" alt="" /></a>&nbsp;&nbsp;
                        <a href="https://www.linkedin.com" target="_blank"><img
                            src="https://img.createsend1.com/ei/j/30/B40/C56/csimport/linkedin_icon.png"
                            width="20" alt="" /></a>&nbsp;&nbsp;
                        <a href="mailto:?subject=Check%20out%20this%20story%20from%20Morning%20Brew!&amp;body=www.morningbrew.com%0A%0AWant%20more%20great%20content%3F%20Subscribe%20to%20Morning%20Brew%27s%20daily%20newsletter%20for%20all%20the%20latest%20news%20from%20Wall%20Street%20to%20Silicon%20Valley%20%40%20www.morningbrew.com."
                        target="_blank"><img src="https://img.createsend1.com/ei/j/30/B40/C56/csimport/mail_icon.png"
                            width="20" alt="" /></a>
                    </p>
                    </td>
                </tr>    
            </tbody>
            </table>
            {type === "newsletter" ? null : <button onClick={() => history.goBack()}>Back</button>}
        </div>
    )
}

const mSTP = (state, ownProps) => {
    return({
        story: ownProps.type === 'newsletter' ? ownProps.story : state.entities.stories[ownProps.match.params.story_id],
        type: ownProps.type
    })
}

export default connect(mSTP)(StoryView)