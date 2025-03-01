import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import UserForm from "./userform";
import UserList from "./userlist";

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add-user" element={<UserForm />} />
                <Route path="/user-list" element={<UserList />} />
            </Routes>
        </Router>
    );
};

export default App;
