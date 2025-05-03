// app/upload/page.tsx or pages/upload.tsx
'use client'; // or remove if using Pages Router

import { useState } from 'react';

export default function UploadPage() {
	const [text, setText] = useState('');
	const [file, setFile] = useState<File | null>(null);
	const [response, setResponse] = useState('');
	
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		
		const formData = new FormData();
		if (file) {
			formData.append('file', file);
		} else if (text) {
			formData.append('text', text);
		} else {
			alert('Provide either an MP3 file or some text.');
			return;
		}
		
		const res = await fetch('http://localhost:8000/upload/', {
			method: 'POST',
			body: formData,
		});
		
		const data = await res.json();
		setResponse(JSON.stringify(data, null, 2));
	};
	
	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 max-w-md">
			<label>
				Upload MP3:
				<input type="file" accept="audio/*" onChange={e => setFile(e.target.files?.[0] || null)} />
			</label>
			
			<label>
				Or Enter Text:
				<input type="text" value={text} onChange={e => setText(e.target.value)} />
			</label>
			
			<button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
				Submit
			</button>
			
			{response && (
				<pre className="bg-gray-100 p-2 rounded mt-4">{response}</pre>
			)}
		</form>
	);
}
