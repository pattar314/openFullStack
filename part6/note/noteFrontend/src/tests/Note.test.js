import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from '../components/Note'

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  const mockHandler = jest.fn()

  render(<Note note={note} toggleImportant={mockHandler} />)

  const button = screen.getByText('make not important')
  userEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)

  /* const element = screen.getByText('Component testing is done with react-testing-library')
  expect(element).toBeDefined() */
})