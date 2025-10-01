import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: 'Blazar Pay Docs',
  project: {
    link: 'https://github.com/blazarpay/docs',
  },
  docsRepositoryBase: 'https://github.com/blazarpay/docs/tree/main/apps/docs',
  footer: {
    text: '© 2024 Blazar Pay. Built with Nextra.',
  },
  editLink: {
    text: 'Edit this page on GitHub →',
  },
  feedback: {
    content: 'Question? Give us feedback →',
    labels: 'feedback',
  },
}

export default config
