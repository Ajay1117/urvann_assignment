import { useEffect, useMemo, useState } from 'react';

type Plant = {
  _id?: string;
  name: string;
  price: number;
  categories: string[];
  available: boolean;
};

type ApiListResponse = {
  items: Plant[];
  total: number;
  page: number;
  limit: number;
  pages: number;
};

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';
const CATEGORY_OPTIONS = [
  '',
  'Indoor',
  'Outdoor',
  'Succulent',
  'Air Purifying',
  'Home Decor',
  'Low Maintenance',
  'Flowering',
  'Herb',
  'Fragrant',
  'Culinary',
  'Seasonal',
  'Colorful Foliage',
  'Feng Shui',
];

function App() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [q, setQ] = useState('');
  const [category, setCategory] = useState('');
  const [available, setAvailable] = useState<string>('');
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);

  const [form, setForm] = useState({ name: '', price: '', categories: '', available: true });
  const [creating, setCreating] = useState(false);

  const params = useMemo(() => {
    const sp = new URLSearchParams();
    if (q) sp.set('q', q);
    if (category) sp.set('category', category);
    if (available) sp.set('available', available);
    sp.set('page', String(page));
    sp.set('limit', String(limit));
    return sp.toString();
  }, [q, category, available, page, limit]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    fetch(`${API_BASE}/api/plants?${params}`)
      .then(async (r) => {
        if (!r.ok) throw new Error(await r.text());
        return (await r.json()) as ApiListResponse;
      })
      .then((data) => {
        if (!active) return;
        setPlants(data.items);
        setTotal(data.total);
        setPages(data.pages);
      })
      .catch((e) => {
        if (!active) return;
        setError(e?.message || 'Failed to load');
      })
      .finally(() => {
        if (!active) return;
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [params]);

  function resetAndReload() {
    setPage(1);
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    setError(null);
    try {
      const payload = {
        name: form.name.trim(),
        price: Number(form.price),
        categories: form.categories.split(',').map((c) => c.trim()).filter(Boolean),
        available: !!form.available,
      };
      const r = await fetch(`${API_BASE}/api/plants`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!r.ok) throw new Error(await r.text());
      setForm({ name: '', price: '', categories: '', available: true });
      resetAndReload();
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : (typeof e === 'string' ? e : 'Failed to create');
      setError(message);
    } finally {
      setCreating(false);
    }
  }

  const canPrev = page > 1;
  const canNext = page < pages;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Urvann Mini Plant Store</h1>
          <a
            className="text-sm text-blue-600 hover:underline"
            href="https://docs.google.com/document/u/0/d/1GhOKBWIRv0FKBq_OkOKEe0_CBxn7V0q7KktgR7-Kn2s/mobilebasic"
            target="_blank"
            rel="noreferrer"
          >
            Assignment Spec
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto w-full px-4 py-6 grid lg:grid-cols-12 gap-6">
        <section className="lg:col-span-9">
          <div className="flex flex-wrap gap-3 items-center mb-4">
            <input
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                resetAndReload();
              }}
              placeholder="Search by name or keyword..."
              className="w-full md:w-72 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                resetAndReload();
              }}
              className="w-full md:w-56 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            >
              {CATEGORY_OPTIONS.map((opt) => (
                <option key={opt || 'all'} value={opt}>
                  {opt || 'All Categories'}
                </option>
              ))}
            </select>
            <select
              value={available}
              onChange={(e) => {
                setAvailable(e.target.value);
                resetAndReload();
              }}
              className="w-full md:w-40 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All Stock</option>
              <option value="true">In Stock</option>
              <option value="false">Out of Stock</option>
            </select>
          </div>

          {loading && <p className="text-gray-600">Loading plants...</p>}
          {error && (
            <p className="text-red-600 whitespace-pre-wrap break-words">{error}</p>
          )}

          {!loading && !error && (
            <>
              <div className="text-sm text-gray-600 mb-2">
                Showing page {page} of {pages} • {total} result{total === 1 ? '' : 's'}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {plants.map((p) => (
                  <div key={p._id || p.name} className="border rounded-lg p-4 bg-white">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-medium text-gray-900">{p.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${p.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {p.available ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">₹ {p.price}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {p.categories.map((c) => (
                        <span key={c} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {plants.length === 0 && (
                <p className="text-gray-600 mt-6">No plants match your filters.</p>
              )}
              <div className="flex items-center justify-between mt-6">
                <button
                  disabled={!canPrev}
                  onClick={() => canPrev && setPage((p) => p - 1)}
                  className="px-3 py-1.5 rounded-md border bg-white disabled:opacity-50"
                >
                  Prev
                </button>
                <div className="text-sm text-gray-600">
                  Page {page} / {pages}
                </div>
                <button
                  disabled={!canNext}
                  onClick={() => canNext && setPage((p) => p + 1)}
                  className="px-3 py-1.5 rounded-md border bg-white disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </section>

        <aside className="lg:col-span-3">
          <div className="border rounded-lg p-4 bg-white">
            <h2 className="font-semibold mb-3">Add Plant (Admin)</h2>
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="mt-1 w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Price</label>
                <input
                  required
                  type="number"
                  min={0}
                  value={form.price}
                  onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                  className="mt-1 w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Categories (comma separated)</label>
                <input
                  required
                  value={form.categories}
                  onChange={(e) => setForm((f) => ({ ...f, categories: e.target.value }))}
                  className="mt-1 w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="available"
                  type="checkbox"
                  checked={form.available}
                  onChange={(e) => setForm((f) => ({ ...f, available: e.target.checked }))}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="available" className="text-sm">Available</label>
              </div>
              <button
                type="submit"
                disabled={creating}
                className="w-full rounded-md bg-blue-600 text-white py-2 hover:bg-blue-700 disabled:opacity-60"
              >
                {creating ? 'Adding...' : 'Add Plant'}
              </button>
            </form>
          </div>
        </aside>
      </main>

      <footer className="mt-auto py-6 text-center text-xs text-gray-500">
        Built for the Urvann assignment.
      </footer>
    </div>
  );
}

export default App;
