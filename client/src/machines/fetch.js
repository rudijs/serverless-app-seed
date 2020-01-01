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
          onDone: {target: 'successful', actions: ['setResults']},
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
        initial: 'unknown',
        on: {FETCH: 'pending'},
        states: {
          unknown: {
            on: {
              '': [
                {target: 'withData', cond: 'hasData'},
                {target: 'withoutData'},
              ],
            },
          },
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
      hasData: (ctx, event) => !!ctx.results && ctx.results.length > 0,
    },
  },
)

export default fetchMachine
