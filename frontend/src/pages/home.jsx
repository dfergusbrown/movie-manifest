import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-dvh max-w-screen flex flex-col items-center justify-center">
      <section className="">
        <div id="logo" className="flex flex-col items-center justify-center">
          <img src="src/assets/movie-reel.png" style={{ height: 100 }} />
          <h1 className="text-3xl p-3">Movie Manifest</h1>
        </div>
        <div className="">
          <NavLink className="text-3xl p-3 border-4 rounded-xl m-3" to="/list">
            LIST
          </NavLink>
          {/* <button className="text-3xl p-3 border-4 rounded-xl m-3">LIST</button> */}
          <button className="text-3xl p-3 border-4 rounded-xl m-3">
            ADD MOVIE
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
