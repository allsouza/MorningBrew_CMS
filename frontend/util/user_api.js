export const fetchUsers = users => {
    return $.ajax({
        url: '/api/users',
        method: "GET"
    })
}