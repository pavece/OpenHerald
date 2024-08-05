type Props = {
	url: string;
	className?: string;
};

export const Avatar = ({ url, className }: Props) => {
	return (
		<div
			className={`${className} aspect-square bg-center bg-cover bg-no-repeat`}
			style={{ backgroundImage: `url('${url}')` }}
		></div>
	);
};
