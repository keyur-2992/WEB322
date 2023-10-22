
module.exports = {
  // ... (existing configuration)

  // Specify your .html files here to be watched by Tailwind CSS
  content: ['./Public/**/*.html'],

  // Add plugins to the configuration
  plugins: [
    require('daisyui'),
    require('@tailwindcss/typography'),
    // ... (other plugins if you have any)
  ],

  // Customize your theme if needed
  theme: {
    extend: {
      // Add your custom theme styles here
    },
  },
};
