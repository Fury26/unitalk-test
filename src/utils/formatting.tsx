import dayjs from "dayjs";

export const getDateFormatString = (
	locale: string = navigator.language,
	detailed = false,
) => {
	const options = {
		...(detailed
			? ({
					hour: "numeric",
					minute: "numeric",
				} as const)
			: {}),
		day: "numeric",
		month: "numeric",
		year: "numeric",
	} as const;

	const formatObj = new Intl.DateTimeFormat(locale, options).formatToParts(
		Date.now(),
	);

	return formatObj
		.map((obj) => {
			switch (obj.type) {
				case "hour":
					return "HH";
				case "minute":
					return "mm";
				case "second":
					return "ss";
				case "day":
					return "DD";
				case "month":
					return "MM";
				case "year":
					return "YYYY";
				case "dayPeriod":
					return "A";
				default:
					return obj.value;
			}
		})
		.join("");
};

export const DATE_FORMAT = getDateFormatString();
export const DATE_FORMAT_WITH_HOURS = getDateFormatString(
	navigator.language,
	true,
);

export const formatDate = (value: string, withHours = false) => {
	return dayjs(value).format(withHours ? DATE_FORMAT_WITH_HOURS : DATE_FORMAT);
};
