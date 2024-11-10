import { useNavigate } from "react-router-dom";
import login from "../../assets/signing.svg";
import { useState, useEffect } from "react";


const AUTO_LOGOUT_TIME = 300000;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const navigate = useNavigate();
  let timeoutId: NodeJS.Timeout;

  const startAutoLogout = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      navigate('/');
    }, AUTO_LOGOUT_TIME);
  };


  // UseEffect to set up and clean up the auto logout timer
  useEffect(() => {
    const resetLogoutTimer = () => startAutoLogout();
    
    window.addEventListener("mousemove", resetLogoutTimer);
    window.addEventListener("keypress", resetLogoutTimer);
    startAutoLogout();

    return () => {
      window.removeEventListener("mousemove", resetLogoutTimer);
      window.removeEventListener("keypress", resetLogoutTimer);
      clearTimeout(timeoutId);
    };
  }, []);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted", { email, password });

      navigate('/token');
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Pane */}
      <div className="hidden lg:flex items-center justify-center flex-1 bg-[#3845cc] text-black">
        <div className="max-w-md text-center">
          <img
            src={login}
            alt="Illustration"
            className="w-full"
            title="Illustration"
          />
        </div>
      </div>

      {/* Right Pane */}
      <div className="flex flex-col justify-center flex-1 bg-gray-100">
        <div className="px-8 md:px-16">
          {/* Heading */}
          <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-lg text-gray-600 mb-8">
            Hear what your customers have to say about your products and
            services.
          </p>

          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? "border-red-500" : ""
                }`}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-2">{errors.email}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? "border-red-500" : ""
                }`}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-2">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
            
              className="w-full px-4 py-2 text-white bg-primary rounded-lg hover:bg-slate-600 text-2xl font-semibold shadow-md"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
