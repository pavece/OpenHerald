type Props = {
	url: string;
	className?: string;
};

export const Avatar = ({ url, className }: Props) => {
	return (
		<div
			className={`rounded-full h-[50px] w-[50px] aspect-square bg-center bg-cover bg-no-repeat ${className}`}
			style={{ backgroundImage: `url('${url}')` }}
		></div>
	);
};
