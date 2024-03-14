import React from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./Auth";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import { authActions } from "../store/auth-slice";
import SignUpForm from "../SignUp";
import AddUser from "../AdminControllers/AddUser";
import Error from "../Error";
import RecruiterLandingPage from "../RecruiterController/RecruiterLandingPage";
import PostForm from "../RecruiterController/AddPost";
import UserProfile from "./shared/UserProfile";
import AdminLandingPage from "../AdminControllers/AdminLandingPage";
import PostTable from "../RecruiterController/PostTable";
import EditPostForm from "../RecruiterController/EditPost";
import FreelancerLandingPage from "../FreelancerController/FreelancerLandingPage";
import Footer from "./Footer";  // Import Footer component
import Contact from "./Contact";
import AboutPage from "./About";
import LandingPage from "./LandingPage";

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (!isLoggedIn && localStorage.getItem("logicCredentials")) {
    console.log("Without redux but with local storage");

    var data = JSON.parse(localStorage.getItem("logicCredentials"));
    var arrOfRoles = data.roles;

    dispatch(
      authActions.login({
        email: data.userName,
        role: arrOfRoles,
        userId: data.userId,
        image: data.userImage,
      })
    );
  }
  const roles = useSelector((state) => state.auth.roles);

  console.log(roles);

  const routesForUnAuthUser = (
    <>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/contact" element={<Contact />} />
      <Route
        path="*"
        element={<Error message={"Invalid path please check the url"} />}
      />
    </>
  );

  const routesForRecruiter = (
    <>
      <Route path="/login" element={<RecruiterLandingPage />}></Route>
      <Route path="/add-work" element={<PostForm />} />
      <Route path="/edit-post/:postId" element={<EditPostForm />} />
      <Route path="/my-posts" element={<PostTable />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/products" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route
        path="*"
        element={<Error message={"Invalid path please check the url"} />}
      />
    </>
  );
  const routesForFreelancer = (
    <>
      <Route path="/login" element={<FreelancerLandingPage />}></Route>
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/add-portfolio" element={<AddUser />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/products" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route
        path="*"
        element={<Error message={"Invalid path please check the url"} />}
      />
    </>
  );

  const routesForAdmin = (
    <>
      <Route path="/login" element={<AdminLandingPage />}></Route>
      <Route path="/about" element={<AboutPage />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/contact" element={<Contact />} />
      <Route
        path="*"
        element={<Error message={"Invalid path please check the url"} />}
      />
    </>
  );




  const findRoute = () => {
    if (!isLoggedIn) {
      return routesForUnAuthUser;
    }

    console.log(roles);
    switch (roles) {
      case "RECRUITER":
        return routesForRecruiter;
      case "FREELANCER":
        return routesForFreelancer;
      case "ADMIN":
        return routesForAdmin;
      default:
        return routesForUnAuthUser;
    }
  };

  return (
    <div>
      <Routes>
        {findRoute()}
      </Routes>
      <Footer /> {/* Include Footer component outside of Routes */}
    </div>
  );
};
export default ProtectedRoute;