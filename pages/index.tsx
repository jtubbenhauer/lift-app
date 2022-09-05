import type { NextPage } from "next";
import Head from "next/head";
import data from "../data.json";

const Home: NextPage = () => {
  console.log(data.programs);
  return (
    <div>
      <Head>
        <title>Lift App | Home</title>
      </Head>
      <div>Home</div>
    </div>
  );
};

export default Home;
