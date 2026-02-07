# 🛍️ دليل Supabase SQL الكامل

## تشغيل هذا الكود في SQL Editor على Supabase

```sql

-- =====================================================
-- 1️⃣ إنشاء جدول المنتجات
-- =====================================================
CREATE TABLE IF NOT EXISTS public.products (
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- =====================================================
-- 2️⃣ إنشاء جدول الطلبات
-- =====================================================
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  customer_city TEXT NOT NULL,
  total_price INTEGER NOT NULL,
  items JSONB NOT NULL,
  status TEXT DEFAULT 'انتظار التحضير',
  payment_method TEXT DEFAULT 'دفع عند الاستلام',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- =====================================================
-- 3️⃣ تفعيل Row Level Security (RLS)
-- =====================================================

-- للمنتجات
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- السماح بقراءة المنتجات للجميع
CREATE POLICY "anyone_can_read_products" ON public.products
  FOR SELECT
  USING (true);

-- السماح بإضافة منتجات للمصرح لهم (ستحتاج مراجعة)
CREATE POLICY "authenticated_can_insert_products" ON public.products
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- للطلبات
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- المستخدمون يشوفوا طلباتهم فقط
CREATE POLICY "users_can_read_own_orders" ON public.orders
  FOR SELECT
  USING (auth.uid() = user_id);

-- المستخدمون يقدرين ينشئوا طلبات
CREATE POLICY "users_can_create_orders" ON public.orders
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- 4️⃣ إضافة Index لتسريع الاستعلامات
-- =====================================================
CREATE INDEX idx_orders_user_id ON public.orders(user_id);
CREATE INDEX idx_orders_created_at ON public.orders(created_at DESC);
CREATE INDEX idx_products_created_at ON public.products(created_at DESC);

-- =====================================================
-- 5️⃣ إضافة منتجات تجريبية (اختياري)
-- =====================================================
INSERT INTO public.products (name, price) VALUES
  ('فستان أسود فاخر', 299),
  ('تي شيرت بيضاء كلاسيكي', 89),
  ('جاكيت جينز عصري', 399),
  ('بنطلون أحمر مشترك', 199);

-- =====================================================
-- ✅ تم الإعداد!
-- =====================================================
```

## ⚙️ إعدادات Storage

1. اذهب إلى **Storage** في Supabase
2. أنشئ bucket جديد باسم: `products`
3. اضبط الإعدادات:
   - Public access: ✅ ON
4. انقر الـ bucket
5. اذهب إلى Policies
6. أضف policy جديد:

```sql
CREATE POLICY "allow_public_read" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'products');

CREATE POLICY "allow_authenticated_upload" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'products' AND auth.role() = 'authenticated');
```

---

**بعد تشغيل هذا الكود ستكون قاعدة البيانات جاهزة بالكامل! ✨**
