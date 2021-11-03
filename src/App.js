import * as React from 'react'
import useSWR from 'swr'

const fetcher = url => fetch(url).then(res => res.json())

const App = ({ username }) => {
  const { data } = useSWR(`https://api.github.com/users/${username}`, fetcher)

  console.log(typeof window === 'undefined' ? 'server' : 'client', {
    typeofWindow: typeof window,
    username,
    data, // will be undefined on server-side and on the first render
  })

  if (data?.message === 'Not Found') {
    return <h1>User not found</h1>
  }

  return (
    <main>
      <h1>Github user information</h1>
      <p>This part will be always here, since it's static content</p>
      {data ? (
        <>
          <img src="/assets/images/jungle-logo.png" />
          <h1>Hello from server-side rendered React 👋</h1>
          <b>Fetched data:</b> <br />
          <img
            src={data.avatar_url}
            style={{ borderRadius: '9999px', width: '100px', height: '100px' }}
          />
          <dl>
            <dt>Username</dt>
            <dd>{data.login}</dd>

            <dt>Location</dt>
            <dd>{data.location}</dd>

            <dt>Company</dt>
            <dd>{data.company}</dd>
          </dl>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </main>
  )
}

export default App
