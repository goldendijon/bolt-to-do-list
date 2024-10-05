import { rest } from 'msw'

export const handlers = [
  rest.get('/api/todos', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: 1, title: 'Learn React', completed: false },
        { id: 2, title: 'Learn MSW', completed: false },
        { id: 3, title: 'Build awesome app', completed: false },
      ])
    )
  }),

  rest.post('/api/todos', async (req, res, ctx) => {
    const { title } = await req.json()
    return res(
      ctx.status(201),
      ctx.json({ id: Date.now(), title, completed: false })
    )
  }),
]