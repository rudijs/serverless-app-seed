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
        invoke: {
          src: 'fetchData',
          onDone: [
            {
              target: 'successful.withData',
              actions: ['setResults'],
              cond: 'hadData',
            },
            {target: 'successful.withoutData', actions: ['setResults']},
          ],
          onError: {target: 'failed', actions: ['setMessage']},
        },
        // entry: ['fetchData'],
        // on: {
        //   RESOLVE: {target: 'successful', actions: ['setResults']},
        //   REJECT: {target: 'failed', actions: ['setMessage']},
        // },
      },
      failed: {on: {FETCH: 'pending'}},
      successful: {
        on: {FETCH: 'pending'},
        states: {
          withData: {},
          withoutData: {},
        },
      },
    },
  },
  {
    actions: {
      setResults: assign((ctx, event) => ({
        results: event.data,
        // results: event.results,
      })),
      setMessage: assign((ctx, event) => ({
        message: event.data,
        // message: event.message,
      })),
    },
    guards: {
      hadData: (ctx, event) => {
        return event.data && event.data.length > 0
      },
    },
  },
)

export default fetchMachine
