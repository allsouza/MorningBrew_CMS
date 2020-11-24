export const fetchNewsletters = () => {
    return $.ajax({
        url: `/api/newsletters`
    })
}

export const fetchNewsletter = newsletterId => {
    return $.ajax({
        url: `/api/newsletters/${newsletterId}`
    })
}

export const createNewsletter = newsletter => {
    return $.ajax({
        url: `/api/newsletters`,
        method: "POST",
        data: {newsletter}
    })
}

export const updateNewsletter = newsletter => {
    return $.ajax({
        url: `/api/newsletters/${newsletter.id}`,
        method: "PATCH",
        data: {newsletter}
    })
}

export const deleteNewsletter = newsletterId => {
    return $.ajax({
        url: `/api/newsletters/${newsletterId}`,
        method: "DELETE"
    })
}

export const createPublishing = (story_id, newsletter_id) => {
    return $.ajax({
        url:`/api/publishing`,
        method: "POST",
        data: {publishing: {story_id, newsletter_id}}
    })
}

export const removePublishing = (story_id, newsletter_id) => {
    return $.ajax({
        url:`/api/publishing`,
        method: "DELETE",
        data: {story_id, newsletter_id}
    })
}