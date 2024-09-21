/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colorss: {
        green:'rgba(22,198,179,.25)',
        pink:'rgba(190,89,190,.25)',
        blue:'rgba(31,128,232,.25)',
        yellow:'rgba(255,215,0,.25)',
        red:'rgba(255,0,0,.25)',
      },
      addComponents: {
        'my-button': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '10px 15px',
          margin: '10px 200px',
          borderRadius: '4px',
          backgroundColor: '#008000',
          color: '#ffffff',
        },
      },
    },
  },
  plugins: [],
}

