import { Html } from '@elysiajs/html';

import {Layout} from '#ui/layout';

export const NotFound = () => {
    return (
        <Layout
            title='404'
        >
            <main style={{justifyContent: 'center',}}>
                <h1>404</h1>
                <p>Page Not Found 😱</p>
            </main>
        </Layout>
    );
};