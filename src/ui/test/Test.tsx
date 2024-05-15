export class Test {
    static render(params: Record<string, string | undefined>) {
        return (
            <div>test render with: {JSON.stringify(params)}</div>
        )
    }
}