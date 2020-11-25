require('dotenv').config()

const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/
})

module.exports = withMDX(
    {
        pageExtensions: ['js', 'jsx', 'md', 'mdx'],
        env: {
            SENDGRID_API_KEY: process.env.SENDGRID_API_KEY
        }
    }
)

