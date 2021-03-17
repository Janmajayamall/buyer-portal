export interface FormattedPriceInterface {
	formattedPriceDecimal: number;
	formattedPriceCurrency: string;
	formattedPriceString: string;
}

export interface LoginProcessInterface {
	stage: number;
	phoneNumber: string;
	verificationCode: string;
	authenticationFailed: boolean;
}

export enum OrderStatusSelectFilter {
	processing,
	all,
	delivered,
	cancelled,
}

export function formatNumberWithCommas(value: number): string {
	let amount = String(value);
	let delimiter = ","; // replace comma if desired
	let a = amount.split(".", 2);
	let d = a[1] ? a[1] : "";
	let i = parseInt(a[0]);
	if (isNaN(i)) {
		return "";
	}
	let minus = "";
	if (i < 0) {
		minus = "-";
	}
	i = Math.abs(i);
	let n = String(i);
	a = [];
	while (n.length > 3) {
		let nn = n.substr(n.length - 3);
		a.unshift(nn);
		n = n.substr(0, n.length - 3);
	}
	if (n.length > 0) {
		a.unshift(n);
	}
	n = a.join(delimiter);
	if (d.length < 1) {
		amount = n;
	} else {
		amount = n + "." + d;
	}
	amount = minus + amount;
	return amount;
}

export function roundToTwoPlaces(value: number): number {
	return +value.toFixed(2);
}

export function handleNumberInputOnKeyPress(
	currentValue: string,
	key: string,
	callback: (value: string) => void,
	decimalAllowed: boolean = true
) {
	// check if is not single digit value
	if (key.length !== 1) {
		// if backspace, then remove last element of current value
		if (key === "Backspace") {
			callback(currentValue.slice(0, -1));
			return;
		}
		callback(currentValue);
	}

	// formatted key
	const formattedKey = decimalAllowed
		? key.replace(/[^\d.]/g, "")
		: key.replace(/[^\d]/g, "");
	if (formattedKey === "") {
		callback(currentValue);
		return;
	}

	// check for decimals
	if (key === ".") {
		// if decimal is already present then no need to change current value
		if (currentValue.includes(".")) {
			callback(currentValue);
			return;
		}

		callback(currentValue + ".");
		return;
	}

	// check if there are already two digits after decimal, if yes then return current value
	if (currentValue.includes(".") && currentValue.split(".")[1].length === 2) {
		callback(currentValue);
		return;
	}

	callback(currentValue + key);
	return;
}

export function formatPriceValue(price: number): FormattedPriceInterface {
	const roundedPrice = roundToTwoPlaces(price);
	const formattedPrice = formatNumberWithCommas(roundedPrice);
	return {
		formattedPriceDecimal: roundedPrice,
		formattedPriceString: formattedPrice,
		formattedPriceCurrency: `\u20B9 ${formattedPrice}`,
	};
}

export function getLowestVariantCost(variants: any[]): number | null {
	if (variants.length === 0) {
		return null;
	}

	let lowestPricePoint = variants[0].price;
	variants.forEach((variant) => {
		if (lowestPricePoint > variant.price) {
			lowestPricePoint = variant.price;
		}
	});
	return lowestPricePoint;
}

export function getHighestVariantCost(variants: any[]): number | null {
	if (variants.length === 0) {
		return null;
	}

	let highPricePoint = variants[0].price;
	variants.forEach((variant) => {
		if (highPricePoint < variant.price) {
			highPricePoint = variant.price;
		}
	});
	return highPricePoint;
}

export function convertToInt(value: number): number {
	return Math.round(value);
}
