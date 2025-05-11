import React from 'react';

const SignUpForm: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full space-y-6">
        <button className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm">
          Back
        </button>

        <div>
          <h2 className="text-2xl font-bold">Sign up for free</h2>
          <p className="text-sm text-gray-500">Start managing your projects on Projectr</p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium">First name</label>
            <input
              type="text"
              placeholder="Jane"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Last name</label>
            <input
              type="text"
              placeholder="Doe"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              placeholder="janedoe"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="jane.doe@example.com"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <label className="text-sm text-gray-700">
              I agree to the Terms of Service and Privacy Policy.
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            Sign up
          </button>
        </form>

        <p className="text-sm text-center text-gray-500">
          Already have an account?{' '}
          <a href="#" className="font-medium text-black hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
