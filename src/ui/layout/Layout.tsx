import { Html } from '@elysiajs/html';

export const Layout = (props: { head?: JSX.Element; title?: string; children: JSX.Element; }) => {
    return (
        <>
            {'<!doctype html>'}
            <html lang="ru">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>{props.title || 'Mock server!'}</title>
                    <link rel="stylesheet" href="/static/ui/layout/styles.css" />
                    {props.head}
                </head>
                <body id='app'>
                    <header>
                        <nav>
                            <a href='/ui/editor'>DB Editor</a>
                        </nav>
                    </header>
                    {props.children}
                </body>
            </html>
        </>
    );
};