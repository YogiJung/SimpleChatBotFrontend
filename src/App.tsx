import React from "react";
import {Route, Routes} from "react-router-dom";
import Main from "./components/Main";
import Diagnostic from "./components/Diagnostic";
import DiagnosticDemo from "./components/DiagnosticDemo";


const App = () => {

    return (
        <Routes>
            <Route path={"/"} element={<Main/>}>
                <Route path={""} element={<Diagnostic/>}/>
                <Route path={"demo"} element={<DiagnosticDemo/>}/>
            </Route>

        </Routes>
    )
}

export default  App

