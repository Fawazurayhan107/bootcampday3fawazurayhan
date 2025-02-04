import { Form, useActionData, Navigate} from "react-router-dom"

export async function action ({ request}) {
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");


    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/auth/register`,
      {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password}),
    },
  );

    if (response.ok) {
        return {success: true};
    } else {
        return {error:"Failed to register"};
    }

}

export function Register(){
  const actionData = useActionData();

  if (actionData?.success) {
    return <Navigate to="/login" />;
  }

    return(
        <div className="flex items-center justify-center min-h-screen bg-lime-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <Form method="post" action="/register">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="w-full px-3 py-2 border rounded-full"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="w-full px-3 py-2 border rounded-full"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                required
                className="w-full px-3 py-2 border rounded-full"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 text-white bg-lime-500 rounded"
            >
              Register
            </button>
          </div>
        </Form>
      </div>
    </div>
    )
}