import axios from "axios";
import {accessResponseType} from "../TypeReference/MainType";

export const openAIAxios_Recommendation = async (detail: String) => {
    try {
        return backendAxios_recommendation_access().then(async (accessResponse: accessResponseType) => {
            // console.log(process.env.REACT_APP_OPENAI_KEY);

            const prompt2 = `I will provide you with User Details and Integrated Factors. Your task is to assign weights to each integrated factor based on the User Details provided. Each weight must be a value between 0 and 1, and the sum of all weights must equal 1.

                            There are multiple user details, and for each user, assign a list of weights corresponding to the number of integrated factors. Ensure that the number of weights in each list matches the number of integrated factors.
                            
                            Please format your response as follows:
                            1. [w1, w2, w3, ...] (for the first set of weights)
                            2. [w1, w2, w3, ...] (for the second set of weights)
                            3. [w1, w2, w3, ...] (and so on for each user detail)
                            
                            The number of lists should match the number of User Details, and the number of weights in each list should match the number of Integrated Factors.
                            
                            Integrated Factors: ${accessResponse.integrated_factors}
                            User Details: ${detail}
                            
                            The output should strictly follow this format:
                            1. [w1, w2, w3, ...]
                            2. [w1, w2, w3, ...]
                            ...`


            // console.log(accessResponse.integrated_factors);
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-3.5-turbo',
                    messages: [
                        { role: 'system', content: 'feature' },
                        {
                            role: 'user',
                            content: prompt2
                        },
                    ],
                    max_tokens: 4000,
                    temperature: 0.1,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
                    },
                }
            );

            return response.data.choices[0].message.content;
        });
    } catch (error) {
        console.error('Error sending to OpenAI:', error);
        return 'There was an error processing your request.';
    }
};

export const backendAxios_recommendation_access = async () => {
    try {
        if (process.env.REACT_APP_RECOMMENDATION_ACCESS) {
            const response = await axios.get(process.env.REACT_APP_RECOMMENDATION_ACCESS);
            // console.log(response.data);
            return response.data
        } else {
            console.error('ENV Endpoint Missing');
        }
    } catch (error) {
        console.error('Error while sending GET request:', error);
    }
}

export const openAIAxios_Detail = async (userPrompt : String) => {
    try {
        // console.log(process.env.REACT_APP_OPENAI_KEY)
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: feature },
                    {
                        role: 'user',
                        content: `Based on the following data, provide a detailed output by selecting and explaining four specific problems. Ensure that the problems are described using specific and relevant names. Present the problems and their explanations as a numbered list, but do not include any placeholders or brackets like "[Problem Name]". Instead, use the actual problem names directly.

                        Example Format:
                        1. AC Compressor Failure: The AC compressor might be failing, causing inconsistent cooling or complete AC failure.
                        2. Refrigerant Leak: A possible refrigerant leak could be reducing cooling efficiency, which requires inspection for leaks.
                        
                        Here is the data:
                        ${userPrompt}`
                    }],
                max_tokens: 4000,
                temperature: 0.1,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
                },
            }
        )

        return response.data.choices[0].message.content;

    } catch (error) {
        console.error('Error sending to OpenAI:', error);
        return 'There was an error processing your request.';
    }
};
export const openAIAxios_Summary = async (userPrompt : String) => {
    try {
        // console.log(process.env.REACT_APP_OPENAI_KEY)
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: feature },
                    {
                        role: 'user',
                        content: `Please summarize the following problems and explanations in a clear and concise manner. Do not include the text "Problem Name" or the word "Summary". Instead, just provide the concise explanation for each problem as if you were writing a short, descriptive title followed by a brief explanation:

                    Example Format:
                    1. Compressor Failure: Failing AC compressor causing inconsistent cooling or complete AC failure.
                    2. Refrigerant Leak: Potential refrigerant leak leading to reduced cooling efficiency, requiring inspection.
                    
                    Here is the detailed information:
                    ${userPrompt}`
                    }
                ],
                max_tokens: 2000,
                temperature: 0.1,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
                },
            }
        )

        return response.data.choices[0].message.content;

    } catch (error) {
        console.error('Error sending to OpenAI:', error);
        return 'There was an error processing your request.';
    }
};
export const emailAxios = async (email: String, detail : String, recommendation : String, prompt : String) => {
    // console.log(recommendation);
    const response = await axios.post(
        process.env.REACT_APP_EMAIL_ENDPOINT || "",

        {
            "recipient": email,
            "subject": "Vehicle Diagnostic ChatBot",
            "detail" : detail,
            "recommendation" : recommendation,
            "prompt" : prompt,
        }
    )
}
export const demoEmailAxios = async (email: String, detail : String, recommendation : String, prompt : String) => {
    // console.log(recommendation);
    const response = await axios.post(
        process.env.REACT_APP_DEMO_EMAIL_ENDPOINT || "",

        {
            "recipient": email,
            "subject": "Vehicle Diagnostic ChatBot",
            "detail" : detail,
            "recommendation" : recommendation,
            "prompt" : prompt,
        }
    )
}

const feature = `
You are a Vehicle Diagnostic, Repair, and Maintenance Assistant.

    Your job is to:
    • Gather and process information provided by vehicle owners regarding vehicle issues and maintenance history.
• Use a comprehensive understanding of automotive diagnostics, maintenance, and repair to assess the information received.
• Provide accurate and knowledgeable advice and recommendations for diagnostics, repair, and maintenance based on the information collected.
• Limit follow-up questions to a minimum and provide concise, actionable solutions as quickly as possible.

    You have the following Qualifications:
    • ASE (Automotive Service Excellence) certification or equivalent qualification.
• Extensive experience in automotive diagnostics, maintenance, and repairs.
• Proficiency in customer service and communication skills.
• Ability to demonstrate a thorough understanding of vehicle systems and potential issues.

    Level of Authority:
    • Authorized to provide initial diagnostic and maintenance advice to customers.
• Required to escalate complex or unusual cases to senior technicians or management as needed.

    You have the following Training and Guidelines:
    • Use standardized and best practices in diagnostic and maintenance guidelines.
• Participate in ongoing training and professional development to stay updated with industry best practices and technological advancements.

    As it relates with compliance:
• You maintain compliance with all relevant laws, regulations, and company policies related to customer service, automotive diagnostics, and repair.

    You are understanding, kind, and concise.
`
