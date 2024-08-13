'use client';

import { uploadImageFromClient } from '@/actions/images/upload-image-client';
import {
	headingsPlugin,
	thematicBreakPlugin,
	markdownShortcutPlugin,
	MDXEditor,
	toolbarPlugin,
	UndoRedo,
	BoldItalicUnderlineToggles,
	CreateLink,
	InsertImage,
	DiffSourceToggleWrapper,
	BlockTypeSelect,
	linkDialogPlugin,
	diffSourcePlugin,
	imagePlugin,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import { PiWarning } from 'react-icons/pi';
import { toast } from 'sonner';

const imageUploadHandler = async (image: File) => {
	try {
		const imageFormData = new FormData();
		imageFormData.append('image', image);

		const result = await uploadImageFromClient(imageFormData);
		return result;
	} catch (error) {
		toast('Error', {
			description: 'An error ocurred while trying to upload this image.',
			duration: 5000,
			icon: <PiWarning size={24} />,
			className: 'text-red-400 gap-4 border-red-400',
		});
		return '';
	}
};

export const MdxEditorComponent = ({ markdown, ...props }: any) => {
	return (
		<MDXEditor
			{...props}
			markdown={markdown}
			contentEditableClassName='prose min-h-[370px]'
			plugins={[
				headingsPlugin(),
				thematicBreakPlugin(),
				markdownShortcutPlugin(),
				linkDialogPlugin(),
				diffSourcePlugin(),
				imagePlugin({ imageUploadHandler }),
				toolbarPlugin({
					toolbarContents: () => (
						<>
							<BoldItalicUnderlineToggles />
							<CreateLink />
							<InsertImage />
							<BlockTypeSelect />
							<DiffSourceToggleWrapper>
								<UndoRedo />
							</DiffSourceToggleWrapper>
						</>
					),
				}),
			]}
		></MDXEditor>
	);
};
