# GANK SERVICE Business Domain

## 1. Customer

Customer adalah pemilik perangkat yang menggunakan layanan GANK SERVICE.

Data utama:

- Nama
- Nomor WhatsApp
- Alamat (opsional)
- Catatan
- Created At
- Updated At

---

## 2. Device

Device adalah perangkat milik customer.

Data utama:

- Customer
- Brand
- Model
- IMEI (opsional)
- Serial Number (opsional)
- Warna
- Kondisi fisik
- Password/PIN (jangan disimpan dalam plaintext jika tidak benar-benar diperlukan)
- Catatan

Satu customer dapat memiliki banyak device.

---

## 3. Service Order

Service Order adalah transaksi servis.

Setiap Service Order memiliki nomor tiket unik.

Contoh:

GS-2026-000001

Data utama:

- Ticket Number
- Customer
- Device
- Complaint
- Initial Condition
- Status
- Assigned Technician
- Estimated Cost
- Final Cost
- Received At
- Completed At
- Notes

---

## 4. Service Status

Status servis:

RECEIVED
CHECKLIST_1
CHECKING
WAITING_APPROVAL
REPAIRING
CHECKLIST_AFTER_SERVICE
TESTING
READY
COMPLETED

Status harus memiliki history sehingga perubahan status dapat dilacak.

---

## 5. Service Item

Service Item adalah pekerjaan yang dilakukan pada sebuah Service Order.

Contoh:

- Ganti LCD
- Ganti baterai
- Flash software
- Cleaning
- Perbaikan charging

Data utama:

- Service Order
- Description
- Cost
- Technician
- Status

---

## 6. Sparepart

Sparepart adalah barang inventory yang digunakan dalam pekerjaan servis.

Data utama:

- SKU
- Name
- Brand
- Category
- Cost
- Selling Price
- Current Stock
- Minimum Stock
- Unit

---

## 7. Service Part Usage

Mencatat sparepart yang digunakan pada Service Order.

Data utama:

- Service Order
- Sparepart
- Quantity
- Unit Cost
- Selling Price

Penggunaan sparepart harus menghasilkan inventory movement.

---

## 8. Inventory Movement

Semua perubahan stok harus dapat dilacak.

Jenis movement:

- PURCHASE
- SERVICE_USAGE
- SALE
- ADJUSTMENT
- RETURN

Data utama:

- Sparepart
- Type
- Quantity
- Reference
- Cost
- Created At

---

## 9. Payment

Payment adalah pembayaran customer.

Jenis:

- SERVICE
- PRODUCT
- DEPOSIT
- REFUND

Status:

- PENDING
- PAID
- FAILED
- REFUNDED

Data utama:

- Service Order / Sale
- Amount
- Method
- Status
- Paid At
- Reference

---

## 10. Expense

Expense mencatat pengeluaran bisnis.

Contoh:

- Pembelian sparepart
- Listrik
- Internet
- Operasional
- Peralatan

Data utama:

- Category
- Description
- Amount
- Date
- Notes

---

## 11. User

Internal user:

- OWNER
- ADMIN
- TECHNICIAN

User memiliki permission berdasarkan role.

---

## 12. Service Workflow

Alur utama:

RECEIVED
→ CHECKLIST_1
→ CHECKING
→ WAITING_APPROVAL
→ REPAIRING
→ CHECKLIST_AFTER_SERVICE
→ TESTING
→ READY
→ COMPLETED

Tidak semua servis harus mengikuti setiap tahap secara kaku.

Namun setiap perubahan status harus tercatat.

---

## 13. Core Business Rule

### Customer

Satu customer dapat memiliki banyak device.

### Device

Satu device dapat memiliki banyak service order.

### Service Order

Satu service order hanya memiliki satu customer dan satu device.

### Service Order

Satu service order dapat memiliki:

- banyak service item
- banyak sparepart usage
- banyak status history
- banyak payment

### Inventory

Stok tidak boleh berubah tanpa inventory movement.

### Financial

Pendapatan dan pengeluaran harus dapat dilacak secara terpisah.

### Audit

Perubahan penting pada transaksi harus dapat dilacak berdasarkan user dan waktu.