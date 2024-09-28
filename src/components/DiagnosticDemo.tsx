import styles from "../scss/main.module.scss";
import {motion} from "framer-motion";
import {FaStar} from "react-icons/fa"
import {
    loadingUI,
    modal_animation,
    question,
    response_animation,
    response_p_animation
} from "../Animation/MainAnimation";
import React, {useEffect, useRef, useState} from "react";
import {
    demoEmailAxios,
    emailAxios,
    openAIAxios_Detail,
    openAIAxios_Recommendation,
    openAIAxios_Summary
} from "../axios/MainAxios";
import {useNavigate, useOutletContext} from "react-router-dom";
import Modal from "react-modal";
import {RatingAxios} from "../axios/RatingAxios";

const DiagnosticDemo = () => {
    const modalStyles : ReactModal.Styles = {
        overlay: {
            backgroundColor: '#f0f0f0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        content: {
            position: 'relative',
            inset: 'unset',
            border: 'none',
            padding: '0',
            background: 'transparent',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }
    };
    const ratingModalStyles : ReactModal.Styles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#f0f0f0',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
            width: '300px',
            textAlign: 'center',
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
    };
    const questionList = [
        {id:0, question:"Q1. What is the make of your vehicle?", label:"Make:"},
        {id:1, question:"Q2. What year of your Car?", label:"Year:"},
        {id:2, question:"Q3. What is the Model of your vehicle?", label:"Model:"},
        {id:3, question:"Q4. What is engine type", label:"engine type:"},
        {id:4, question:"Q5. What is transmission", label:"transmission"},
        {id:5, question:"Issue Summary: ", label: ""},
    ]

    const navigate = useNavigate();
    const [isComplete, setComplete] = useState(false);
    const [userPrompt, setPrompt] = useState("");

    const [answers, setAnswers] = useState<{[key:string]:string}>({});
    const [currentStep, setCurrentStep ] = useState(1);
    const [changeAnimation, setChangeAnimation] = useState(0);
    const [openAI_detail, setResponseDetail] = useState("");
    const [openAI_summary, setResponseSummary] = useState("");
    const [isDetailSet, setIsDetailSet] = useState(false);
    const [isResponseArrived, setIsResponseArrived] = useState(false);
    const [buttonMessage, setButtonMessage] = useState("Submit");

    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [rating, setRating] = useState(0);
    const [ratingHover, setRatingHover] = useState<number | null>(null);

    const [isStartOver, setIsStartOver] = useState(false);
    const textareaRefs = useRef<(HTMLTextAreaElement | null)[]>([]);
    const emailHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const openEmailModal = () => {
        setIsEmailModalOpen(true);
    };

    const closeEmailModal = () => {
        setIsEmailModalOpen(false);
    };

    const openRatingModal = () => {
        setIsRatingModalOpen(true);
    }
    const closeRatingModal = () => {
        setIsRatingModalOpen(false);
    }
    const closeRatingModalHandler = () => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            rating: rating.toString()
        }));

        closeRatingModal();
    }

    const handleRatingClick = (ratingValue: number): void => {
        setRating(ratingValue);
        alert("Thank you for providing ratings");
        closeRatingModalHandler();
        RatingAxios(ratingValue, userPrompt.split('\n').slice(0, -1).join('\n'), openAI_summary);
        if (isStartOver) {
            window.location.href = "/";
        } else {
            window.location.href= "https://corporate.smartmaintenancesolutions.com/home"
        }
        setIsStartOver(false);
    };

    const handleRatingMouseOver = (value: number): void => {
        setRatingHover(value);
    };

    const handleRatingMouseLeave = (): void => {
        setRatingHover(null);
    };

    const closeEmailModalHandler = async () => {
        try {
            openAIAxios_Recommendation(openAI_detail)
                .then(recommendation => {
                    console.log(recommendation);
                    return demoEmailAxios(email, openAI_detail, recommendation, userPrompt.split('\n').slice(0, -1).join('\n'));
                })
                .catch(e => {
                    console.log(`Email Axios Error: ${e}`);
                });
        } catch (e) {
            console.log(`Unexpected Error: ${e}`);
        }
        alert(`Email submitted: ${email}`);
        closeEmailModal();
    };

    useEffect(() => {
        if (currentStep <= questionList.length) {
            textareaRefs.current[currentStep - 1]?.focus();
        }
    }, [currentStep]);

    const answerHandler = (event: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
        const { value } = event.target;
        setAnswers(prevAnswers => ({ ...prevAnswers, [index]: value }));
    };

    const nextHandler = () => {
        if (currentStep === questionList.length) {
            setComplete(true)
            window.scrollTo({top: 0,behavior: "smooth"});
        } else {
            setCurrentStep(currentStep + 1);
        }
    };


    useEffect(() => {
        if (currentStep < questionList.length + 1) {
            setChangeAnimation(changeAnimation + 1);
            setTimeout(() => {
            }, 630);
        }
        if (currentStep === questionList.length) {
            setTimeout(() => {
                setButtonMessage("Submit")
            }, 630);
        }
    }, [currentStep]);
    useEffect(() => {
        const fetchData = async () => {
            try {

                const prompt = `Vehicle Make: ${answers["0"]}
                                Vehicle Model: ${answers["2"]}
                                Year of Manufacturing: ${answers["1"]}
                                Engine Type: ${answers["3"]}
                                Transmission Type: ${answers["4"]}
                                Issue Summary: ${answers["5"]}
                                
                                Provide a detailed diagnostic report for the issue described.`
                setPrompt(prompt);
                console.log(prompt)
                const detail = await openAIAxios_Detail(prompt);
                setResponseDetail(detail);
                console.log(detail)
                setIsDetailSet(true);
                const summary = await openAIAxios_Summary(detail);
                console.log(summary)
                setResponseSummary(summary);
                setIsResponseArrived(true)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        if (isComplete) {
            fetchData();
        }
    }, [isComplete]);

    useEffect(() => {
        setComplete(false);
        setIsDetailSet(false);
    }, []);
    const handleEmailDetailsClick = () => {
        const proceed = window.confirm("Would you like to provide your email?");

        if (proceed) {
            openEmailModal();
        }
    };

    return (
        <div className="flex flex-col space-y-6 p-4 min-h-screen">
            {/* Email Modal */}
            <Modal
                isOpen={isEmailModalOpen}
                onRequestClose={closeEmailModal}
                style={modalStyles}
                contentLabel="Hello"
                shouldCloseOnOverlayClick={false}
            >
                <motion.div
                    className="flex justify-center items-center p-6 bg-white w-full max-w-lg mx-auto rounded-lg shadow-lg"
                    initial={modal_animation.hidden}
                    animate={modal_animation.visible}
                    exit={modal_animation.exit}
                    transition={modal_animation.transition}
                >
                    <div className="flex flex-col items-center w-full space-y-4">
                        <p className="text-black text-lg font-semibold w-full text-left">Enter your Email:</p>
                        <label htmlFor="inputField" className="text-gray-700 w-full text-left">Email:</label>
                        <input
                            id="inputField"
                            type="text"
                            placeholder="example@gmail.com"
                            onChange={emailHandler}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    closeEmailModalHandler();
                                }
                            }}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            onClick={closeEmailModalHandler}
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Enter
                        </button>
                    </div>
                </motion.div>
            </Modal>

            {/* Rating Modal */}
            <Modal
                isOpen={isRatingModalOpen}
                onRequestClose={closeRatingModal}
                style={ratingModalStyles}
                contentLabel="Rating:"
                shouldCloseOnOverlayClick={false}
            >
                <motion.div
                    className="flex flex-col justify-center items-center p-6 bg-white max-w-md mx-auto rounded-lg shadow-lg"
                    initial={modal_animation.hidden}
                    animate={modal_animation.visible}
                    exit={modal_animation.exit}
                    transition={modal_animation.transition}
                >
                    <p className="mb-5 text-black text-lg text-center">
                        How satisfied are you with the service?
                    </p>
                    <div className="flex justify-center mb-4">
                        {[...Array(5)].map((_, index) => {
                            const ratingValue = index + 1;
                            return (
                                <label key={index} className="cursor-pointer">
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={ratingValue}
                                        onClick={() => handleRatingClick(ratingValue)}
                                        className="hidden"
                                    />
                                    <FaStar
                                        className={`w-8 h-8 ${ratingValue <= (ratingHover || rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                        onMouseEnter={() => handleRatingMouseOver(ratingValue)}
                                        onMouseLeave={handleRatingMouseLeave}
                                    />
                                </label>
                            );
                        })}
                    </div>
                </motion.div>
            </Modal>

            {/* Main Content */}
            {isComplete ? (
                <div className="flex flex-col items-center p-4 bg-white shadow-md rounded-md">
                    {isResponseArrived ? (
                        <div className="space-y-4">
                            <motion.div
                                className="p-4 bg-gray-100 rounded-md"
                                initial={response_animation.initial}
                                animate={response_animation.animate}
                                transition={response_animation.transition}
                            >
                                <motion.p
                                    initial={response_p_animation.initial}
                                    animate={response_p_animation.animate}
                                    transition={response_p_animation.transition}
                                    className="text-gray-800"
                                >
                                    Vehicle Make: {answers["0"]} <br/>
                                    Vehicle Model: {answers["2"]} <br/>
                                    Year of Manufacturing: {answers["1"]} <br/>
                                    Engine Type: {answers["3"]} <br/>
                                    Transmission: {answers["4"]} <br/>
                                    Issue Summary: {answers["5"]} <br/>
                                    <br/>
                                    Summary: {splitByNumbers(openAI_summary).map((line, index) => (
                                    <React.Fragment key={index}>
                                        <br/>
                                        {line}
                                        <br/>
                                    </React.Fragment>
                                ))}
                                    <br/>
                                    <p>
                                        Would you like us to send you more detailed information via email, including a
                                        list of recommended mechanics, coupons, and discount codes? Then Click Email
                                        More Details
                                    </p>
                                </motion.p>
                            </motion.div>
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => {
                                        setIsStartOver(true);
                                        openRatingModal();
                                    }}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Start Over
                                </button>
                                <button
                                    onClick={openRatingModal}
                                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                >
                                    Exit
                                </button>
                                <button
                                    onClick={handleEmailDetailsClick}
                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                >
                                    Email More Details Demo
                                </button>
                            </div>
                        </div>
                    ) : (
                        <motion.div
                            className="flex justify-center items-center p-4"
                            animate={loadingUI.animate}
                            transition={loadingUI.transition}
                        >
                            {/* Loading Spinner */}
                            <div
                                className="w-12 h-12 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
                        </motion.div>
                    )}
                </div>
            ) : (
                <div className="flex flex-col space-y-4 p-4 bg-white shadow-md rounded-md">
                    {questionList.map((currentQuestion, index) => (
                        currentStep > index && (
                            <div key={index} className="mb-4">
                                <p className="text-lg font-semibold text-green-600 mb-2">{currentQuestion.question}</p>
                                <label
                                    htmlFor={`question-${currentQuestion.id}`}
                                    className="block mb-2 text-gray-600"
                                >
                                    {currentQuestion.label}
                                </label>
                                <textarea
                                    id={`question-${currentQuestion.id}`}
                                    ref={(el) => (textareaRefs.current[index] = el)}
                                    placeholder="Answer here"
                                    value={answers[index] || ''}
                                    onChange={(e) => answerHandler(e, index)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            nextHandler();
                                        }
                                    }}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 placeholder-italic"
                                />
                                {index === questionList.length - 1 && (
                                    <button
                                        onClick={nextHandler}
                                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                    >
                                        {buttonMessage}
                                    </button>
                                )}
                            </div>
                        )
                    ))}
                </div>
            )}
        </div>

    )
}

export default DiagnosticDemo;

const splitByNumbers = (response: string) => {
    return response.split(/(?=\d+\.)/);
};
