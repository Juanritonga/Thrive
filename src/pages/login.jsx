import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import authService from "@/services/auth.service";
import { useImageCarousel } from "@/hooks/useImageCarousel";
import { validateEmail } from "@/utils/validation";

const CAROUSEL_IMAGES = [
  "/thrivewp.jpg",
  "/thrivewp.jpg",
  "/thrivewp.jpg",
  "/thrivewp.jpg",
];

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { currentImageIndex } = useImageCarousel(CAROUSEL_IMAGES, 3000);

  const validateForm = () => {
    if (!username || !password) {
      setError("Please enter both email/Whatsapp and password.");
      return false;
    }

    if (!validateEmail(username)) {
      setError("Please enter a valid email.");
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    setError("");

    try {
      const response = await authService.login(username, password);
      setIsAuthenticated(true);
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.message || "An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="lg:w-2/3 w-full h-1/2 lg:h-full bg-cover bg-center flex justify-center items-center relative">
        <div
          className="absolute w-full h-full bg-cover bg-center transition-all duration-500"
          style={{
            backgroundImage: `url(${CAROUSEL_IMAGES[currentImageIndex]})`,
          }}
        />
        <CarouselIndicators
          total={CAROUSEL_IMAGES.length}
          current={currentImageIndex}
        />
      </div>

      <div className="lg:w-1/3 w-full h-1/2 lg:h-full">
        <div className="w-full bg-custom-blue">
          <Logo />
        </div>

        <div className="w-full bg-white">
          <div className="container bg-white mx-auto mt-4 lg:mt-10 px-4 sm:px-6 md:px-8 lg:px-10">
            <div className="w-full bg-white py-6">
              <h2 className="text-lg lg:text-xl font-semibold text-custom-blue mb-4 lg:mb-6">
                Login
              </h2>

              {error && (
                <p className="text-red-500 mb-4 lg:mb-6 p-3 bg-red-50 rounded">
                  {error}
                </p>
              )}

              <InputField
                type="text"
                icon="fa-user"
                placeholder="Email / Whatsapp"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
              />

              <InputField
                type="password"
                icon="fa-lock"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />

              <div className="text-center mb-4 lg:mb-6">
                <a
                  href="#"
                  className="text-custom-blue text-sm lg:text-base hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              <button
                className="w-full lg:w-2/3 font-bold bg-custom-blue text-white py-3 lg:py-4 rounded-lg mb-4 lg:mb-6 mx-auto block hover:bg-blue-900 transition-colors disabled:opacity-50"
                onClick={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Log in"}
              </button>

              <div className="text-center text-gray-400 mt-10 lg:mt-16 text-sm lg:text-base">
                Powered by Altru
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-components
const Logo = () => (
  <div className="flex justify-center py-4 lg:py-8">
    <img
      src="./thrive.png"
      alt="Company Logo"
      className="max-w-[80px] lg:max-w-[100px] w-auto h-auto mb-2 lg:mb-4"
    />
  </div>
);

const InputField = ({ type, icon, placeholder, value, onChange, disabled }) => (
  <div className="mb-4 lg:mb-6">
    <div className="flex items-center border border-gray-300 rounded-lg p-2">
      <i
        className={`fa-solid ${icon} bg-gray-200 text-gray-400 mr-2 p-2 lg:p-4 rounded-lg`}
      />
      <input
        type={type}
        placeholder={placeholder}
        className="w-full outline-none text-sm lg:text-base"
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  </div>
);

const CarouselIndicators = ({ total, current }) => (
  <div className="absolute bottom-6 lg:bottom-12 flex justify-center items-center space-x-2 bg-white p-2 rounded-lg">
    {Array.from({ length: total }).map((_, index) => (
      <div
        key={index}
        className={`w-2 h-2 rounded-full ${
          current === index ? "bg-custom-blue" : "bg-gray-400"
        }`}
      />
    ))}
  </div>
);

// PropTypes
Login.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};

InputField.propTypes = {
  type: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

CarouselIndicators.propTypes = {
  total: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
};

export default Login;
