import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import  userEvent  from'@testing-library/user-event'
import Blog from '../components/Blog'

describe('Blog object tests', () => {

  const testInfo = {
    'title': 'testerino',
    'author': 'testy mctesterson',
    'url': 'test.test',
    'likes': 0,
    'user': [
      {
        '_id': '621c62eacf39373a04fe2d8b',
        'username': 'pattar420',
        'name': 'pat'
      }
    ],
    'id': '623d8a427927a4ab7cc6d5da'
  }



  test('blog starts in nonexpanded form', () => {


    const { container } = render(<Blog blog={testInfo} />)

    const  expandedBottom = container.querySelector('.expandedBottom')

    expect(expandedBottom).toHaveStyle({ 'display': 'none' })
  })

  test('blog expands when button is pressed', () => {


    const { container } = render(<Blog blog={testInfo} />)

    const  expandedBottom = container.querySelector('.expandedBottom')


    const expandButton = screen.getByText('show')
    userEvent.click(expandButton)


    expect(expandedBottom).not.toHaveStyle({ 'display': 'none' })
  })

  test('event handler works correctly', () => {

    const mockLikeFunction = jest.fn()

    render (<Blog blog={testInfo} addLike={mockLikeFunction} />)

    const expandButton = screen.getByText('show')
    userEvent.click(expandButton)
    const likeButton = screen.getByText('Like')
    userEvent.click(likeButton)
    userEvent.click(likeButton)

    expect(mockLikeFunction.mock.calls).toHaveLength(2)
  })
})