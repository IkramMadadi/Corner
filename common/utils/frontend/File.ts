import { readFile, writeFile } from 'node:fs/promises';

// Function to read the text file and return its contents as a string
export async function readTextFile(filePath: string) {
	try {
		const text = await readFile(filePath, 'utf8');
		return text;
	} catch (error) {
		console.error('🗃️ Error reading file:', error);
	}
}

export async function readJSONFile<T = unknown>(filePath: string) {
	try {
		const text = await readFile(filePath, 'utf8');
		return JSON.parse(text) as T;
	} catch (error) {
		console.error('🗃️ Error reading file:', error);
	}
}

export async function writeJSONFile<T>(filePath: string, data: T) {
	try {
		await writeFile(filePath, JSON.stringify(data));
	} catch (error) {
		console.error('🗃️ Error writing file:', error);
	}
}
