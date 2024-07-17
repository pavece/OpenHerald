import Image from 'next/image';

type Props = {
	url: string;
	alt: string;
	className?: string;
};

export const ImageContainer = ({ className, url, alt }: Props) => {
	//TODO: Loading
	return (
		<div className={`relative rounded-md h-[300px] ${className}`}>
			<Image className='rounded-md fill object-cover' src={url} alt={alt} fill />
		</div>
	);
};
