export type Operator = {
	createdAt: string;
	id: string;
	name: string;
	isWorking: boolean;
	avatar: string;
};

export interface OperatorAddon {
	fieldName: string;
	text: string;
	isChecked: boolean;
	id: string;
}
