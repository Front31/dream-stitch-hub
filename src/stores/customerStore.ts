import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  loginCustomer,
  registerCustomer,
  logoutCustomer,
  fetchCustomer,
  updateCustomer,
  recoverCustomer,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
  type ShopifyCustomer,
  type ShopifyAddress,
} from '@/lib/shopifyCustomer';
import { toast } from 'sonner';

interface CustomerStore {
  accessToken: string | null;
  expiresAt: string | null;
  customer: ShopifyCustomer | null;
  isLoading: boolean;
  devMode: boolean;

  login: (email: string, password: string) => Promise<boolean>;
  register: (input: { email: string; password: string; firstName?: string; lastName?: string }) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshCustomer: () => Promise<void>;
  updateProfile: (updates: { firstName?: string; lastName?: string; email?: string; phone?: string }) => Promise<boolean>;
  recoverPassword: (email: string) => Promise<boolean>;
  addAddress: (address: Omit<ShopifyAddress, 'id'>) => Promise<boolean>;
  editAddress: (id: string, address: Partial<Omit<ShopifyAddress, 'id'>>) => Promise<boolean>;
  removeAddress: (id: string) => Promise<boolean>;
  setDefault: (addressId: string) => Promise<boolean>;
  isAuthenticated: () => boolean;
  setDevMode: () => void;
}

export const useCustomerStore = create<CustomerStore>()(
  persist(
    (set, get) => ({
      accessToken: null,
      expiresAt: null,
      customer: null,
      isLoading: false,
      devMode: false,

      isAuthenticated: () => {
        const { accessToken, expiresAt, devMode } = get();
        if (devMode) return true;
        if (!accessToken || !expiresAt) return false;
        return new Date(expiresAt) > new Date();
      },

      setDevMode: () => {
        set({
          devMode: true,
          customer: {
            id: 'dev-customer',
            email: 'dev@example.com',
            firstName: 'Dev',
            lastName: 'User',
            phone: null,
            defaultAddress: null,
            addresses: { edges: [] },
            orders: { edges: [] },
          },
        });
      },

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const token = await loginCustomer(email, password);
          if (!token) throw new Error('Login fehlgeschlagen');
          set({ accessToken: token.accessToken, expiresAt: token.expiresAt });
          const customer = await fetchCustomer(token.accessToken);
          set({ customer });
          toast.success('Erfolgreich angemeldet!');
          return true;
        } catch (error: any) {
          toast.error('Login fehlgeschlagen', { description: error.message });
          return false;
        } finally {
          set({ isLoading: false });
        }
      },

      register: async (input) => {
        set({ isLoading: true });
        try {
          await registerCustomer(input);
          toast.success('Konto erstellt!', { description: 'Du kannst dich jetzt anmelden.' });
          return true;
        } catch (error: any) {
          toast.error('Registrierung fehlgeschlagen', { description: error.message });
          return false;
        } finally {
          set({ isLoading: false });
        }
      },

      logout: async () => {
        const { accessToken } = get();
        if (accessToken) {
          try { await logoutCustomer(accessToken); } catch { /* ignore */ }
        }
        set({ accessToken: null, expiresAt: null, customer: null });
        toast.success('Abgemeldet');
      },

      refreshCustomer: async () => {
        const { accessToken, isAuthenticated, devMode } = get();
        if (devMode) return;
        if (!accessToken || !isAuthenticated()) {
          set({ accessToken: null, expiresAt: null, customer: null });
          return;
        }
        try {
          const customer = await fetchCustomer(accessToken);
          if (!customer) {
            set({ accessToken: null, expiresAt: null, customer: null });
            return;
          }
          set({ customer });
        } catch {
          set({ accessToken: null, expiresAt: null, customer: null });
        }
      },

      updateProfile: async (updates) => {
        const { accessToken } = get();
        if (!accessToken) return false;
        set({ isLoading: true });
        try {
          await updateCustomer(accessToken, updates);
          await get().refreshCustomer();
          toast.success('Profil aktualisiert');
          return true;
        } catch (error: any) {
          toast.error('Fehler', { description: error.message });
          return false;
        } finally {
          set({ isLoading: false });
        }
      },

      recoverPassword: async (email) => {
        set({ isLoading: true });
        try {
          await recoverCustomer(email);
          toast.success('E-Mail gesendet', { description: 'Prüfe dein Postfach für den Passwort-Reset.' });
          return true;
        } catch (error: any) {
          toast.error('Fehler', { description: error.message });
          return false;
        } finally {
          set({ isLoading: false });
        }
      },

      addAddress: async (address) => {
        const { accessToken } = get();
        if (!accessToken) return false;
        set({ isLoading: true });
        try {
          await createAddress(accessToken, address);
          await get().refreshCustomer();
          toast.success('Adresse hinzugefügt');
          return true;
        } catch (error: any) {
          toast.error('Fehler', { description: error.message });
          return false;
        } finally {
          set({ isLoading: false });
        }
      },

      editAddress: async (id, address) => {
        const { accessToken } = get();
        if (!accessToken) return false;
        set({ isLoading: true });
        try {
          await updateAddress(accessToken, id, address);
          await get().refreshCustomer();
          toast.success('Adresse aktualisiert');
          return true;
        } catch (error: any) {
          toast.error('Fehler', { description: error.message });
          return false;
        } finally {
          set({ isLoading: false });
        }
      },

      removeAddress: async (id) => {
        const { accessToken } = get();
        if (!accessToken) return false;
        set({ isLoading: true });
        try {
          await deleteAddress(accessToken, id);
          await get().refreshCustomer();
          toast.success('Adresse gelöscht');
          return true;
        } catch (error: any) {
          toast.error('Fehler', { description: error.message });
          return false;
        } finally {
          set({ isLoading: false });
        }
      },

      setDefault: async (addressId) => {
        const { accessToken } = get();
        if (!accessToken) return false;
        set({ isLoading: true });
        try {
          await setDefaultAddress(accessToken, addressId);
          await get().refreshCustomer();
          toast.success('Standard-Adresse gesetzt');
          return true;
        } catch (error: any) {
          toast.error('Fehler', { description: error.message });
          return false;
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'shopify-customer',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        expiresAt: state.expiresAt,
        devMode: state.devMode,
        customer: state.devMode ? state.customer : null,
      }),
    }
  )
);
