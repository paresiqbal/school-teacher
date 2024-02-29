"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegsiterPage() {
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
        fullname: e.target.fullname.value,
        role: e.target.role.value,
      }),
    });
  };

  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700 flex-col">
      <form className="space-y-6" action="#" onSubmit={(e) => handleSubmit(e)}>
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
          Register
        </h3>
        <div>
          <label
            htmlFor="username"
            className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
          >
            Your username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
          >
            Your password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          />
        </div>
        <div>
          <label
            htmlFor="fullname"
            className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
          >
            Fullname
          </label>
          <input
            type="text"
            name="fullname"
            id="fullname"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="role">Role :</label>
          <input type="text" name="role" id="role" />
        </div>
        <div className="flex items-start">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="remember"
                aria-describedby="remember"
                type="checkbox"
                className="bg-gray-50 border border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              />
            </div>
          </div>
          <Link
            href="#"
            className="text-sm text-blue-700 hover:underline ml-auto dark:text-blue-500"
          >
            Lost Password?
          </Link>
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create your account
        </button>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
          Already have an account
          <Link
            href="/login"
            className="text-blue-700 hover:underline dark:text-blue-500"
          >
            Login Account
          </Link>
        </div>
      </form>
    </div>
  );
}
