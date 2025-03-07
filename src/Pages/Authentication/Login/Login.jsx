import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2'; 
import useAuth from '../../../Hooks/useAuth';
import { saveUser } from '../../../Hooks/api/utils';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, signInWithGoogle, loading, user } = useAuth(); // Assuming useAuth hook is defined
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || '/';

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signIn(email, password);
      navigate(from, { replace: true });
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'You have successfully logged in!',
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: err?.message || 'Something went wrong!',
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const data = await signInWithGoogle();
      await saveUser(data?.user); // Save user if needed
      navigate(from, { replace: true });
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'You have successfully logged in with Google!',
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: err?.message || 'Something went wrong!',
      });
    }
  };

  if (loading) return <LoadingSpinner />;
  if (user) return <Navigate to={from} replace={true} />;

  return (
    <div
      className="relative bg-fixed min-h-screen bg-cover bg-center overflow-auto flex items-center justify-center"
      style={{ backgroundImage: "url('https://i.ibb.co.com/yTNXT8J/motso.png')" }}
    >


      <div
        className="relative max-w-xl mx-3 md:mx-0 w-full p-10 bg-white bg-opacity-20 backdrop-blur-sm shadow-lg z-10 rounded-md"
        data-aos="fade-up"
      >
        <h2 className="text-3xl font-bold text-center text-black mb-2">Welcome Back</h2>
        <p className="text-black text-center text-xs md:text-sm">Glad to see you again</p>
        <p className="text-black mb-4 text-center text-xs md:text-sm">Log in to your account below</p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative flex items-center">
            <span className="absolute">
              <MdEmail className="ml-3 text-gray-600 text-2xl" />
            </span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              className="block w-full py-3 text-gray-700 bg-white border rounded-md px-11"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative flex items-center">
            <span className="absolute">
              <RiLockPasswordFill className="ml-3 text-gray-600 text-2xl" />
            </span>
            <span className="absolute top-4 right-4 cursor-pointer" onClick={togglePasswordVisibility}>
              {passwordVisible ? <FaEye className="text-gray-700" /> : <FaEyeSlash className="text-gray-700" />}
            </span>
            <input
              type={passwordVisible ? 'text' : 'password'}
              name="password"
              className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-md"
              placeholder="Enter Your Password"
              autoComplete="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-[#2AB7B1] hover:bg-[#1c7975] ease-in-out btn border-none rounded-md"
          >
            Login
          </button>
        </form>

        <div className="flex items-center justify-center px-1 mt-4 pb-3">
          <div className="flex-grow border-t border-gray-400"></div>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>


        <p className="text-sm text-center text-black mt-4">
          New Here?{' '}
          <Link to="/register" className="font-medium text-black hover:underline">
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
