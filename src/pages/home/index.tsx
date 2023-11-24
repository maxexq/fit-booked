import Layout from "@/components/layout";

const Home = () => {
  return (
    <Layout isMainPage>
      <div className="flex gap-2">
        <h2 className="font-semibold">
          Welcome{" "}
          <span className="text-[#b6ff00]">
            {localStorage.getItem("username")}
          </span>
        </h2>
      </div>
    </Layout>
  );
};

export default Home;
