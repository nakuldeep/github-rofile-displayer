import { useState, useEffect } from "react";
import GithubDisplayCard from "./component/GithubDisplayCard";
import Card from "./component/Card";
import Clip from "./component/Clip";
import Go from "./component/Go";

function App() {
  const [username, setUsername] = useState("nakuldeep");
  const [query, setQuery] = useState("nakuldeep");
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  function submit(e) {
    e.preventDefault();
    setQuery(username.replace(" ", "").toLowerCase());
  }

  useEffect(() => {
    const apiCall = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.github.com/users/${query}`);
        const data = await response.json();
        if (data.message === "Not Found") {
          setUserData(null);
          return;
        }
        setUserData(data);
      } catch (e) {
        console.log("Error:", e.message);
      } finally {
        setLoading(false);
      }
    };

    apiCall();
  }, [query]);

  // console.log("Outside useEffect:", userData);

  return (
    <>
      {/* search Card */}
      <form onSubmit={submit}>
        <div className=" max-w-3xl w-[90vw] bg-white rounded-2xl shadow-md p-5 flex-col justify-between mt-5">
          <h2 className="text-2xl  mb-1 ">Github Profile Viewer</h2>
          <div className=" flex-col justify-between md:flex-row">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="h-10 p-2.5 w-full border-gray-400 border-[1px] rounded-[8px] mb-2"
              name=""
              id=""
            />
            <button className=" h-10 w-full bg-[#578FCA] rounded-[8px] text-white text-xl mb-1 hover:bg-[#3674B5]">
              Serach
            </button>
          </div>
        </div>
      </form>

      {/* Loading & Error */}
      {loading && (
        <div className="flex justify-center items-center mt-5">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {/* user not Found */}
      {!loading && !userData && (
        <p className="text-center text-red-500 mt-5 ">User not found</p>
      )}

      {/* Profile Displayer Card */}
      {userData && (
        <div className=" max-w-3xl w-[90vw]  bg-white rounded-2xl shadow-md p-5 flex flex-col justify-center mt-5 md:flex-row md:gap-5 ">
          
          <img
            src={userData.avatar_url}
            alt={userData.name}
            className="h-25 w-25 rounded-2xl border-0 mr"
          />

          <div>
            <div className="mt-4 mb-3 flex gap-2.5 align-middle">
              <h3>{userData.name}</h3>
              <p className="text-xs font-extralight text-gray-700">
                @{userData.login}
              </p>
            </div>
            <p className=" text-gray-700">{userData.bio}</p>

            <div className="mt-4 grid grid-cols-2 gap-3  md:grid-cols-4">
              <Card no={userData.followers} data="FOLLOWERS" />
              <Card no={userData.following} data="FOLLOWINGS" />
              <Card no={userData.public_repos} data="REPOS" />
              <Card no={userData.public_gists} data="GISTS" />
            </div>
            <div className="mt-4 gap-1.5 flex flex-wrap ">
              {userData.location ? <Clip data={userData.location} /> : null}
              {userData.created_at ? (
                <Clip
                  data={new Date(userData.created_at).toLocaleDateString()}
                />
              ) : null}
              {userData.twitter_username ? (
                <Clip data={userData.twitter_username} />
              ) : null}
              {userData.blog ? <Clip data={userData.blog} /> : null}
            </div>
            <div className="mt-4 gap-3 flex">
              <Go url={userData.html_url} data="Open Github" />
              <Go
                url={`${userData.html_url}?tab=repositories`}
                data="View Repos"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
