export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <style>{`
          /* Reset only for studio */
          html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            overflow: hidden;
          }
          
          /* Override any inherited styles that might break studio layout */
          * {
            box-sizing: border-box;
          }
          
          /* Ensure studio container fills viewport */
          #__next {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
          }
          
          /* Studio specific resets */
          .wrapper,
          .main,
          .children {
            all: unset;
            display: block;
          }
        `}</style>
      </head>
      <body>
        <div style={{ 
          width: '100vw', 
          height: '100vh', 
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative'
        }}>
          {children}
        </div>
      </body>
    </html>
  );
}
