import { prop } from 'rambda';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

// mail selectors
export const selectGetMail = prop('getMail');
export const selectIsLoadingMail = prop('isLoadingMail');
export const selectMail = prop('mail');

// modal selectors
export const selectIsModalOpen = prop('isModalOpen');
export const selectModalContent = prop('modalContent');
export const selectSetModalContent = prop('setModalContent');
export const selectToggleModal = prop('toggleModal');

// raw zustand store
export const rawStore = set => ({
  // mail data stuff
  // action to load mail data from api
  async getMail() {
    set({ isLoadingMail: true });
    await new Promise(resolve => setTimeout(resolve, 3535));
    try {
      const res = await fetch('/api/mail');
      const mail = await res.json();
      set({ mail, isLoadingMail: false });
    } catch (err) {
      const mail = [];
      mail.error = err;
      set({ mail, isLoadingMail: false });
    }
  },

  // load state
  isLoadingMail: null,

  // array of mail items
  mail: [],

  // content modal stuff
  isModalOpen: false,
  modalContent: null,
  setModalContent(modalContent) {
    set(state => ({ ...state, modalContent }));
  },
  toggleModal() {
    set(({ isModalOpen, ...rest }) => ({ ...rest, isModalOpen: !isModalOpen }));
  }
});

// a hook that provides access to store
export const useGlobalStore = create(devtools(rawStore));
