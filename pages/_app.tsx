import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import store from "../Redux/store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { ToastContainer } from "react-toastify";
import HOC from "../Components/HOC/HOC";
import { useRouter } from "next/router";
import ProtectedRoute from "../Components/ProtectedRoute/ProtectedRoute";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const noAuthRequired = ["/"];

export default function App({ Component, pageProps }: AppProps) {
  let persistor = persistStore(store);
  const router = useRouter();

  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}

      <HOC>
        {noAuthRequired.includes(router.pathname) ||
        !router.pathname.includes("/post") ? (
          <Component {...pageProps} />
        ) : (
          <ProtectedRoute>
            <Component {...pageProps} />
          </ProtectedRoute>
        )}
      </HOC>
      <ToastContainer />
      {/* </PersistGate> */}
    </Provider>
  );
}
