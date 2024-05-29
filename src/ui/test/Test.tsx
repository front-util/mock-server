export class Test {
    static render(params: Record<string, string | undefined>) {
        return (
            <html>
                <head>
                    <title>hello</title>
                </head>
                <div>test render with: {JSON.stringify(params)}</div>
            </html>
        )
    }
}

export const test2 = (...args) => {
    console.log('args', args)
    return (
        <html lang="en">
            <head>
                <title>Hello World</title>
            </head>
            <body>
                <h1>Hello World</h1>
            </body>
        </html>
    )
}