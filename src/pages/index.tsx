import { Main } from "@/templates/Main";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard/portfolio");
  }, []);

  return <Main meta="CNotion">Home</Main>;
};

export default Index;
