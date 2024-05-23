import { useRouter } from "next/router";
import type { DocsThemeConfig } from "nextra-theme-docs";
import { useConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
    //https://nextra.site/docs/docs-theme/theme-configuration#logo
    logo: <span>owl.build</span>,
    //https://nextra.site/docs/docs-theme/theme-configuration#project-link
    project: {
        //TODO: Replace with public repo link
        link: "https://github.com/owlprotocol",
    },
    //https://nextra.site/docs/docs-theme/theme-configuration#chat-link
    chat: {
        link: "https://discord.owl.build",
    },
    //https://nextra.site/docs/docs-theme/theme-configuration#docs-repository
    //TODO: Replace with public repo link
    docsRepositoryBase:
        "https://github.com/owlprotocol/workspace/tree/main/packages-public/docs",
    //https://nextra.site/docs/docs-theme/theme-configuration#seo-options
    useNextSeoProps() {
        const { asPath } = useRouter();
        if (asPath !== "/") {
            return {
                titleTemplate: "%s – Owl Protocol",
            };
        }
    },
    //https://nextra.site/docs/docs-theme/theme-configuration#dynamic-tags-based-on-page
    //TODO: Configure dynamic tags
    //https://nextra.site/docs/docs-theme/theme-configuration#favicon-glyph-experimental
    //TODO: Configure glyph
    head: function useHead() {
        const { title } = useConfig();

        return (
            <>
                <meta name="msapplication-TileColor" content="#fff" />
                <meta name="theme-color" content="#fff" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta httpEquiv="Content-Language" content="en" />
                <meta name="description" content="Owl Protocol Docs." />
                <meta
                    name="apple-mobile-web-app-title"
                    content="Owl Protocol"
                />
                <link rel="icon" href="/logo.png" type="image/svg+xml" />
                <link rel="icon" href="/logo.png" type="image/png" />
            </>
        );
    },
    sidebar: {
        titleComponent({ title, type }) {
            if (type === "separator") {
                return <span className="cursor-default">{title}</span>;
            }
            return <>{title}</>;
        },
        defaultMenuCollapseLevel: 1,
        toggleButton: true,
    },
    footer: {
        text: (
            <div className="flex w-full flex-col items-center sm:items-start">
                <p className="mt-6 text-xs">
                    © {new Date().getFullYear()} Owl Protocol.
                </p>
            </div>
        ),
    },
    toc: {
        backToTop: true,
    },
};

export default config;
