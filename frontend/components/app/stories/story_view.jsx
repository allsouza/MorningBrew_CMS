import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import '../../../../app/assets/stylesheets/components/story_template.css';
import 'quill/dist/quill.snow.css';

function StoryView({story}) {
    useEffect(() => {
        document.querySelector('#story-html').innerHTML=story.html
    }, [])
    
    return(
        <div className='story-view'>
            
            <table width="100%" cellpadding="0" cellspacing="0" border="0" >
            <tr>
                <td className="section body-copy">
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                    <td className="tag-outer">
                        <table align="left" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                            <td className="tag-inner" >STORY TAG</td>
                        </tr>
                        </table>
                    </td>
                    </tr>
                </table>

                <h1>
                    <font color="#000000">{story.title}</font>
                </h1>
                <div id="story-html"></div>
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
            </table>
        </div>
    )
}

const mSTP = (state, ownProps) => {
    return({
        story: state.entities.stories[ownProps.match.params.story_id]
    })
}

export default connect(mSTP)(StoryView)