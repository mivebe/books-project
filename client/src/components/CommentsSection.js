const CommentSection = ({ bookId }) => {

    useEffect(() => {
        (async () => {

            if (!authContext.logged) { history.push('/login') }
            else {
                const res = await fetch(`${backEndURL}/books/comment/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${authContext.token}`
                    }
                })
                const result = await res.json();
                setComments(result)
                console.log(result);
            }
        })()
    }, [history, authContext.isLoggedIn, authContext.token])

    return (
        <div>

        </div>
    )
}

export default CommentSection
