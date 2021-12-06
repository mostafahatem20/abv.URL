import React, { useEffect, useState } from 'react'
import { Table, InputGroup, FormControl, Button } from 'react-bootstrap'
import background from './background.jpg'
export default function App() {
  const [urls, setUrls] = useState([])
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')
  useEffect(() => {
    callApi()
  }, [])
  const callApi = async () => {
    const response = await fetch('http://localhost:5000/', {
      headers: {
        accepts: 'application/json',
      },
    })
    const body = await response.json()
    if (response.status !== 200) throw Error(body.message)
    setUrls(body.shortURLS)
  }
  const shortenUrl = async () => {
    let urlSent = url
    setUrl('')
    const response = await fetch('http://localhost:5000/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: urlSent,
      }),
    })
    const body = await response.json()
    if (response.status !== 200) throw Error(body.message)
    if (body.exitCode === 1) {
      setError('Url must be valid')
    }
    callApi()
  }
  const handleKeyPress = (target) => {
    if (target.charCode === 13) {
      shortenUrl()
    }
  }

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        width: '100vw',
        height: '100vh',
      }}
    >
      <h1 style={{ textAlign: 'center', color: 'white', padding: '2%' }}>
        Abbreviate Your Url
      </h1>
      <InputGroup
        className="mb-3"
        style={{ width: '85%', marginLeft: 'auto', marginRight: 'auto' }}
      >
        <FormControl
          placeholder="Url"
          aria-label="Url"
          aria-describedby="basic-addon2"
          value={url}
          onChange={(e) => {
            setError('')
            setUrl(e.target.value)
          }}
          onKeyPress={handleKeyPress}
        />
        <Button variant="secondary" id="button-addon2" onClick={shortenUrl}>
          Shorten
        </Button>
      </InputGroup>
      <p
        style={{
          color: 'red',
          width: '85%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        {error}
      </p>
      <Table
        striped
        bordered
        hover
        variant="dark"
        responsive
        style={{ width: '85%', marginLeft: 'auto', marginRight: 'auto' }}
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Full Url</th>
            <th>Short Url</th>
            <th>Attempts to Shorten</th>
            <th>Visits</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((one, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>
                  <a href={one.full}>{one.full}</a>
                </td>
                <td>
                  <a href={'http://localhost:5000/' + one.short}>{one.short}</a>
                </td>
                <td>{one.attempts}</td>
                <td>{one.visits}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}
