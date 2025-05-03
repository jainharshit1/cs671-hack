import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

// Initialize the OpenAI client
const openai = new OpenAI({
	apiKey: "",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// Only allow POST requests
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}
	
	const { message } = req.body;
	
	if (!message) {
		return res.status(400).json({ error: "Message is required" });
	}
	
	try {
		const completion = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			messages: [{ role: "user", content: message }],
		});
		
		const reply = completion.choices[0]?.message?.content;
		
		if (!reply) {
			return res.status(500).json({ error: "No reply received from OpenAI" });
		}
		
		res.status(200).json({ reply });
	} catch (error: any) {
		console.error("OpenAI API Error:", error);
		
		// Send more helpful error messages
		if (error.response) {
			return res.status(error.response.status).json({
				error: `OpenAI Error: ${error.response.status}`,
				message: error.response.data?.error?.message || "Unknown OpenAI error"
			});
		}
		
		res.status(500).json({
			error: "Failed to communicate with OpenAI API",
			message: error.message || "Unknown error"
		});
	}
}