export function BugsDisplay({bugs = []}) {
    return (
        (bugs.length > 0 )
        ? 
        (
            <>
                {
                bugs.map(bug => {
                    return <h1 key={bug.id}>{bug.title}</h1>
                })

                }
            </>
        )
        : <h1>No bugs in this project</h1>
    )
}