import { RangeDatePicker } from '@/components/common';
import { useUrlDateFilter } from '@/hooks/useUrlDateFilter';

type Props = {
	fromUrl?: string;
	toUrl?: string;
};

export const DateFilter = ({ fromUrl, toUrl }: Props) => {
	const { fromDayjs, toDayjs, onChange } = useUrlDateFilter(fromUrl, toUrl);
	return <RangeDatePicker from={fromDayjs} to={toDayjs} onChange={onChange} />;
};
