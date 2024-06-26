import { Configuration, OpenAIApi } from "openai";

export default defineEventHandler(async (event) => {
	const query = getQuery(event); // query.userInput

	const configuration = new Configuration({
		apiKey: process.env.OPENAI_API_KEY,
	});

	const openai = new OpenAIApi(configuration);

	try {
		const response = await openai.createCompletion({
			model: "gpt-3.5-turbo",
			prompt: `Rephrase this:\n\n${query.userInput}`,
			temperature: 0.7,
			max_tokens: 256,
			top_p: 1,
			frequency_penalty: 0,
			presence_penalty: 0,
		});

		console.log(response.data);
		return response.data.choices[0].text;

		//
	} catch (error) {
		console.error(error.response.data);
		return error.response.data;
	}
});
