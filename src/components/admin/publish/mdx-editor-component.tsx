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

const imageUploadHandler = async (image: File) => {
	const imageFormData = new FormData();
	imageFormData.append('image', image);

	const result = await uploadImageFromClient(imageFormData);
	return result;
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
