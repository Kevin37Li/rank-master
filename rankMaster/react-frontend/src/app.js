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
import Ranker from "./ranker";

export default function App() {
    let authenticated = false;

    if (authenticated) {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="myApp/" element={<RegisteredLayout />}>
                        <Route index element={<Home />} />
                        <Route path="categories" element={<Categories />} />
                        <Route path="search" element={<Search />} />
                        <Route path="lists/create" element={<Create />} />
                        <Route path="lists" element={<MyLists />} />
                        <Route path="lists/rank/:id" element={<Ranker />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        )
    } else {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="myApp/" element={<BasicLayout />}>
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