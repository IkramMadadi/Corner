export default async function AsyncComponent() {
	const waitFor3Seconds = new Promise((resolve) => setTimeout(resolve, 3000));
	await waitFor3Seconds;
	return <div>I am an async component!</div>;
}
