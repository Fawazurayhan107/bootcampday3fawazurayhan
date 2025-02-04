import { Form, Navigate, useActionData} from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
    {
      method:"POST",
      headers:{
      "Content-Type":"application/json",
    },
    body: JSON.stringify({email,password})
  });
  
  if (response.ok) {
    const data = await response.json();
    return { token: data.token };
  } else {
    return { error: "Invalid email or password" };
  }
}
export function Login() {
  const actionData = useActionData();
  const {login} = useAuth();

  if (actionData?.token) {
    login(actionData.token);
    return <Navigate to="/products"/>

  }

    return (
      <div className="flex items-center justify-center min-h-screen bg-lime-100 ">
        <div
          className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md"
        >
          <h2 className="text-2xl font-bold text-center">Login</h2>
          <Form method="post" action="/login">
            <div className="space-y-4">
              <div>
                <label
                  for="email"
                  className="block text-sm font-medium text-gray-700"
                  >Email</label
                  >
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    className="w-full px-3 py-2 border rounded-full"
                  />
                  <p
                    id="emailError"
                    className="text-red-500 text-sm mt-1"
                  ></p>
                </div>
                <div>
                  <label
                    for="password"
                    className="block text-sm font-medium text-gray-700"
                    >Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    required
                    className="w-full px-3 py-2 border rounded-full"
                  />
                  <p
                    id="passwordError"
                    className="text-red-500 text-sm mt-1"
                  ></p>
                </div>
                <button
                  type="submit"
                  className="w-full py-2 text-white bg-lime-400 rounded"
                >
                  Login
                </button>
              </div>
            </Form>
          </div>
        </div> 
    );
}