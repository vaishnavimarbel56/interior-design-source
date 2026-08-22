import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { Download, Upload, Trash2, Pencil, Plus, RotateCcw } from "lucide-react";
import {
  useCatalog,
  upsertCategory,
  deleteCategory,
  upsertSubcategory,
  deleteSubcategory,
  upsertProduct,
  deleteProduct,
  resetCatalog,
  exportOverlay,
  importOverlay,
  fileToJpegDataUrl,
  findImageOwner,
  type ProductInput,
} from "@/lib/catalog-store";
import { inr } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminGate } from "@/components/admin-gate";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Panel | Vaishnavi Marble" },
      { name: "description", content: "Manage categories, subcategories and products locally." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminRoute,
});

function ImageField({
  value,
  onChange,
  label = "Product image (JPG)",
  exclude,
}: {
  value: string;
  onChange: (v: string) => void;
  label?: string;
  exclude?: string | undefined;
}) {
  const [busy, setBusy] = useState(false);
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex items-center gap-3">
        {value ? (
          <img src={value} alt="" className="size-16 rounded-md border border-border object-cover" />
        ) : (
          <div className="grid size-16 place-items-center rounded-md border border-dashed border-border text-[10px] text-muted-foreground">
            No image
          </div>
        )}
        <Input
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          disabled={busy}
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            setBusy(true);
            try {
              const dataUrl = await fileToJpegDataUrl(file);
              const owner = findImageOwner(dataUrl, exclude);
              if (owner) {
                e.target.value = "";
                toast.error(`Duplicate image — already used by ${owner}. Upload a unique photo.`);
                return;
              }
              onChange(dataUrl);
              toast.success("Image ready");
            } catch {
              toast.error("Could not read that image");
            } finally {
              setBusy(false);
            }
          }}
        />
      </div>
    </div>
  );
}

const emptyProduct = (category: string, subcategory: string): ProductInput => ({
  name: "",
  description: "",
  category,
  subcategory,
  image: "",
  brand: "",
  material: "",
  size: "",
  finish: "",
  color: "",
  unit: "per sq ft",
  price: 0,
  mrp: 0,
  inStock: true,
  specs: [],
});

function AdminRoute() {
  return (
    <AdminGate>
      <AdminPage />
    </AdminGate>
  );
}

