

export const title_animation = {
    initial :{opacity:0},
    whileInView : {opacity:1}
}

export const spacer_animation = {
    initial: {scaleX:0},
    whileInView: {scaleX:1},

}

export const question = {
    variants: {
        initial: { opacity: 1, x: 0 },
        complete: {
            opacity: [1, 0, 0, 1],
            x: [0, 100, -100, 0],
            transition: {
                duration: 1.5,
                times: [0, 0.4, 0.6, 1],
                ease: "easeInOut"
            }
        }
    }
};

export const loadingUI = {
    animate: {rotate : 360},
    transition: {repeat: Infinity, duration: 1.0, ease: "easeOut"},
}

export const response_animation = {
    initial: { height: 0, overflow: 'hidden', borderBottomWidth: 0 },
    animate: { height: 'auto', borderBottomWidth: '2px' },
    transition: { duration: 0.5, ease: 'easeInOut' },
};

export const response_p_animation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { delay: 0.5, duration: 0.5 },
};

export const modal_animation = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition : { duration: 0.3 },
}

export const menu_bar_animation = {
    initial: { opacity: 1, scaleX: 1 },
    animate: { opacity: 0, scaleX: 0 },
    transition: { duration: 0.5, ease: 'easeOut' },
}
export const navigation_window_animation = {
    hidden: { width: 0 , transition: {delay: 0.35} },
    visible: { width: 250 },
    transition: { duration: 0.5, ease: 'easeOut' },
};
export const navigation_window_container_animation = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: {delay: 0.4} },
    exit: { opacity: 0 },

};