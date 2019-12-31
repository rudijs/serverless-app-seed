import {Machine, assign} from 'xstate'

const fetchMachine = Machine(
  {
    id: 'fetch',
    initial: 'idle',
    context: {
      results: [],
      message: '',
    },
    states: {
      idle: {
        on: {
          FETCH: 'pending',
        },
      },
      pending: {
        entry: ['fetchData'],
        on: {
          RESOLVE: {target: 'successful', actions: ['setResults']},
          REJECT: {target: 'failed', actions: ['setMessage']},
        },
      },
      failed: {on: {FETCH: 'pending'}},
      successful: {on: {FETCH: 'pending'}},
    },
  },
  {
    actions: {
      setResults: assign((ctx, event) => ({
        results: event.results,
      })),
      setMessage: assign((ctx, event) => ({
        message: event.message,
      })),
    },
  },
)

export default fetchMachine
