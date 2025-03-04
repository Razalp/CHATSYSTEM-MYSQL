import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Github, Lock, LogIn, Mail, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required");
      return false;
    } else if (!re.test(email)) {
      setEmailError("Please enter a valid email");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (password) => {
    if (!password) {
      setPasswordError("Password is required");
      return false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
      console.log("Form submitted", { email, password, name });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black overflow-hidden relative">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        style={{
          background: `radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(0,0,0,1) 70%)`,
        }}
      />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-md w-full space-y-8 bg-white/5 p-8 rounded-xl shadow-2xl backdrop-blur-md border border-white/10 transition-all duration-300"
      >
        <div className="text-center">
          <motion.div
            className="flex justify-center space-x-4 mb-8"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <button
              onClick={() => setIsLogin(true)}
              className={`py-2 px-6 text-sm font-medium rounded-t-lg transition-all duration-200 border-b-2 ${
                isLogin
                  ? "text-white border-white"
                  : "text-gray-400 border-transparent hover:text-white hover:border-gray-300"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`py-2 px-6 text-sm font-medium rounded-t-lg transition-all duration-200 border-b-2 ${
                !isLogin
                  ? "text-white border-white"
                  : "text-gray-400 border-transparent hover:text-white hover:border-gray-300"
              }`}
            >
              Sign Up
            </button>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-2xl font-bold text-white"
          >
            {isLogin ? "Welcome Back" : "Create Your Account"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-2 text-sm text-gray-300"
          >
            {isLogin ? "Sign in to access your account" : "Fill in your information to get started"}
          </motion.p>
        </div>

        <motion.div
          className="flex flex-col space-y-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <button className="group relative w-full flex justify-center py-3 px-4 border border-gray-500 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-black/50 hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-200">
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <Github className="h-5 w-5 text-gray-400 group-hover:text-white" />
            </span>
            Continue with GitHub
          </button>
        </motion.div>

        <motion.div
          className="mt-6 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-black/50 text-gray-400">Or continue with</span>
          </div>
        </motion.div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <AnimatePresence>
              {!isLogin && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label htmlFor="name" className="sr-only">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-500 bg-black/30 placeholder-gray-400 text-white rounded-md focus:outline-none focus:ring-white focus:border-white focus:z-10 sm:text-sm transition-all duration-200"
                      placeholder="Full Name"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) validateEmail(e.target.value);
                  }}
                  className={`appearance-none relative block w-full pl-10 pr-3 py-3 border bg-black/30 placeholder-gray-400 text-white rounded-md focus:outline-none focus:ring-white focus:border-white focus:z-10 sm:text-sm transition-all duration-200 ${
                    emailError ? "border-red-500" : "border-gray-500"
                  }`}
                  placeholder="Email address"
                />
              </div>
              {emailError && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-1 text-sm text-red-400"
                >
                  {emailError}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) validatePassword(e.target.value);
                  }}
                  className={`appearance-none relative block w-full pl-10 pr-10 py-3 border bg-black/30 placeholder-gray-400 text-white rounded-md focus:outline-none focus:ring-white focus:border-white focus:z-10 sm:text-sm transition-all duration-200 ${
                    passwordError ? "border-red-500" : "border-gray-500"
                  }`}
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-white" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-white" />
                  )}
                </button>
              </div>
              {passwordError && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-1 text-sm text-red-400"
                >
                  {passwordError}
                </motion.p>
              )}
            </motion.div>
          </div>

          {isLogin && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-white focus:ring-white border-gray-500 rounded bg-black/30"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link
                  href="#"
                  className="font-medium text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Forgot your password?
                </Link>
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-200"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LogIn className="h-5 w-5 text-black group-hover:text-gray-700" />
              </span>
              {isLogin ? "Sign in" : "Sign up"}
            </button>
          </motion.div>
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="text-center text-xs text-gray-400 mt-4"
        >
          By continuing, you agree to our{" "}
          <Link href="#" className="text-gray-300 hover:text-white">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="text-gray-300 hover:text-white">
            Privacy Policy
          </Link>
          .
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthPage;