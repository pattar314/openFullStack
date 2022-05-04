import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import  userEvent  from'@testing-library/user-event'
import BlogAddForm from '../components/BlogAddForm'

describe('BlogAddForm tests', () => {
  test('form handler works correctly', () => {
    const newUser = {
      'author': 'testy testerino',
      'title': 'test everything',
      'url': 'test.test'
    }

    const auth = () => {
      return {
        'converted': {
          'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBhdHRhcjQyMCIsImlkIjoiNjIxYzYyZWFjZjM5MzczYTA0ZmUyZDhiIiwiaWF0IjoxNjQ5NjUzMTkyLCJleHAiOjE2NDk2NjAzOTJ9.UK537I-BeDkWlhp4zyn65uTs57n9OIc-WmySBkkT_ME',
          'username': 'pattar420',
          'name': 'pat'
        },
        'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBhdHRhcjQyMCIsImlkIjoiNjIxYzYyZWFjZjM5MzczYTA0ZmUyZDhiIiwiaWF0IjoxNjQ5NjUzMTkyLCJleHAiOjE2NDk2NjAzOTJ9.UK537I-BeDkWlhp4zyn65uTs57n9OIc-WmySBkkT_ME',
        'options': {
          'headers': {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBhdHRhcjQyMCIsImlkIjoiNjIxYzYyZWFjZjM5MzczYTA0ZmUyZDhiIiwiaWF0IjoxNjQ5NjUzMTkyLCJleHAiOjE2NDk2NjAzOTJ9.UK537I-BeDkWlhp4zyn65uTs57n9OIc-WmySBkkT_ME'
          }
        }
      }
    }


    const blogChangeMock = jest.fn()

    render(<BlogAddForm blogChange={blogChangeMock} createAuthorization={auth} />)
    const authorInput = screen.getByPlaceholderText('Please enter authors name')
    const titleInput = screen.getByPlaceholderText('Please enter blog title')
    const urlInput = screen.getByPlaceholderText('Please enter blogs home address')
    const submitButton = screen.getByText('create')

    userEvent.type(authorInput, newUser.author)
    userEvent.type(titleInput, newUser.title)
    userEvent.type(urlInput, newUser.url)
    userEvent.click(submitButton)

    console.log('mock calls: ', blogChangeMock.mock)

    expect(blogChangeMock.mock.lastCall[0]).toStrictEqual(newUser)

  })
})