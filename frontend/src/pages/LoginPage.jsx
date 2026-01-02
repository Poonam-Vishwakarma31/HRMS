import React from "react";

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center bg-gray-100 h-screen">
      <form className="bg-gray-300 p-8 rounded shadow-md space-y-6 w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold mb-4">Login</h1>
        </div>
        <div className="flex justify-center items-center gap-4">
          <label htmlFor="email">Email:</label>
          <input
            className="border border-gray-700 rounded px-4 py-2"
            type="email"
            id="email"
            name="email"
            required
          />
        </div>
        <div className="flex justify-center items-center gap-4">
          <label htmlFor="password">Password:</label>
          <input
            className="border border-gray-700 rounded px-4 py-2"
            type="password"
            id="password"
            name="password"
            required
          />
        </div>
        <div className="flex justify-center">
          <button
            className="bg-orange-700 text-white px-4 py-2 rounded hover:bg-orange-800"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
