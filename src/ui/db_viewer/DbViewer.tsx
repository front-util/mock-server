import { Html } from '@elysiajs/html';

import {Layout} from '#ui/layout';

export const DbViewer = () => {
    const head = (
        <>
            <link rel="stylesheet" href="/static/ui/db_viewer/styles.css" />
            <link href="https://cdnjs.cloudflare.com/ajax/libs/jsoneditor/9.10.4/jsoneditor.min.css" rel="stylesheet" type="text/css" />
            <script defer src="https://cdnjs.cloudflare.com/ajax/libs/jsoneditor/9.10.4/jsoneditor.min.js"></script>
            <script defer src="https://bgrins.github.io/filereader.js/filereader.js"></script>
            <script defer src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2014-11-29/FileSaver.min.js"></script>
            <script defer src="/static/ui/db_viewer/DbViewerWC.js"></script>
        </>
    );

    return (
        <Layout
            title='Database Editor'
            head={head}
        >
            <>
                <main class='content'>
                    <h1>Database Editor</h1>
                    {/** @ts-ignore */}
                    <db-editor></db-editor>
                </main>
            </>
        </Layout>
    );
};
