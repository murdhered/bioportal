import LoginWithGoogle from "@/components/buttons/LoginWithGoogle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

export default function LoginPage() {
  return (
    // Use a full-screen container with a subtle background color
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <div className="w-full max-w-sm">
        {/* The card container with shadow, border, and rounded corners */}
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">

          {/* Optional: Add an icon or your logo */}
          <div className="text-center mb-4">
            <FontAwesomeIcon icon={faRightToBracket} className="w-10 h-10 text-indigo-600" />
          </div>

          <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
            Sign In
          </h1>
          <p className="text-center mb-8 text-gray-500">
            Welcome back! Please sign in to continue.
          </p>

          <LoginWithGoogle />

          {/* A common UX pattern for future login methods */}
          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-sm">Or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <p className="text-center text-sm text-gray-500">
            More sign-in options coming soon.
          </p>
        </div>
        <p className="text-center text-xs text-gray-400 mt-4">
          By signing in, you agree to our Terms of Service.
        </p>
      </div>
    </div>
  );
}