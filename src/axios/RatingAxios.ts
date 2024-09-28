import axios from 'axios';

export const RatingAxios = async (rating : number , userPrompt : string, summary : string) => {
    const response = await axios.post(process.env.REACT_APP_RATING_EMAIL || "", {
        rating: rating,
        userPrompt: userPrompt,
        summary: summary,
    })

}