import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BasicLayout from "./pages/basicLayout";
import RegisteredLayout from "./pages/registeredLayout";
import Home from "./pages/home";
import Categories from "./pages/categories";
import Search from "./pages/search";
import Login from "./pages/login";
import Create from "./pages/create";
import MyLists from "./pages/mylists";

export default function App() {
    let authenticated = true;

    if (authenticated) {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<RegisteredLayout />}>
                        <Route index element={<Home />} />
                        <Route path="categories" element={<Categories />} />
                        <Route path="search" element={<Search />} />
                        <Route path="create" element={<Create />} />
                        <Route path="mylists" element={<MyLists />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        )
    } else {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<BasicLayout />}>
                        <Route index element={<Home />} />
                        <Route path="categories" element={<Categories />} />
                        <Route path="search" element={<Search />} />
                        <Route path="login" element={<Login />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));