function AdminPage() {
  const { categories, products, loaded } = useCatalog();
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div className="container-page py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-4xl">Admin panel</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Everything is stored in this browser (IndexedDB) — no server, no database. Export a
            backup to move it to another device.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const blob = new Blob([exportOverlay()], { type: "application/json" });
              const a = document.createElement("a");
              a.href = URL.createObjectURL(blob);
              a.download = "vaishnavi-catalog.json";
              a.click();
              URL.revokeObjectURL(a.href);
            }}
          >
            <Download className="size-4" /> Export
          </Button>
          <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
            <Upload className="size-4" /> Import
          </Button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={async (e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              try {
                importOverlay(await f.text());
                toast.success("Catalog imported");
              } catch {
                toast.error("Invalid backup file");
              }
            }}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (confirm("Reset all admin changes back to the default catalog?")) {
                resetCatalog();
                toast.success("Catalog reset");
              }
            }}
          >
            <RotateCcw className="size-4" /> Reset
          </Button>
        </div>
      </div>

      {!loaded && <p className="mt-6 text-sm text-muted-foreground">Loading saved catalog…</p>}

      <Tabs defaultValue="categories" className="mt-8">
        <TabsList>
          <TabsTrigger value="categories">Categories ({categories.length})</TabsTrigger>
          <TabsTrigger value="subcategories">Subcategories</TabsTrigger>
          <TabsTrigger value="products">Products ({products.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="mt-6">
          <CategoriesTab categories={categories} />
        </TabsContent>
        <TabsContent value="subcategories" className="mt-6">
          <SubcategoriesTab categories={categories} />
        </TabsContent>
        <TabsContent value="products" className="mt-6">
          <ProductsTab categories={categories} products={products} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* ------------------------------ categories ------------------------------ */

function CategoriesTab({ categories }: { categories: ReturnType<typeof useCatalog>["categories"] }) {
  const [form, setForm] = useState({ slug: "", name: "", tagline: "", image: "" });
  const editing = Boolean(form.slug);

  const save = () => {
    if (!form.name.trim()) {
      toast.error("Name is required");
      return;
    }
    upsertCategory({
      ...(form.slug ? { slug: form.slug } : {}),
      name: form.name.trim(),
      tagline: form.tagline.trim(),
      image: form.image,
    });
    setForm({ slug: "", name: "", tagline: "", image: "" });
    toast.success(editing ? "Category updated" : "Category added");
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
      <div className="rounded-xl border border-border bg-card p-5 shadow-card">
        <h2 className="font-display text-xl">{editing ? "Edit category" : "Add category"}</h2>
        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Tagline</Label>
            <Input
              value={form.tagline}
              onChange={(e) => setForm({ ...form, tagline: e.target.value })}
            />
          </div>
          <ImageField
            label="Category image (JPG)"
            exclude={form.slug}
            value={form.image}
            onChange={(image) => setForm({ ...form, image })}
          />
          <div className="flex gap-2">
            <Button onClick={save}>
              <Plus className="size-4" /> {editing ? "Save" : "Add"}
            </Button>
            {editing && (
              <Button
                variant="ghost"
                onClick={() => setForm({ slug: "", name: "", tagline: "", image: "" })}
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {categories.map((c) => (
          <div
            key={c.slug}
            className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-card"
          >
            <img src={c.image} alt="" className="size-14 rounded-md object-cover" />
            <div className="min-w-0 flex-1">
              <p className="font-medium text-foreground">{c.name}</p>
              <p className="truncate text-sm text-muted-foreground">{c.tagline}</p>
              <p className="text-xs text-muted-foreground">
                {c.subcategories.length} subcategories · /{c.slug}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setForm({ slug: c.slug, name: c.name, tagline: c.tagline, image: c.image })
              }
            >
              <Pencil className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (confirm(`Delete category "${c.name}" and hide its products?`)) {
                  deleteCategory(c.slug);
                  toast.success("Category deleted");
                }
              }}
            >
              <Trash2 className="size-4 text-destructive" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------- subcategories ---------------------------- */

function SubcategoriesTab({
  categories,
}: {
  categories: ReturnType<typeof useCatalog>["categories"];
}) {
  const [category, setCategory] = useState(categories[0]?.slug ?? "");
  const [form, setForm] = useState({ slug: "", name: "" });
  const active = categories.find((c) => c.slug === category) ?? categories[0];

  return (
    <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
      <div className="rounded-xl border border-border bg-card p-5 shadow-card">
        <h2 className="font-display text-xl">{form.slug ? "Rename" : "Add"} subcategory</h2>
        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <Label>Category</Label>
            <select
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setForm({ slug: "", name: "" });
              }}
            >
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label>Subcategory name</Label>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => {
                if (!form.name.trim()) {
                  toast.error("Name is required");
                  return;
                }
                upsertSubcategory(category, {
                  ...(form.slug ? { slug: form.slug } : {}),
                  name: form.name.trim(),
                });
                setForm({ slug: "", name: "" });
                toast.success("Saved");
              }}
            >
              <Plus className="size-4" /> Save
            </Button>
            {form.slug && (
              <Button variant="ghost" onClick={() => setForm({ slug: "", name: "" })}>
                Cancel
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {active?.subcategories.map((s) => (
          <div
            key={s.slug}
            className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-card"
          >
            <div className="min-w-0 flex-1">
              <p className="font-medium text-foreground">{s.name}</p>
              <p className="text-xs text-muted-foreground">/{s.slug}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setForm({ slug: s.slug, name: s.name })}
            >
              <Pencil className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (confirm(`Delete subcategory "${s.name}"?`)) {
                  deleteSubcategory(active.slug, s.slug);
                  toast.success("Subcategory deleted");
                }
              }}
            >
              <Trash2 className="size-4 text-destructive" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------- products ------------------------------- */

function ProductsTab({
  categories,
  products,
}: {
  categories: ReturnType<typeof useCatalog>["categories"];
  products: ReturnType<typeof useCatalog>["products"];
}) {
  const [query, setQuery] = useState("");
  const [slug, setSlug] = useState<string | null>(null);
  const [form, setForm] = useState<ProductInput>(() =>
    emptyProduct(categories[0]?.slug ?? "", categories[0]?.subcategories[0]?.slug ?? ""),
  );

  const subs = categories.find((c) => c.slug === form.category)?.subcategories ?? [];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? products.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            p.categoryName.toLowerCase().includes(q) ||
            p.subcategoryName.toLowerCase().includes(q),
        )
      : products;
    return list.slice(0, 60);
  }, [products, query]);

  const reset = () => {
    setSlug(null);
    setForm(emptyProduct(categories[0]?.slug ?? "", categories[0]?.subcategories[0]?.slug ?? ""));
  };

  const save = () => {
    if (!form.name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!form.category || !form.subcategory) {
      toast.error("Pick a category & subcategory");
      return;
    }
    upsertProduct({ ...form, ...(slug ? { slug } : {}), name: form.name.trim() });
    toast.success(slug ? "Product updated" : "Product added");
    reset();
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
      <div className="rounded-xl border border-border bg-card p-5 shadow-card">
        <h2 className="font-display text-xl">{slug ? "Edit product" : "Add product"}</h2>
        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Category</Label>
              <select
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                value={form.category}
                onChange={(e) => {
                  const cat = categories.find((c) => c.slug === e.target.value);
                  setForm({
                    ...form,
                    category: e.target.value,
                    subcategory: cat?.subcategories[0]?.slug ?? "",
                  });
                }}
              >
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label>Subcategory</Label>
              <select
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                value={form.subcategory}
                onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
              >
                {subs.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <ImageField exclude={form.slug} value={form.image} onChange={(image) => setForm({ ...form, image })} />

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {(
              [
                ["brand", "Brand"],
                ["material", "Material"],
                ["size", "Size"],
                ["finish", "Finish"],
                ["color", "Colour"],
                ["unit", "Unit"],
              ] as const
            ).map(([key, label]) => (
              <div key={key} className="space-y-2">
                <Label>{label}</Label>
                <Input
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                />
              </div>
            ))}
            <div className="space-y-2">
              <Label>Price (₹)</Label>
              <Input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label>MRP (₹)</Label>
              <Input
                type="number"
                value={form.mrp}
                onChange={(e) => setForm({ ...form, mrp: Number(e.target.value) })}
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.inStock}
              onChange={(e) => setForm({ ...form, inStock: e.target.checked })}
            />
            In stock
          </label>

          <SpecsEditor
            specs={form.specs}
            onChange={(specs) => setForm({ ...form, specs })}
          />

          <div className="flex gap-2">
            <Button onClick={save}>
              <Plus className="size-4" /> {slug ? "Save changes" : "Add product"}
            </Button>
            {slug && (
              <Button variant="ghost" onClick={reset}>
                Cancel
              </Button>
            )}
          </div>
        </div>
      </div>

      <div>
        <Input
          placeholder="Search products…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <p className="mt-2 text-xs text-muted-foreground">
          Showing {filtered.length} of {products.length} products
        </p>
        <div className="mt-4 space-y-3">
          {filtered.map((p) => (
            <div
              key={p.slug}
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-3 shadow-card"
            >
              <img src={p.image} alt="" className="size-14 rounded-md object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-foreground">{p.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {p.categoryName} · {p.subcategoryName} · {p.brand}
                </p>
                <p className="text-xs text-muted-foreground">
                  {inr(p.price)} {p.unit} · {p.inStock ? "In stock" : "Out of stock"}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSlug(p.slug);
                  setForm({
                    name: p.name,
                    description: p.description,
                    category: p.category,
                    subcategory: p.subcategory,
                    image: p.image,
                    brand: p.brand,
                    material: p.material,
                    size: p.size,
                    finish: p.finish,
                    color: p.color,
                    unit: p.unit,
                    price: p.price,
                    mrp: p.mrp,
                    inStock: p.inStock,
                    specs: p.specs,
                  });
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <Pencil className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (confirm(`Delete "${p.name}"?`)) {
                    deleteProduct(p.slug);
                    toast.success("Product deleted");
                  }
                }}
              >
                <Trash2 className="size-4 text-destructive" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SpecsEditor({
  specs,
  onChange,
}: {
  specs: { label: string; value: string }[];
  onChange: (s: { label: string; value: string }[]) => void;
}) {
  return (
    <div className="space-y-2">
      <Label>Specifications</Label>
      {specs.map((s, i) => (
        <div key={i} className="flex gap-2">
          <Input
            placeholder="Label"
            value={s.label}
            onChange={(e) =>
              onChange(specs.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))
            }
          />
          <Input
            placeholder="Value"
            value={s.value}
            onChange={(e) =>
              onChange(specs.map((x, j) => (j === i ? { ...x, value: e.target.value } : x)))
            }
          />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Remove spec"
            onClick={() => onChange(specs.filter((_, j) => j !== i))}
          >
            <Trash2 className="size-4 text-destructive" />
          </Button>
        </div>
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onChange([...specs, { label: "", value: "" }])}
      >
        <Plus className="size-4" /> Add spec row
      </Button>
    </div>
  );
}
