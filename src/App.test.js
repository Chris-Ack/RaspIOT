import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';


test('If an Element with specific text exists', () => {
  render(<App />);
  const element = screen.getByText(/Johnny Five BLINKS!/i);
  expect(element).toBeInTheDocument();
});

test('Test if the button changes its Text after being clicked.', async () => {
  render(<App />)
  fireEvent.click(screen.getByText(/Light On/i))
  const item = await screen.getByText("Light Off")
  expect(item).toBeDefined();
});

/* DOES NOT WORK YET

import { rest } from 'msw'
import { setupServer } from 'msw/node'


beforeAll(() => server.listen())

afterAll(() => server.close())


const server = setupServer(
    rest.get(`${process.env.REACT_APP_URL}/api/Camera`, (req, res, ctx) => {
      return res(
        ctx.delay(15),
        ctx.status(200, 'Mocked Success'),
        ctx.json({
          message: "Mocked response JSON body"
        }),
      )
    })
);


test('if a Mock-API call receives the expected HTML Status.', async () => {
  render(<App />)
  await fireEvent.click(screen.getByTestId("mockTestButton"))
  const item = await screen.getByTestId("mockTestButton")
  
  expect(item).toHaveTextContent("mockTest")
})
*/