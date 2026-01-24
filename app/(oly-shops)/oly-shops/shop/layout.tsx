import { SanityLive } from "@/sanity/lib/live";
// import "../gl
// ";


const Layout = ({children}: {children: React.ReactNode}) => {
  return (
   <>
   
        <main>{children}</main>
        <SanityLive/>
   </>
    
  );
};

export default Layout;