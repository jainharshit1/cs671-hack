"use client";

// pages/index.js
import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
	const [input, setInput] = useState('');
	const [messages, setMessages] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [model, setModel] = useState('gpt-4');
	const [availableModels, setAvailableModels] = useState([]);
	const messagesEndRef = useRef(null);
	
	// API key should be stored securely, this is just for demo purposes
	const API_KEY = "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";
	
	// Scroll to bottom of messages
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};
	
	useEffect(() => {
		scrollToBottom();
	}, [messages]);
	
	useEffect(() => {
		// Fetch available models on component mount
		const fetchModels = async () => {
			try {
				const response = await fetch('http://localhost:8000/api/models', {
					headers: {
						'X-API-Key': API_KEY,
					}
				});
				const data = await response.json();
				if (data.models) {
					setAvailableModels(data.models);
					if (data.models.includes('gpt-4')) {
						setModel('gpt-4');
					} else if (data.models.length > 0) {
						setModel(data.models[0]);
					}
				}
			} catch (error) {
				console.error('Error fetching models:', error);
			}
		};
		
		fetchModels();
	}, [API_KEY]);
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!input.trim()) return;
		
		// Add user message to chat
		const userMessage = { role: 'user', content: input };
		setMessages(prevMessages => [...prevMessages, userMessage]);
		setInput('');
		setIsLoading(true);
		
		try {
			const response = await fetch('http://localhost:8000/api/chat', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-API-Key': API_KEY
				},
				body: JSON.stringify({
					messages: [...messages, userMessage],
					model: model,
					temperature: 0.7,
					max_tokens: 500
				})
			});
			
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			
			const data = await response.json();
			setMessages(prevMessages => [...prevMessages, data.message]);
		} catch (error) {
			console.error('Error sending message:', error);
			setMessages(prevMessages => [...prevMessages, {
				role: 'system',
				content: 'Error: Could not get a response from the API.'
			}]);
		} finally {
			setIsLoading(false);
		}
	};
	
	return (
		<div className="flex flex-col min-h-screen bg-gray-100">
			<Head>
				<title>OpenAI Chat</title>
			</Head>
			
			<header className="bg-white shadow">
				<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
					<h1 className="text-3xl font-bold text-gray-900">OpenAI Chat</h1>
					<div className="flex items-center">
						<label htmlFor="model" className="mr-2 text-sm">Model:</label>
						<select
							id="model"
							value={model}
							onChange={(e) => setModel(e.target.value)}
							className="border rounded p-1 text-sm"
						>
							{availableModels.map((m) => (
								<option key={m} value={m}>{m}</option>
							))}
						</select>
					</div>
				</div>
			</header>
			
			<main className="flex-grow max-w-7xl w-full mx-auto py-6 sm:px-6 lg:px-8 flex flex-col">
				<div className="flex-grow bg-white rounded-lg shadow p-6 mb-6 overflow-y-auto h-[60vh]">
					<div className="space-y-4">
						{messages.length === 0 ? (
							<div className="text-center text-gray-500 mt-10">
								Send a message to start the conversation
							</div>
						) : (
							messages.map((msg, index) => (
								<div
									key={index}
									className={`p-4 rounded-lg ${
										msg.role === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
									} ${msg.role === 'system' ? 'bg-red-100' : ''} max-w-[80%] ${
										msg.role === 'user' ? 'ml-auto' : 'mr-auto'
									}`}
								>
									<div className="font-semibold mb-1">
										{msg.role === 'user' ? 'You' : msg.role === 'assistant' ? 'Assistant' : 'System'}
									</div>
									<div className="whitespace-pre-wrap">{msg.content}</div>
								</div>
							))
						)}
						{isLoading && (
							<div className="p-4 rounded-lg bg-gray-100 max-w-[80%]">
								<div className="font-semibold mb-1">Assistant</div>
								<div className="flex space-x-2 justify-center items-center">
									<div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
									<div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
									<div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
								</div>
							</div>
						)}
						<div ref={messagesEndRef} />
					</div>
				</div>
				
				<form onSubmit={handleSubmit} className="flex space-x-4">
					<input
						type="text"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder="Type your message..."
						className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						disabled={isLoading}
					/>
					<button
						type="submit"
						className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
						disabled={isLoading || !input.trim()}
					>
						Send
					</button>
				</form>
			</main>
		</div>
	);
}