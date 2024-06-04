import {Layout} from '#ui/layout'

const testFn = (id: number) => `some params: ${id}`

export const testHTML = (id: number) => {
    const testStr = testFn(id);
    const head = (
        <>
            <link rel="stylesheet" href="/style.css" />
        </>
    )

    return (
        <Layout
            title='test'
            head={head}
        >
            <h1>{testStr}</h1>
        </Layout>
    )
}