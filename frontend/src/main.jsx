import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";

import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App.jsx";

import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import Profile from "./pages/User/Profile.jsx";

// Auth
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";

// Adnin Pages
import RecordingList from "./pages/Admin/RecordingList.jsx";
import UserList from "./pages/Admin/UserList.jsx";
import CategoryList from "./pages/Admin/CategoryList.jsx";
import LabelList from "./pages/Admin/LabelList.jsx";
import ArtistList from "./pages/Admin/ArtistList.jsx";
import AddArtist from "./pages/Admin/AddArtist.jsx";
import AddCategory from "./pages/Admin/AddCategory.jsx";
import AddLabel from "./pages/Admin/AddLabel.jsx";
import AddRecording from "./pages/Admin/AddRecording.jsx";
import UpdateCategory from "./pages/Admin/UpdateCategory.jsx";
import UpdateArtist from "./pages/Admin/UpdateArtist.jsx";
import UpdateLabel from "./pages/Admin/UpdateLabel.jsx";
import UpdateUser from "./pages/Admin/UpdateUser.jsx";
import UpdateRecording from "./pages/Admin/UpdateRecording.jsx";
import Home from "./pages/Home.jsx";
import Recordings from "./pages/Recordings/Recordings.jsx";
import Recording from "./pages/Recordings/Recording.jsx";
import Search from "./pages/Search.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route index={true} path="/" element={<Home />} />
      <Route path="/recordings" element={<Recordings />} />
      <Route path="/recording/:id" element={<Recording />} />
      <Route path="/search" element={<Search />} />

      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/recordinglist" element={<RecordingList />} />
        <Route
          path="/admin/recordinglist/:pageNumber"
          element={<RecordingList />}
        />
        <Route path="/admin/addrecording" element={<AddRecording />} />
        <Route path="/admin/recording/:id/edit" element={<UpdateRecording />} />

        <Route path="/admin/artistlist" element={<ArtistList />} />
        <Route path="/admin/artistlist/:pageNumber" element={<ArtistList />} />
        <Route path="/admin/addartist" element={<AddArtist />} />
        <Route path="/admin/artist/:id/edit" element={<UpdateArtist />} />

        <Route path="/admin/categorylist" element={<CategoryList />} />
        <Route
          path="/admin/categorylist/:pageNumber"
          element={<CategoryList />}
        />
        <Route path="/admin/addcategory" element={<AddCategory />} />
        <Route path="/admin/category/:id/edit" element={<UpdateCategory />} />

        <Route path="/admin/labellist/" element={<LabelList />} />
        <Route path="/admin/labellist/:pageNumber" element={<LabelList />} />
        <Route path="/admin/addlabel" element={<AddLabel />} />
        <Route path="/admin/label/:id/edit" element={<UpdateLabel />} />

        <Route path="/admin/userlist" element={<UserList />} />
        <Route path="/admin/user/:id/edit" element={<UpdateUser />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
