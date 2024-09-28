import React, {useEffect, useRef, useState} from "react";
import styles from "../scss/main.module.scss"
import Modal from "react-modal"
import {Outlet} from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

Modal.setAppElement('#root');
const Main = () => {
    const [IsNavigationHover, setIsNavigationHover] = useState<boolean>(false);

    const handleClickOutside = (event: MouseEvent) => {
        if (
            IsNavigationHover &&
            !(event.target as HTMLElement).closest(`.${styles.navigation_window}`) &&
            !(event.target as HTMLElement).closest(`.${styles.menu_container}`)
        ) {
            setIsNavigationHover(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [IsNavigationHover]);
    return (
        <div className="w-screen min-h-screen h-full overflow-x-hidden">
            {/* Top border */}
            <div className={styles.top_border}></div>

            {/* Container with responsive settings */}
            <div className="w-full p-4 border-4 min-h-screen flex flex-col">
                {/* Header */}
                <div className="w-full flex-shrink-0">
                    <Header/>
                </div>

                {/* Main Content Center */}
                <div className="flex-grow w-full mt-4">
                    <div className="w-full">
                        <Outlet/>
                    </div>
                </div>

                {/* Footer */}
                <div className="w-full mt-4 flex-shrink-0">
                    <Footer/>
                </div>
            </div>
        </div>

    )
}

export default Main;