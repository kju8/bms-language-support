export type localizeTempKey = number | string | ( ( ...args: string[] ) => string );
export type bmsCommand = {
	readonly title: string;
	readonly support?: Readonly<{
		lr2?: boolean | string;
		nanasi?: boolean | string;
		beatoraja?: boolean | string;
		qms?: boolean | string;
		bemuse?: boolean | string;
	}>;
	supportText?: string;
	readonly channel?: number | string;
	readonly descriptionTemp: (defaultStrings: {
		[_key: string]: string;
	}) => (...args: string[]) => string;
	description?: (...args: string[]) => string;
	readonly defaultStrings: {
		[_key: string]: string;
	};
	readonly link?: {
		name: string;
		url: string;
	}[];
	linkText?: string;
};
