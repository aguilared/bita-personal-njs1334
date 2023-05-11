import axios from "axios";
import { useState, useCallback } from "react";
import { useRouter } from "next/router";
import useUser from "../hooks/useUser";
import { IoMdClose } from "react-icons/io";

function Home() {
  const { isUser, loadUser } = useUser(); //to Global

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/auth/login1", credentials);
    console.log("RES", res);

    if (res.status === 200) {
      if (!isUser) {
        console.log("no hay Users va a cargar a global", res);
        loadUser(credentials); //load idto global
      }
      router.push("/bitacora");
    }
    if (res.status === 401) {
      router.push("/");
    }
  };

  const handleClose = useCallback(() => {
    console.log("isUser", isUser);
    router.push("/");
  }, [isUser]);

  const title = "Login";

  return (
    <div
      className="
          justify-center 
          items-center 
          flex 
          overflow-x-hidden 
          overflow-y-auto 
          fixed 
          inset-0 
          z-50 
          outline-none 
          focus:outline-none
          bg-neutral-800/70
        "
    >
      <div
        className="
          relative 
          w-full
          md:w-4/6
          lg:w-3/6
          xl:w-2/5
          my-6
          mx-auto 
          h-full 
          lg:h-auto
          md:h-auto"
      >
        {/*content*/}
        <div
          className="
            translate
            duration-300
            h-full
            translate-y-0
            opacity-100"
        >
          <div
            className="
              translate
              h-full
              lg:h-auto
              md:h-auto
              border-0 
              rounded-lg 
              shadow-lg 
              relative 
              flex 
              flex-col 
              w-full 
              bg-white 
              outline-none 
              focus:outline-none"
          >
            {/*header*/}
            <div
              className="
                flex 
                items-center 
                p-6
                rounded-t
                justify-center
                relative"
            >
              <button
                className="
                    p-1
                    border-0 
                    hover:opacity-70
                    transition
                    absolute
                    left-9"
                onClick={handleClose}
              >
                <IoMdClose size={18} />
              </button>
              <div className="text-lg font-semibold">{title}</div>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <div className="flex flex-col gap-4">
                <div className="w-full relative">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="text"
                        placeholder="email"
                        onChange={(e) =>
                          setCredentials({
                            ...credentials,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                    <hr />

                    <hr />
                    <div className="mb-6">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                      </label>
                      <input
                        className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="******************"
                        onChange={(e) =>
                          setCredentials({
                            ...credentials,
                            password: e.target.value,
                          })
                        }
                      />
                      <p className="text-red-500 text-xs italic">
                        Please choose a password.
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Sign In
                      </button>
                      <a
                        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                        href="#"
                      >
                        Forgot Password?
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
