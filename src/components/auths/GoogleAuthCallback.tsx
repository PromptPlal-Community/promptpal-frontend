import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const GoogleAuthCallback = () => {
  const [searchParams] = useSearchParams();

useEffect(() => {
  const token = searchParams.get("accessToken");
  const user = searchParams.get("user");
  const error = searchParams.get("error");

  try {
    if (error) {
      if (window.opener && !window.opener.closed) {
        window.opener.postMessage({ type: "GOOGLE_AUTH_ERROR", error }, window.location.origin);
        setTimeout(() => window.close(), 500);
      } else {
        console.warn("Not in popup. Redirecting...");
        window.location.href = "/login?error=" + encodeURIComponent(error);
      }
      return;
    }

    if (token && user) {
      const userData = JSON.parse(user);
      if (window.opener && !window.opener.closed) {
        window.opener.postMessage(
          { type: "GOOGLE_AUTH_SUCCESS", token, user: userData },
          window.location.origin
        );
        setTimeout(() => window.close(), 500);
      } else {
        console.warn("Not in popup. Redirecting...");
        localStorage.setItem("token", token);
        window.location.href = "/";
      }
    }
  } catch (err) {
    console.error("Callback error:", err);
    if (window.opener && !window.opener.closed) {
      window.opener.postMessage(
        { type: "GOOGLE_AUTH_ERROR", error: (err as Error).message },
        window.location.origin
      );
      setTimeout(() => window.close(), 500);
    } else {
      window.location.href = "/login?error=Unexpected";
    }
  }
}, [searchParams]);


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Completing Google authentication...</p>
      </div>
    </div>
  );
};

export default GoogleAuthCallback;
