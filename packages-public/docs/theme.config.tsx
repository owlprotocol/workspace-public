import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
    //https://nextra.site/docs/docs-theme/theme-configuration#logo
    logo: <span>owl.build</span>,
    //https://nextra.site/docs/docs-theme/theme-configuration#project-link
    project: {
        //TODO: Replace with public repo link
        link: 'https://github.com/owlprotocol/workspace/packages-public/docs',
    },
    //https://nextra.site/docs/docs-theme/theme-configuration#chat-link
    chat: {
        link: 'https://discord.owl.build',
    },
    //https://nextra.site/docs/docs-theme/theme-configuration#docs-repository
    //TODO: Replace with public repo link
    docsRepositoryBase: 'https://github.com/owlprotocol/workspace/tree/main/packages-public/docs',
    footer: {
        text: 'owl.build',
    },
    //https://nextra.site/docs/docs-theme/theme-configuration#seo-options
    //TODO: Configure SEO props
    useNextSeoProps() {
        return {
            titleTemplate: '%s'
        }
    },
    //https://nextra.site/docs/docs-theme/theme-configuration#dynamic-tags-based-on-page
    //TODO: Configure dynamic tags
    //https://nextra.site/docs/docs-theme/theme-configuration#favicon-glyph-experimental
    //TODO: Configure glyph
}

export default config
