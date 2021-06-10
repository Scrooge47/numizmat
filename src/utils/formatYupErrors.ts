
import { ValidationError } from "yup";
import { formatError } from "./types";

export const formatYupError = (err: ValidationError) => {

	const errors: Array<formatError> = [];
	console.log(err);
	err.inner.forEach((e) => {
		errors.push({
			path: e.path as string,
			message: e.message,
		});
	});
	console.log('errors', errors);

	return errors;
};

