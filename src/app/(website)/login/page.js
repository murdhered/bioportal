import LoginWithGoogle from "@/components/buttons/LoginWithGoogle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="w-full max-w-sm">
        <div className="bg-slate-800 p-8 rounded-xl shadow-lg border border-gray-700">

          <div className="text-center mb-4">
            <FontAwesomeIcon icon={faRightToBracket} className="w-10 h-10 text-indigo-400" />
          </div>

          <h1 className="text-4xl font-bold text-center mb-2 text-white">
            Sign In
          </h1>
          <p className="text-center mb-8 text-gray-400">
            Welcome back! Please sign in to continue.
          </p>

          <LoginWithGoogle />

          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-600"></div>
            <span className="flex-shrink mx-4 text-gray-500 text-sm">Or</span>
            <div className="flex-grow border-t border-gray-600"></div>
          </div>

          <p className="text-center text-sm text-gray-500">
            More sign-in options coming soon.
          </p>
        </div>
        <p className="text-center text-xs text-gray-500 mt-4">
          By signing in, you agree to our Terms of Service.
        </p>
      </div>
    </div>
  );
}
