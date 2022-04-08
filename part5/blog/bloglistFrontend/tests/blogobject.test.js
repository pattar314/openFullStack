import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from '../src/components/Blog'

describe('Blog object tests', () => {



  test('blog starts in nonexpanded form', () => {
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

    render(<Blog blog={testInfo} />)

    const nonExistantText = screen.getByText('url')

    expect(nonExistantText).not.toBeDefined()
  })
})