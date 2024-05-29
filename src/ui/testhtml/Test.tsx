import {Layout} from '#ui/layout'

const testFn = (id: number) => `some params: ${id}`

export const testHTML = (id: number) => {
    const testStr = testFn(id);

    return (
        <Layout
            head={''}
            title='test'
        >
            <h1>{testStr}</h1>
        </Layout>
    )
}