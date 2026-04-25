import { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useI18n } from '../contexts/I18nContext';
import StorageImage from '../components/StorageImage';
import {
  Plus, Trash2, Loader2, Shield, Upload,
  Car, CalendarCheck, DollarSign, ChevronDown,
  Pencil, X, ArrowUp, ArrowDown
} from 'lucide-react';

const STATUS_BADGE = {
  available: 'bg-emerald-100 text-emerald-700',
  rented: 'bg-rose-100 text-rose-700',
};

const BOOKING_STATUS_BADGE = {
  confirmed: 'bg-emerald-100 text-emerald-700',
  pending: 'bg-amber-100 text-amber-700',
  cancelled: 'bg-rose-100 text-rose-700',
};

export default function AdminPage() {
  const { t, isAr } = useI18n();
  const [auth, setAuth] = useState(false);
  const [password, setPassword] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [form, setForm] = useState({
    name: '',
    pricePerDay: '',
    category: 'sedan',
    status: 'available',
  });
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);

  const cars = useQuery(api.cars.getCars, { status: undefined });
  const bookings = useQuery(api.bookings.getBookings, { status: undefined });
  const analytics = useQuery(api.bookings.getAnalytics);

  const addCar = useMutation(api.cars.addCar);
  const updateCar = useMutation(api.cars.updateCar);
  const deleteCar = useMutation(api.cars.deleteCar);
  const swapOrder = useMutation(api.cars.swapOrder);
  const adminLogin = useMutation(api.auth.adminLogin);
  const generateUploadUrl = useMutation(api.cars.generateUploadUrl);
  const updateBookingStatus = useMutation(api.bookings.updateBookingStatus);

  const [loading, setLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('admin-token');
    if (token) setAuth(true);
  }, []);

  const resetForm = () => {
    setForm({ name: '', pricePerDay: '', category: 'sedan', status: 'available' });
    setImageFile(null);
    setEditingCar(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const startEdit = (car) => {
    setEditingCar(car);
    setForm({
      name: car.name,
      pricePerDay: String(car.pricePerDay),
      category: car.category || 'sedan',
      status: car.status,
    });
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      const result = await adminLogin({ password });
      if (result.success && result.token) {
        localStorage.setItem('admin-token', result.token);
        setAuth(true);
      } else {
        alert('Incorrect password');
      }
    } catch (err) {
      console.error(err);
      alert('Login failed. Check console.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin-token');
    setAuth(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.pricePerDay) return;
    setLoading(true);

    let imageId = undefined;

    try {
      if (imageFile) {
        const uploadUrl = await generateUploadUrl();
        const result = await fetch(uploadUrl, {
          method: 'POST',
          headers: { 'Content-Type': imageFile.type },
          body: imageFile,
        });
        if (!result.ok) {
          throw new Error(`Upload failed: ${result.status} ${result.statusText}`);
        }
        const responseJson = await result.json();
        imageId = responseJson.storageId;
      }

      if (editingCar) {
        await updateCar({
          id: editingCar._id,
          name: form.name,
          pricePerDay: Number(form.pricePerDay),
          status: form.status,
          category: form.category,
          ...(imageId ? { imageId } : {}),
        });
      } else {
        await addCar({
          name: form.name,
          pricePerDay: Number(form.pricePerDay),
          status: form.status,
          category: form.category,
          imageId,
        });
      }

      setShowForm(false);
      resetForm();
    } catch (err) {
      console.error(err);
      alert(`Error ${editingCar ? 'updating' : 'adding'} car`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm(t('admin.deleteConfirm') || 'Delete this car?')) return;
    try {
      await deleteCar({ id });
    } catch (err) {
      console.error(err);
      alert('Error deleting car');
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await updateBookingStatus({ id: bookingId, status: newStatus });
    } catch (err) {
      console.error(err);
      alert('Error updating booking status');
    }
  };

  const handleMoveUp = async (index) => {
    if (!cars || index <= 0) return;
    try {
      await swapOrder({ carAId: cars[index]._id, carBId: cars[index - 1]._id });
    } catch (err) {
      console.error(err);
      alert('Error moving car up');
    }
  };

  const handleMoveDown = async (index) => {
    if (!cars || index >= cars.length - 1) return;
    try {
      await swapOrder({ carAId: cars[index]._id, carBId: cars[index + 1]._id });
    } catch (err) {
      console.error(err);
      alert('Error moving car down');
    }
  };

  if (!auth) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <form
          onSubmit={handleLogin}
          className={`bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm border border-slate-100 ${isAr ? 'text-right' : 'text-left'}`}
        >
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-10 h-10 text-brand-gold" />
          </div>
          <h2 className="text-2xl font-bold text-brand-dark text-center mb-2">{t('admin.title')}</h2>
          <p className="text-sm text-brand-slate text-center mb-6">Restricted area</p>
          <input
            type="password"
            placeholder={t('admin.passwordPlaceholder')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-gold bg-slate-50 mb-4"
          />
          <button
            type="submit"
            disabled={loginLoading}
            className="w-full py-2.5 rounded-xl bg-brand-dark text-white font-semibold hover:bg-slate-800 transition disabled:opacity-60"
          >
            {loginLoading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : t('admin.login')}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className={`flex items-center justify-between mb-8 ${isAr ? 'flex-row-reverse' : ''}`}>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-brand-dark">{t('admin.title')}</h1>
          <p className="text-sm text-brand-slate mt-1">Manage your fleet, bookings, and analytics</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-brand-slate hover:text-rose-500 transition font-medium"
        >
          {t('admin.logout')}
        </button>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center">
            <Car className="w-7 h-7 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-brand-slate font-medium">{t('admin.totalCars')}</p>
            <p className="text-3xl font-bold text-brand-dark">{analytics?.totalCars ?? 0}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-emerald-50 flex items-center justify-center">
            <CalendarCheck className="w-7 h-7 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm text-brand-slate font-medium">{t('admin.activeBookings')}</p>
            <p className="text-3xl font-bold text-brand-dark">{analytics?.activeBookings ?? 0}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-brand-gold/20 flex items-center justify-center">
            <DollarSign className="w-7 h-7 text-brand-gold" />
          </div>
          <div>
            <p className="text-sm text-brand-slate font-medium">{t('admin.todayRevenue')}</p>
            <p className="text-3xl font-bold text-brand-dark">{analytics?.todayRevenue ?? 0} <span className="text-sm font-normal text-brand-slate">MAD</span></p>
          </div>
        </div>
      </div>

      {/* Car Management */}
      <div className={`bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-10 ${isAr ? 'text-right' : 'text-left'}`}>
        <div className={`p-5 border-b border-slate-100 flex items-center justify-between ${isAr ? 'flex-row-reverse' : ''}`}>
          <div>
            <h2 className="font-bold text-lg text-brand-dark">{t('admin.carManagement')}</h2>
            <p className="text-xs text-brand-slate mt-0.5">{editingCar ? 'Editing vehicle' : 'Add or modify vehicles'}</p>
          </div>
          {!showForm && (
            <button
              onClick={() => { setShowForm(true); resetForm(); }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-gold text-brand-dark font-semibold hover:bg-brand-goldHover transition text-sm shadow-sm"
            >
              <Plus className="w-4 h-4" />
              {t('admin.addCar')}
            </button>
          )}
        </div>

        {showForm && (
          <div className="p-5 bg-slate-50 border-b border-slate-100">
            <div className={`flex items-center justify-between mb-4 ${isAr ? 'flex-row-reverse' : ''}`}>
              <h3 className="font-semibold text-brand-dark">
                {editingCar ? t('admin.editCar') || 'Edit Vehicle' : t('admin.addCar')}
              </h3>
              <button
                onClick={() => { setShowForm(false); resetForm(); }}
                className="text-slate-400 hover:text-rose-500 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-6 gap-3 items-end">
              <input
                placeholder={t('admin.carName')}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-gold bg-white text-sm"
                required
              />
              <input
                type="number"
                placeholder={t('admin.pricePerDay')}
                value={form.pricePerDay}
                onChange={(e) => setForm({ ...form, pricePerDay: e.target.value })}
                className="px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-gold bg-white text-sm"
                required
              />
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-gold bg-white text-sm"
              >
                <option value="economy">{t('categories.economy')}</option>
                <option value="sedan">{t('categories.sedan')}</option>
                <option value="suv">{t('categories.suv')}</option>
                <option value="luxury">{t('categories.luxury')}</option>
              </select>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-gold bg-white text-sm"
              >
                <option value="available">{t('fleet.available')}</option>
                <option value="rented">{t('fleet.rented')}</option>
              </select>
              <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-slate-300 bg-white cursor-pointer hover:border-brand-gold transition text-sm text-slate-600">
                <Upload className="w-4 h-4" />
                <span className="truncate">{imageFile ? imageFile.name : editingCar ? 'Keep existing image' : t('admin.imageUrl')}</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
              </label>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2.5 rounded-xl bg-brand-dark text-white font-semibold hover:bg-slate-800 transition disabled:opacity-60 flex items-center justify-center gap-2 text-sm"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {editingCar ? (t('admin.update') || 'Update') : t('admin.save')}
              </button>
            </form>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-5 py-3 font-medium text-center w-16">{t('admin.order')}</th>
                <th className="px-5 py-3 font-medium text-left">{isAr ? '' : ''}Image</th>
                <th className="px-5 py-3 font-medium">{t('admin.carName')}</th>
                <th className="px-5 py-3 font-medium">{t('admin.pricePerDay')}</th>
                <th className="px-5 py-3 font-medium">{t('fleet.category')}</th>
                <th className="px-5 py-3 font-medium">{t('admin.status')}</th>
                <th className="px-5 py-3 font-medium text-center">{t('admin.actions') || 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {cars?.map((car, index) => (
                <tr key={car._id} className="hover:bg-slate-50 transition">
                  <td className="px-5 py-3 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-brand-gold/10 text-brand-gold font-bold text-sm">
                      {index + 1}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <StorageImage url={car.displayImageUrl} alt={car.name} />
                  </td>
                  <td className="px-5 py-3 font-medium text-brand-dark">{car.name}</td>
                  <td className="px-5 py-3">{car.pricePerDay} MAD</td>
                  <td className="px-5 py-3">
                    <span className="inline-flex px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium">
                      {t(`categories.${car.category || 'sedan'}`)}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_BADGE[car.status]}`}>
                      {car.status === 'available' ? t('fleet.available') : t('fleet.rented')}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => handleMoveUp(index)}
                        disabled={index === 0}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-brand-dark hover:bg-slate-100 transition disabled:opacity-30 disabled:cursor-not-allowed"
                        title={t('admin.moveUp')}
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleMoveDown(index)}
                        disabled={index === (cars?.length ?? 0) - 1}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-brand-dark hover:bg-slate-100 transition disabled:opacity-30 disabled:cursor-not-allowed"
                        title={t('admin.moveDown')}
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                      <div className="w-px h-4 bg-slate-200 mx-1" />
                      <button
                        onClick={() => startEdit(car)}
                        className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-50 transition"
                        title={t('admin.edit')}
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(car._id)}
                        className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-50 transition"
                        title={t('admin.delete')}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {cars?.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-brand-slate">
                    No cars found. Add one above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bookings Overview */}
      <div className={`bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden ${isAr ? 'text-right' : 'text-left'}`}>
        <div className="p-5 border-b border-slate-100">
          <h2 className="font-bold text-lg text-brand-dark">{t('admin.bookings')}</h2>
          <p className="text-xs text-brand-slate mt-0.5">Recent booking requests</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-5 py-3 font-medium">{t('booking.car')}</th>
                <th className="px-5 py-3 font-medium">{t('booking.name')}</th>
                <th className="px-5 py-3 font-medium">{t('booking.phone')}</th>
                <th className="px-5 py-3 font-medium">{t('booking.location')}</th>
                <th className="px-5 py-3 font-medium">{t('booking.startDate')}</th>
                <th className="px-5 py-3 font-medium">{t('booking.endDate')}</th>
                <th className="px-5 py-3 font-medium">{t('booking.total')}</th>
                <th className="px-5 py-3 font-medium">{t('admin.status')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookings?.map((booking) => (
                <tr key={booking._id} className="hover:bg-slate-50 transition">
                  <td className="px-5 py-3 font-medium text-brand-dark">{booking.carName}</td>
                  <td className="px-5 py-3">{booking.customerName}</td>
                  <td className="px-5 py-3">{booking.customerPhone}</td>
                  <td className="px-5 py-3">{booking.location}</td>
                  <td className="px-5 py-3">{booking.startDate}</td>
                  <td className="px-5 py-3">{booking.endDate}</td>
                  <td className="px-5 py-3 font-semibold">{booking.totalPrice} MAD</td>
                  <td className="px-5 py-3">
                    <div className="relative inline-block">
                      <select
                        value={booking.status}
                        onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                        className={`appearance-none px-3 py-1 pr-7 rounded-full text-xs font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-gold ${BOOKING_STATUS_BADGE[booking.status]}`}
                      >
                        <option value="pending">{t('admin.pending')}</option>
                        <option value="confirmed">{t('admin.confirmed')}</option>
                        <option value="cancelled">{t('admin.cancelled')}</option>
                      </select>
                      <ChevronDown className="w-3 h-3 absolute top-1/2 right-2 -translate-y-1/2 pointer-events-none opacity-60" />
                    </div>
                  </td>
                </tr>
              ))}
              {bookings?.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-10 text-center text-brand-slate">
                    No bookings yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

