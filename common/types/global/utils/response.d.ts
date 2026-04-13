declare type ResponseI<T = null> =
	| {
			success: true;
			message: string;
			data: T;
			statusCode: number;
	  }
	| {
			success: false;
			message: string;
			data: ErrorResponseI | null;
			statusCode: number;
	  };
declare interface StaticResponseI<T = null> {
	success: boolean;
	message: string;
	data: T;
	statusCode: number;
}
declare interface ListOf<T> {
	list: T[];
	total: number;
}
