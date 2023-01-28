/* eslint-disable testing-library/no-debugging-utils */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  //Method #1
    //   render(<Note note={note} />)
    //   const element = screen.getByText('Component testing is done with react-testing-library')
    //   expect(element).toBeDefined()

  // Method #2
    // const { container } = render(<Note note={note} />)
    // const div = container.querySelector('.note')
    // expect(div).toHaveTextContent(
    //     'Component testing is done with react-testing-library'
    //     )
        

    render(<Note note={note} />)

    const element = screen.getByText('Component testing is done with react-testing-library')

    screen.debug(element)
  
    expect(element).toBeDefined()

  // ./Note file needs to have data-testid attribute
    // const { getByTestId } = render(<Note note={note} />) 
    // const element = getByTestId('note')
    // expect(element).toHaveTextContent(
    //     'Component testing is done with react-testing-library'
    //     )
})


test('clicking the button calls event handler once', async () => {
    const note = {
      content: 'Component testing is done with react-testing-library',
      important: true
    }
  
    const mockHandler = jest.fn()
  
    render(
      <Note note={note} toggleImportance={mockHandler} updateLabel={mockHandler} />
    )
  
    const user = userEvent.setup()
    const button = screen.getByText('make not important')
    await user.click(button)
  
    expect(mockHandler.mock.calls).toHaveLength(2)
  })

  test('renders content', () => {
    const note = {
      content: 'Does not work anymore :(',
      important: true
    }
  
    render(<Note note={note} />)
  
    // Method #1
    // const element = screen.getByText('Does not work anymore :(')

    // Method #2
    const element = screen.getByText(
      'Does not work anymore :(', { exact: false }
    )
  
    // Method #3 - findByText returns a promise
    // const element = await screen.findByText('Does not work anymore :(')

    expect(element).toBeDefined()
  })

  test('does not render this', () => {
    const note = {
      content: 'This is a reminder',
      important: true
    }
  
    render(<Note note={note} />)
  
    const element = screen.queryByText('do not want this thing to be rendered')
    expect(element).toBeNull()
  })