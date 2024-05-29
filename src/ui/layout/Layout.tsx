export const Layout = (props: Html.PropsWithChildren<{ head: string; title?: string }>) => {
    return (
      <>
        {'<!doctype html>'}
        <html lang="ru">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>{props.title || 'Mock server!'}</title>
            {props.head}
          </head>
          <body>{props.children}</body>
        </html>
      </>
    );
  }