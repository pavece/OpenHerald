import { create } from 'zustand';

interface AdminUIState {
	isSideMenuOpen: boolean;
	openSideMenu: () => void;
	closeSideMenu: () => void;
}

export const useAdminUiStore = create<AdminUIState>()(set => ({
	isSideMenuOpen: false,
	openSideMenu: () => set(() => ({ isSideMenuOpen: true })),
	closeSideMenu: () => set(() => ({ isSideMenuOpen: false })),
}));
