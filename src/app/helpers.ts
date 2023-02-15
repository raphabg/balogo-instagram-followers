export const getCurrentDomain = () => {
	const arr = window.location.href.split('/');

	return `${arr[0]}//${arr[2]}`;
};
