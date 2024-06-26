"use client";
import { SideBar, SideMenu } from "@/components";
import "../globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { useRouter } from "next/navigation";
import { useAuthSlice } from "@/hooks";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [value, setValue] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { token, rol, inicioSesion, loading } = useAuthSlice();
  const login = async (username, password) => {
    inicioSesion({ user: username, password });
  };

  useEffect(() => {
    if (token && !loading) {
      console.log("aaaa", store.getState().auth);
      router.push("/menu");
    } else {
    }
  }, [token]);


  return (
    <Provider store={store}>
      <html lang="en">
        <body>
          <div className="relative min-h-screen flex ">
            <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
              <div
                style={{
                  backgroundImage:
                    "url(https://cobanesmicoope.com/img/contactos/agencias/PLAZA-FINANCIERA-min.jpg);",
                }}
                className=" sm:w-1/2 xl:w-3/5 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative"
              >
                <div className="absolute bg-gradient-to-b from-indigo-600 to-blue-500 opacity-50 inset-0 z-0 "></div>

                <ul className="circles">
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
              <div className="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full w-2/5 xl:w-2/5 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white">
                <div className="max-w-md w-full space-y-8">
                  <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">
                      INVENTRACK
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">Ingresa tus credenciales</p>
                  </div>
                  <form className="mt-8 space-y-10" method="POST"
                    onSubmit={(e) => {
                      e?.preventDefault();
                      login(value, password);
                    }}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="relative">
                      <div className="absolute right-3 mt-4"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      </div>
                      <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Usuario</label>
                      <InputText
                        className="px-2 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-indigo-400"
                        id="username"
                        htmlFor="username"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Ingrese su usuario"
                        required
                      />
                    </div>
                    <div className="mt-8 content-center">
                      <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
                        Contraseña
                      </label>
                      <Password
                        className="px-2 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-indigo-400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        feedback={false}
                        placeholder="Ingrese su contraseña"
                        required
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input id="remember_me" name="remember_me" type="checkbox"
                          className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded" />
                        <label for="remember_me" className="ml-2 block text-sm text-gray-900">
                          Remember me
                        </label>
                      </div>
                      <div className="text-sm">
                        <a href="#" className="text-indigo-400 hover:text-blue-500">
                          Forgot your password?
                        </a>
                      </div>
                    </div>
                    <div>
                      <Button
                        label="Sign In"
                        type="submit"
                        className="w-full flex justify-center bg-indigo-400  hover:bg-indigo-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                      ></Button>
                    </div>
                    <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
                      <span> Copyright © INVENTRACK-2024</span>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>

        </body>
      </html>
    </Provider>
  );
}
