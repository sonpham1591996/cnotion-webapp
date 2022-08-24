import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard/portfolio')
  }, [])

  return (
    <Main
      meta={
        <Meta
          title="TC Portfolio"
          description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
        />
      }
    >
    </Main>
  );
};

export default Index;
