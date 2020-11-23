import * as NewslettersApiUtil from '../util/newsletters_api_util';

export const RECEIVE_ALL_NEWSLETTERS = "RECEIVE_ALL_NEWSLETTERS";
export const RECEIVE_NEWSLETTER = "RECEIVE_NEWSLETTER";
export const DELETE_NEWSLETTER = "DELETE_NEWSLETTER";
export const RECEIVE_NEWSLETTER_ERRORS = "RECEIVE_NEWSLETTER_ERRORS";

const receiveAllNewsletters = newsletters => ({
    type: RECEIVE_ALL_NEWSLETTERS,
    newsletters
})

const receiveNewsletter = newsletter => ({
    type: RECEIVE_NEWSLETTER,
    newsletter
})

const deleteNewsletter = newsletterId => ({
    type: DELETE_NEWSLETTER,
    newsletterId
})

const receiveNewsletterErrors = errors => ({
    type: RECEIVE_NEWSLETTER_ERRORS,
    errors
})

export const fetchNewsletters = () => dispatch => {
    return NewslettersApiUtil.fetchNewsletters().then( newsletters => dispatch(receiveAllNewsletters(newsletters)))
}

export const fetchNewsletter = newsletterId => dispatch => {
    return NewslettersApiUtil.fetchNewsletter(newsletterId).then( newsletter => dispatch(receiveNewsletter(newsletter)))
}

export const createNewsletter = newsletter => dispatch => {
    return NewslettersApiUtil.createNewsletter(newsletter).then( newsletter => dispatch(receiveNewsletter(newsletter)), errors => dispatch(receiveNewsletterErrors(errors)))
}

export const updateNewsletter = newsletter => dispatch => {
    return NewslettersApiUtil.updateNewsletter(newsletter).then( newsletter => dispatch(receiveNewsletter(newsletter)), errors => dispatch(receiveNewsletterErrors(errors)))
}

export const destroyNewsletter = newsletterId => dispatch => {
    return NewslettersApiUtil.deleteNewsletter(newsletterId).then( () => dispatch(deleteNewsletter(newsletterId)), errors => dispatch(receiveNewsletterErrors(errors)))
}