import Image from 'next/image';

type Props = {
	url: string;
	alt: string;
	className?: string;
};

export const Avatar = ({ url, alt, className }: Props) => {
	return (
		<div className={`relative rounded-full w-full h-full  ${className}`}>
			<Image className='rounded-full fill object-cover' src={url} alt={alt} fill />
		</div>
	);
};
