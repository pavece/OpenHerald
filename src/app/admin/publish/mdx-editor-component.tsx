'use client';

import {
	headingsPlugin,
	listsPlugin,
	quotePlugin,
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
	console.log(image);
	return '/images/dev/test-image-1.jpg';
};

export const MdxEditorComponent = ({ markdown, ...props }: any) => {
	return (
		<MDXEditor
			{...props}
			markdown={markdown}
			contentEditableClassName='prose'
			plugins={[
				// Example Plugin Usage
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
