import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProvider } from "./lib/AppContext";
import GoogleAuth from "./components/pages/GoogleAuth";
import AuthRequiredRoute from "./components/middleware/AuthRequiredRoute";
import NonAuthRequiredRoute from "./components/middleware/NonAuthRequiredRoute";
import Profile from "./components/pages/Profile";
import DonorDashboard from "./components/pages/donor/DonorDashboard";
import DonorDonations from "./components/pages/donor/DonorDonations";
import DonorAddDonation from "./components/pages/donor/DonorAddDonation";
import DonorEditDonation from "./components/pages/donor/DonorEditDonation";
import NgoDashboard from "./components/pages/ngo/NgoDashboard";
import NgoMyRequests from "./components/pages/ngo/NgoMyRequests";
import NgoAvailableFood from "./components/pages/ngo/NgoAvailableFood";
import DriverDashboard from "./components/pages/driver/DriverDashboard";
import DriverAvailableRequests from "./components/pages/driver/DriverAvailableRequests";
import DriverMyRequests from "./components/pages/driver/DriverMyRequests";
import Chat from "./components/pages/Chat";
import DonorRoleRequired from "./components/middleware/DonorRoleRequired";
import NgoRoleRequired from "./components/middleware/NgoRoleRequired";
import DriverRoleRequired from "./components/middleware/DriverRoleRequired";

function App() {
  const queryClient = new QueryClient();
  return (
    <div className="bg-[#F9FAFB]">
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="/*"
                element={
                  <AuthRequiredRoute>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/chat" element={<Chat />} />
                    </Routes>
                  </AuthRequiredRoute>
                }
              />
              <Route
                path="/donor/*"
                element={
                  <DonorRoleRequired>
                    <Routes>
                      <Route path="/dashboard" element={<DonorDashboard />} />
                      <Route path="/donations" element={<DonorDonations />} />
                      <Route
                        path="/add-donation"
                        element={<DonorAddDonation />}
                      />
                      <Route
                        path="/edit-donation/:id"
                        element={<DonorEditDonation />}
                      />
                    </Routes>
                  </DonorRoleRequired>
                }
              />
              <Route
                path="/ngo/*"
                element={
                  <NgoRoleRequired>
                    <Routes>
                      <Route path="/dashboard" element={<NgoDashboard />} />
                      <Route
                        path="/available-food"
                        element={<NgoAvailableFood />}
                      />
                      <Route path="/my-requests" element={<NgoMyRequests />} />
                    </Routes>
                  </NgoRoleRequired>
                }
              />
              <Route
                path="/driver/*"
                element={
                  <DriverRoleRequired>
                    <Routes>
                      <Route path="/dashboard" element={<DriverDashboard />} />
                      <Route
                        path="/available-requests"
                        element={<DriverAvailableRequests />}
                      />
                      <Route
                        path="/my-requests"
                        element={<DriverMyRequests />}
                      />
                    </Routes>
                  </DriverRoleRequired>
                }
              />
              <Route
                path="/auth/*"
                element={
                  <NonAuthRequiredRoute>
                    <Routes>
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="/google" element={<GoogleAuth />} />
                    </Routes>
                  </NonAuthRequiredRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </AppProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
