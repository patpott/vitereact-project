import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Quiz from '../Quiz';
import Todo from '../Todo';
import Citation from '../Citation';
import MovieSearch from '../data/MovieSearch';

const Layout = () => {
    return (
        <div>
            <Routes>
                <Route path='/Quiz' element={<Quiz/>}/>
                <Route path='/Todo' element={<Todo/>}/>
                <Route path='/Citation' element={<Citation/>}/>
                <Route path='/Movies' element={<MovieSearch/>}/>
            </Routes>
        </div>
    );
}

export default Layout;
