/* eslint-disable testing-library/no-debugging-utils */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

test('renders content', () => {
  const blog = {
      title: 'This is a title',
      author: 'I am the author',
      url: 'http://',
      likes: 10
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
        

    // WORKING
    // render(<Blog blog={blog} />)
    // const elementTitle = screen.getByText('This is a title', { exact: false })
    // const elementAuthor = screen.getByText('I am the author', { exact: false })

    // // screen.debug(elementTitle)
    // // screen.debug(elementAuthor)
  
    // expect(elementTitle).toBeDefined()
    // expect(elementAuthor).toBeDefined()

    //WORKING
    // ./Blog file needs to have data-testid attribute
    const { getByTestId } = render(<Blog blog={blog} />) 
    const elementTitle = getByTestId('title')
    const elementAuthor = getByTestId('author')
    expect(elementTitle).toHaveTextContent(
        'This is a title'
        )
    expect(elementAuthor).toHaveTextContent(
        'I am the author'
        )
})


test('clicking the view button show URL and likes correctly', async () => {
    const blog = {
        title: 'This is a title',
        author: 'I am the author',
        url: 'http://',
        likes: 10,
    }
  
    const mockHandler = jest.fn()
  
    // render(
    //   <Blog blog={blog} saveLike={mockHandler} deleteBlog={mockHandler} setToggleView={mockHandler} />
    // )
    const { getByTestId } = render( <Blog blog={blog} toggleView={mockHandler} />) 
  
    const user = userEvent.setup()
    const buttonView = getByTestId('view')
    await user.click(buttonView)
    
    const elementUrl = getByTestId('url')
    expect(elementUrl).toHaveTextContent('http://')
    const elementLikes = getByTestId('likes')
    expect(elementLikes).toHaveTextContent(10)
  
    expect(mockHandler.mock.calls).toHaveLength(0)
  })

  test('clicking the like button twice updates correctly', async () => {
    const blog = {
        title: 'This is a title',
        author: 'I am the author',
        url: 'http://',
        likes: 12
    }
    const mockHandlerLikes = jest.fn(() => {
        blog.likes += 1;
      });
    const user = userEvent.setup()
    
    const { getByTestId } = render(<Blog blog={blog} saveLike={mockHandlerLikes} />);
    
    const likeButton = screen.getByTestId('Like');
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockHandlerLikes).toHaveBeenCalledTimes(2);
    expect(screen.getByTestId('likes').textContent).toContain('likes: 14');
  })

  const blog = {
      title: 'The stacking context',
      author: 'Mozilla',
      url:
          'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context'
  };
  
  test('creates new blog', async () => {


    const createBlog = jest.fn()
    const user = userEvent.setup()
  
    const { container } = render(<BlogForm createBlog={createBlog} />)

    const titleInput = container.querySelector('#title');
    const authorInput = container.querySelector('#author');
    const urlInput = container.querySelector('#url');
    // const titleInput = container.querySelector("input[id='title']");
    // const authorInput = container.querySelector("input[id='author']");
    // const urlInput = container.querySelector("input[id='url']");
    const sendButton = screen.getByText("create");
    
    await user.type(titleInput, `${blog.title}`)
    await user.type(authorInput, `${blog.author}`);
    await user.type(urlInput, `${blog.url}`);
    await user.click(sendButton);
  
    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe("The stacking context");
    expect(createBlog.mock.calls[0][0].author).toBe("Mozilla");
    expect(createBlog.mock.calls[0][0].url).toBe("https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context");
  })