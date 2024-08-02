'use client';

import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ImageContainer } from '../ui/image-container';

type Props = {
	markdown: string;
};

const imagesWithoutPTags = (props: any) => {
	const element = props.children[0];

	if (props.children.props?.node?.tagName === 'img') {
		return props.children;
	}
	return <p>{props.children}</p>;
};

export const ArticleBody = ({ markdown }: Props) => {
	return (
		<Markdown
			remarkPlugins={[remarkGfm]}
			className='prose my-8 min-w-full'
			components={{
				//@ts-ignore
				p: imagesWithoutPTags,
				img: props => (
					<ImageContainer url={props.src ?? ''} alt='' className='h-[250px] md:h-[400px] lg:h-[500px] not-prose' />
				),
			}}
		>
			{markdown}
		</Markdown>
	);
};
