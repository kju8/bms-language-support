export type localizeTempKey = number | string | ( ( obj: descriptionObj, ...args: string[] ) => string );
export type descriptionObj = {
	path: string;
	fileName: string;
};
export type descriptionFunc = (obj: descriptionObj, ...args: string[]) => string;
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
	readonly descriptionTemp: ( defaultStrings: { [_key: string]: string; } ) => descriptionFunc;
	description?: descriptionFunc;
	readonly defaultStrings: {
		[_key: string]: string;
	};
	readonly link?: {
		name: string;
		url: string;
	}[];
	linkText?: string;
};
