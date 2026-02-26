import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, MapPin, UserCircle, LogOut, Loader2, Plus, Trash2, Star, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCustomerStore } from '@/stores/customerStore';
import type { ShopifyAddress, ShopifyOrder } from '@/lib/shopifyCustomer';
import FloatingHeader from '@/components/FloatingHeader';
import Footer from '@/components/Footer';
import { useTranslation } from '@/hooks/useTranslation';

type Section = 'orders' | 'addresses' | 'profile';

const Account = () => {
  const navigate = useNavigate();
  const { customer, isLoading, isAuthenticated, refreshCustomer, logout, updateProfile, addAddress, editAddress, removeAddress, setDefault } = useCustomerStore();
  const [activeSection, setActiveSection] = useState<Section>('orders');
  const { t } = useTranslation();

  useEffect(() => { if (!isAuthenticated()) { navigate('/login'); return; } refreshCustomer(); }, []);

  const handleLogout = async () => { await logout(); navigate('/'); };

  if (!customer) {
    return <div className="min-h-screen bg-background"><FloatingHeader /><div className="pt-32 flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div></div>;
  }

  const sections: { key: Section; label: string; icon: React.ReactNode }[] = [
    { key: 'orders', label: t('account.orders'), icon: <Package className="h-4 w-4" /> },
    { key: 'addresses', label: t('account.addresses'), icon: <MapPin className="h-4 w-4" /> },
    { key: 'profile', label: t('account.profile'), icon: <UserCircle className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      <FloatingHeader />
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-display text-2xl font-bold text-foreground">{t('account.hello', { name: customer.firstName || 'Kunde' })}</h1>
                <p className="text-muted-foreground text-sm">{customer.email}</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}><LogOut className="h-4 w-4 mr-2" />{t('account.logout')}</Button>
            </div>
            <div className="flex gap-1 mb-8 p-1 bg-secondary/50 rounded-lg overflow-x-auto">
              {sections.map(({ key, label, icon }) => (
                <button key={key} onClick={() => setActiveSection(key)} className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all whitespace-nowrap ${activeSection === key ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
                  {icon}{label}
                </button>
              ))}
            </div>
            {activeSection === 'orders' && <OrdersSection orders={customer.orders.edges.map(e => e.node)} />}
            {activeSection === 'addresses' && <AddressesSection addresses={customer.addresses.edges.map(e => e.node)} defaultId={customer.defaultAddress?.id || null} onAdd={addAddress} onEdit={editAddress} onRemove={removeAddress} onSetDefault={setDefault} isLoading={isLoading} />}
            {activeSection === 'profile' && <ProfileSection customer={customer} onUpdate={updateProfile} isLoading={isLoading} />}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const OrdersSection = ({ orders }: { orders: ShopifyOrder[] }) => {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const { t } = useTranslation();

  if (orders.length === 0) return <div className="text-center py-12"><Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" /><p className="text-muted-foreground">{t('account.no_orders')}</p></div>;

  const statusLabels: Record<string, string> = {
    PAID: t('order.paid'), PENDING: t('order.pending'), REFUNDED: t('order.refunded'), PARTIALLY_REFUNDED: t('order.partially_refunded'),
    FULFILLED: t('order.fulfilled'), UNFULFILLED: t('order.unfulfilled'), PARTIALLY_FULFILLED: t('order.partially_fulfilled'),
  };

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="border border-border rounded-lg overflow-hidden">
          <button onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)} className="w-full flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors">
            <div className="flex items-center gap-4 text-left">
              <span className="font-display font-semibold">#{order.orderNumber}</span>
              <span className="text-sm text-muted-foreground">{new Date(order.processedAt).toLocaleDateString('de-DE')}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{statusLabels[order.financialStatus] || order.financialStatus}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{statusLabels[order.fulfillmentStatus] || order.fulfillmentStatus}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-accent">{parseFloat(order.totalPrice.amount).toFixed(2)} {order.totalPrice.currencyCode}</span>
              {expandedOrder === order.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>
          </button>
          {expandedOrder === order.id && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="border-t border-border p-4">
              <div className="space-y-3">
                {order.lineItems.edges.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    {item.node.variant?.image && <img src={item.node.variant.image.url} alt="" className="w-12 h-12 object-cover rounded" />}
                    <div className="flex-1"><p className="text-sm font-medium">{item.node.title}</p>{item.node.variant && <p className="text-xs text-muted-foreground">{item.node.variant.title}</p>}</div>
                    <span className="text-sm">×{item.node.quantity}</span>
                    {item.node.variant && <span className="text-sm font-medium">{parseFloat(item.node.variant.price.amount).toFixed(2)} {item.node.variant.price.currencyCode}</span>}
                  </div>
                ))}
              </div>
              {order.statusUrl && <a href={order.statusUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-4 text-sm text-accent hover:underline"><ExternalLink className="h-3 w-3" />{t('account.order_status')}</a>}
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
};

const AddressesSection = ({ addresses, defaultId, onAdd, onEdit, onRemove, onSetDefault, isLoading }: { addresses: ShopifyAddress[]; defaultId: string | null; onAdd: (address: Omit<ShopifyAddress, 'id'>) => Promise<boolean>; onEdit: (id: string, address: Partial<Omit<ShopifyAddress, 'id'>>) => Promise<boolean>; onRemove: (id: string) => Promise<boolean>; onSetDefault: (id: string) => Promise<boolean>; isLoading: boolean }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ firstName: '', lastName: '', address1: '', address2: '', city: '', zip: '', country: 'DE', province: '', phone: '' });
  const { t } = useTranslation();

  const resetForm = () => { setForm({ firstName: '', lastName: '', address1: '', address2: '', city: '', zip: '', country: 'DE', province: '', phone: '' }); setShowForm(false); setEditingId(null); };
  const startEdit = (addr: ShopifyAddress) => { setForm({ firstName: addr.firstName || '', lastName: addr.lastName || '', address1: addr.address1, address2: addr.address2 || '', city: addr.city, zip: addr.zip, country: addr.country, province: addr.province || '', phone: addr.phone || '' }); setEditingId(addr.id); setShowForm(true); };
  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); const addressData = { ...form, address2: form.address2 || null, province: form.province || null, phone: form.phone || null } as any; const success = editingId ? await onEdit(editingId, addressData) : await onAdd(addressData); if (success) resetForm(); };

  return (
    <div className="space-y-4">
      {addresses.map((addr) => (
        <div key={addr.id} className={`p-4 border rounded-lg ${addr.id === defaultId ? 'border-accent' : 'border-border'}`}>
          <div className="flex items-start justify-between">
            <div>
              {addr.id === defaultId && <span className="inline-flex items-center gap-1 text-xs text-accent font-medium mb-1"><Star className="h-3 w-3" />{t('account.default_address')}</span>}
              <p className="font-medium">{addr.firstName} {addr.lastName}</p>
              <p className="text-sm text-muted-foreground">{addr.address1}{addr.address2 ? `, ${addr.address2}` : ''}</p>
              <p className="text-sm text-muted-foreground">{addr.zip} {addr.city}, {addr.country}</p>
            </div>
            <div className="flex gap-2">
              {addr.id !== defaultId && <Button variant="ghost" size="sm" onClick={() => onSetDefault(addr.id)} disabled={isLoading}><Star className="h-3 w-3" /></Button>}
              <Button variant="ghost" size="sm" onClick={() => startEdit(addr)}>{t('account.edit')}</Button>
              <Button variant="ghost" size="sm" onClick={() => onRemove(addr.id)} disabled={isLoading}><Trash2 className="h-3 w-3" /></Button>
            </div>
          </div>
        </div>
      ))}
      {showForm ? (
        <form onSubmit={handleSubmit} className="space-y-3 p-4 border border-border rounded-lg">
          <div className="grid grid-cols-2 gap-3">
            <Input placeholder={t('account.first_name')} value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} required />
            <Input placeholder={t('account.last_name')} value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} required />
          </div>
          <Input placeholder={t('account.street')} value={form.address1} onChange={(e) => setForm({ ...form, address1: e.target.value })} required />
          <Input placeholder={t('account.address_extra')} value={form.address2} onChange={(e) => setForm({ ...form, address2: e.target.value })} />
          <div className="grid grid-cols-3 gap-3">
            <Input placeholder={t('account.zip')} value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} required />
            <Input placeholder={t('account.city')} value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} required className="col-span-2" />
          </div>
          <Input placeholder={t('account.country_label')} value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} required />
          <Input placeholder={t('account.phone')} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <div className="flex gap-2">
            <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>{isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : (editingId ? t('account.save') : t('account.add'))}</Button>
            <Button type="button" variant="outline" onClick={resetForm}>{t('account.cancel')}</Button>
          </div>
        </form>
      ) : (
        <Button variant="outline" onClick={() => setShowForm(true)} className="w-full"><Plus className="h-4 w-4 mr-2" />{t('account.new_address')}</Button>
      )}
    </div>
  );
};

const ProfileSection = ({ customer, onUpdate, isLoading }: { customer: { firstName: string | null; lastName: string | null; email: string; phone: string | null }; onUpdate: (u: { firstName?: string; lastName?: string; phone?: string }) => Promise<boolean>; isLoading: boolean }) => {
  const [form, setForm] = useState({ firstName: customer.firstName || '', lastName: customer.lastName || '', phone: customer.phone || '' });
  const { t } = useTranslation();
  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); await onUpdate(form); };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div className="grid grid-cols-2 gap-3">
        <div><label className="text-sm font-medium text-foreground mb-1 block">{t('account.first_name')}</label><Input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} /></div>
        <div><label className="text-sm font-medium text-foreground mb-1 block">{t('account.last_name')}</label><Input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} /></div>
      </div>
      <div><label className="text-sm font-medium text-foreground mb-1 block">{t('contact.email')}</label><Input value={customer.email} disabled className="opacity-60" /><p className="text-xs text-muted-foreground mt-1">{t('account.email_readonly')}</p></div>
      <div><label className="text-sm font-medium text-foreground mb-1 block">{t('account.phone')}</label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+49..." /></div>
      <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>{isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : t('account.save')}</Button>
    </form>
  );
};

export default Account;
