import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { Detail } from './components/Detail/Detail';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import { ThemeContext, theme } from './components/utils/theme-context';
import { useSelector } from 'react-redux';
import SearchResult from './components/SearchResult/SearchResult';

function App() {
    const modeTampilan = useSelector((state) => state.darkMode.value);

    return (
        <ThemeContext.Provider value={theme[modeTampilan]}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/detail/:newsId" element={<Detail />}></Route>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/result/:searchtext" element={<SearchResult />} />
            </Routes>
        </ThemeContext.Provider>
    );
}

export default App;
