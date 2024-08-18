import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface SavedArticle {
	title: string;
	slug: string;
	thumbnail: string;
	author: string;
	date: string;
}

interface SavedArticlesState {
	savedArticles: SavedArticle[];
	addSavedArticle: (article: SavedArticle) => void;
	removeSavedArticle: (slug: string) => void;
}

export const useSavedArticlesStore = create<SavedArticlesState>()(
	persist(
		(set, get) => ({
			savedArticles: [],
			addSavedArticle: (article: SavedArticle) => set({ savedArticles: [...get().savedArticles, article] }),
			removeSavedArticle: (slug: string) => set({ savedArticles: get().savedArticles.filter(a => a.slug !== slug) }),
		}),
		{ name: 'saved-articles', storage: createJSONStorage(() => localStorage) }
	)
);
