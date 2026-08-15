# GANK SERVICE — BUSINESS DOMAIN SPECIFICATION v1.0

**Status:** Updated — Pending Final Approval  
**Document Type:** Business Domain Specification  
**Product:** GANK SERVICE  
**Version:** 1.1

---

## 1. Purpose

Dokumen ini mendefinisikan domain bisnis utama untuk internal system manajemen usaha **GANK SERVICE**.

Dokumen ini menjadi **source of truth bisnis** sebelum proses:

1. Technical Architecture
2. Database Schema
3. API Contract
4. Permission Matrix
5. UI/UX Flow
6. Implementation
7. Testing
8. Deployment

AI/coding agent tidak boleh mengubah business rule dalam dokumen ini berdasarkan asumsi teknis. Perubahan terhadap business rule harus mendapat persetujuan Owner.

---

# 2. Business Overview

GANK SERVICE memiliki dua alur bisnis utama:

```text
GANK SERVICE
│
├── SERVICE BUSINESS
│   ├── Customer
│   ├── Device
│   ├── Service Order
│   ├── Service Item
│   ├── Sparepart
│   ├── Payment
│   └── Service Profit
│
└── USED PHONE SALES
    ├── Used Phone Inventory
    ├── Sale
    ├── Sale Item
    ├── Payment
    └── Sales Profit
```

Sistem internal digunakan oleh:

- OWNER
- ADMIN
- TECHNICIAN

---

# 3. Core Domain

## 3.1 Customer

Customer adalah pemilik perangkat yang menggunakan layanan GANK SERVICE.

### Data Utama

- ID
- Nama
- Nomor WhatsApp
- Alamat (opsional)
- Catatan (opsional)
- Created At
- Updated At

### Business Rules

- Satu customer dapat memiliki banyak device.
- Satu customer dapat memiliki banyak service order.
- Customer dapat melakukan transaksi pembelian HP bekas.

---

# 4. Device

Device adalah perangkat milik customer yang masuk ke GANK SERVICE untuk diservis.

### Data Utama

- ID
- Customer
- Brand
- Model
- IMEI (opsional)
- Serial Number (opsional)
- Warna
- Kondisi Fisik
- Catatan
- Created At
- Updated At

### Security Rule

**Password/PIN perangkat customer tidak disimpan oleh sistem.**

### Relationship

```text
Customer 1 ─── N Device
Device   1 ─── N Service Order
```

---

# 5. Service Order

Service Order adalah transaksi utama layanan servis.

Setiap Service Order memiliki nomor tiket unik.

Contoh:

```text
GS-2026-000001
```

### Data Utama

- ID
- Ticket Number
- Customer
- Device
- Complaint
- Initial Condition
- Status
- Assigned Technician
- Estimated Service Cost
- Estimated Parts Cost
- Estimated Total
- Final Service Cost
- Final Parts Cost
- Final Total
- Received At
- Completed At
- Notes
- Created At
- Updated At

### Relationship

```text
Service Order 1 ─── N Service Item
Service Order 1 ─── N Service Part Usage
Service Order 1 ─── N Service Status History
Service Order 1 ─── N Payment
Service Order 1 ─── N Service Approval
```

### Financial Separation

Biaya jasa dan sparepart harus dipisahkan.

```text
Estimated Service Cost
Estimated Parts Cost
Estimated Total

Final Service Cost
Final Parts Cost
Final Total
```

Tujuan:

- menghitung revenue jasa
- menghitung revenue sparepart
- menghitung cost jasa
- menghitung cost sparepart
- menghitung profit jasa
- menghitung profit sparepart
- menghitung gross profit service

---

# 6. Service Status

Status resmi Service Order:

```text
RECEIVED
CHECKLIST_1
CHECKING
WAITING_APPROVAL
REPAIRING
CHECKLIST_AFTER_SERVICE
TESTING
READY
COMPLETED
```

## 6.1 Default Workflow

```text
RECEIVED
→ CHECKLIST_1
→ CHECKING
→ WAITING_APPROVAL
→ REPAIRING
→ CHECKLIST_AFTER_SERVICE
→ TESTING
→ READY
→ COMPLETED
```

## 6.2 Flexible Workflow

Workflow **tidak bersifat rigid**.

Tidak semua service harus melewati seluruh status.

Contoh:

```text
RECEIVED
→ CHECKING
→ REPAIRING
→ TESTING
→ READY
→ COMPLETED
```

Status transition harus mengikuti business rules yang ditentukan sistem dan tidak boleh diasumsikan selalu linear.

---

# 7. Service Status History

Setiap perubahan status Service Order wajib tercatat.

### Data Utama

- ID
- Service Order
- From Status
- To Status
- Changed By
- Changed At
- Note (opsional)

Contoh:

```text
GS-2026-000001

10:02 RECEIVED
10:08 CHECKLIST_1
10:30 CHECKING
11:15 WAITING_APPROVAL
13:40 REPAIRING
15:20 TESTING
16:00 READY
```

### Business Rule

Tidak boleh ada perubahan status penting yang tidak memiliki history.

History digunakan untuk:

- audit lifecycle
- menghitung durasi service
- analisis bottleneck
- technician performance
- service performance

---

# 8. Customer Approval

Customer approval diperlukan ketika Service Order berada pada:

```text
WAITING_APPROVAL
```

Flow:

```text
CHECKING
    ↓
Diagnosis
    ↓
Estimated Cost
    ↓
WAITING_APPROVAL
    ↓
CUSTOMER APPROVAL
    ↓
REPAIRING
```

## 8.1 Approval Requirement

Approval berasal dari **CUSTOMER**.

Approval wajib memiliki bukti/history.

### Approval Channel

Customer approval dilakukan melalui **WhatsApp yang telah diinformasikan oleh Admin kepada customer**.

Nomor WhatsApp yang digunakan untuk approval harus dapat ditelusuri dalam history approval.

### Data Konseptual

- ID
- Service Order
- Estimated Service Cost
- Estimated Parts Cost
- Estimated Total
- Approval Status
- Approval Channel
- WhatsApp Number / Contact Reference
- Evidence / Message Reference
- Approved At
- Rejected At
- Created At

### Status Approval

```text
PENDING
APPROVED
REJECTED
```

### Business Rule

- Approval harus berasal dari customer.
- Approval harus dilakukan melalui WhatsApp yang telah diinformasikan Admin.
- Sistem harus menyimpan history/evidence approval.
- Nilai estimasi yang disetujui harus dapat ditelusuri.
- Approval tidak boleh dianggap valid jika tidak memiliki history/evidence.

---

# 9. Service Item

Service Item adalah pekerjaan yang dilakukan pada sebuah Service Order.

Contoh:

- Ganti LCD
- Ganti baterai
- Flash software
- Cleaning
- Perbaikan charging

### Data Utama

- ID
- Service Order
- Description
- Cost
- Technician
- Status
- Created At
- Updated At

### Relationship

```text
Service Order 1 ─── N Service Item
```

---

# 10. Sparepart

Sparepart adalah barang inventory yang digunakan dalam pekerjaan servis.

### Data Utama

- ID
- SKU
- Name
- Brand
- Category
- Cost
- Selling Price
- Current Stock
- Minimum Stock
- Unit
- Created At
- Updated At

### Financial Role

Sparepart memiliki:

- Unit Cost
- Selling Price

Sehingga profit sparepart dapat dihitung secara terpisah.

---

# 11. Service Part Usage

Service Part Usage mencatat sparepart yang digunakan pada Service Order.

### Data Utama

- ID
- Service Order
- Sparepart
- Quantity
- Unit Cost
- Selling Price
- Created At

Contoh:

```text
LCD Samsung A15
Quantity: 1
Unit Cost: Rp500.000
Selling Price: Rp700.000
```

### Business Rule

Penggunaan sparepart harus menghasilkan Inventory Movement dengan tipe:

```text
SERVICE_USAGE
```

---

# 12. Inventory

Inventory menggunakan dua konsep:

```text
Inventory Movement Ledger
+
Current Stock Projection
```

## 12.1 Inventory Movement

Semua perubahan stock harus dapat dilacak.

### Jenis Movement

```text
PURCHASE
SERVICE_USAGE
SALE
ADJUSTMENT
RETURN
```

### Data Utama

- ID
- Inventory Item / Sparepart / Used Phone
- Type
- Quantity
- Reference
- Cost
- Created At

### Core Rule

> Stok tidak boleh berubah tanpa Inventory Movement.

Inventory Movement menjadi ledger/audit sumber perubahan stock.

`currentStock` digunakan sebagai projection untuk query operasional yang cepat.

---

# 13. Sparepart Inventory

Sparepart dan HP bekas adalah inventory dengan karakteristik berbeda.

```text
Sparepart Inventory
        ≠
Used Phone Inventory
```

### Sparepart Movement

Umumnya:

```text
PURCHASE
SERVICE_USAGE
ADJUSTMENT
RETURN
```

`SALE` hanya digunakan bila memang ada penjualan sparepart sebagai produk terpisah dan telah masuk scope bisnis.

---

# 14. Used Phone Business

GANK SERVICE menjual **HP bekas**.

HP bekas diperlakukan sebagai inventory individual, bukan stock massal berdasarkan model.

HP bekas dapat diperoleh melalui seluruh sumber acquisition yang disetujui bisnis:

- Pembelian dari customer
- Supplier
- Trade-in customer
- Kombinasi sumber tersebut

Contoh:

```text
USED-000001
iPhone 11
64GB
Black
Cost: Rp3.500.000
Selling Price: Rp4.200.000
Status: AVAILABLE
```

## 14.1 Used Phone

Data konseptual:

- ID
- SKU / Inventory Number
- Acquisition Source
- Brand
- Model
- IMEI
- Serial Number
- Storage
- Color
- Physical Condition
- Purchase Cost
- Selling Price
- Status
- Created At
- Updated At

## 14.2 Used Phone Inspection

HP bekas memiliki proses pemeriksaan sebelum tersedia untuk dijual.

Pemeriksaan dapat mencakup:

- IMEI check
- Physical check
- Battery health
- Screen
- Camera
- Speaker
- Charging
- Grade

Hasil inspection harus dapat ditelusuri ke unit HP bekas yang diperiksa.

### Status Konseptual

```text
INSPECTION
AVAILABLE
SOLD
```

Status tambahan dapat ditambahkan bila diperlukan oleh business workflow yang telah disetujui.

---

# 15. Used Phone Sale

Penjualan HP bekas menggunakan transaksi Sale.

```text
Sale
│
├── Customer
│
├── Sale Item
│      │
│      └── Used Phone
│
└── Payment
```

### Sale

Data konseptual:

- ID
- Sale Number
- Customer
- Total
- Status
- Created At
- Updated At

### Sale Item

Data konseptual:

- ID
- Sale
- Used Phone
- Selling Price
- Cost
- Profit

### Business Rule

Satu transaksi sale dapat memiliki lebih dari satu Sale Item.

### Refund Rule

Jika penjualan HP bekas direfund sesuai business rules yang berlaku:

```text
SOLD
 ↓
REFUND
 ↓
AVAILABLE
```

Unit HP bekas yang dikembalikan ke inventory harus menghasilkan Inventory Movement yang sesuai dan dapat ditelusuri ke transaksi refund.

---

# 16. Used Phone Inventory Movement

Penjualan HP bekas menghasilkan:

```text
Inventory Movement
Type = SALE
```

Flow:

```text
Used Phone
    ↓
INSPECTION
    ↓
AVAILABLE
    ↓
Sale
    ↓
Payment
    ↓
Inventory Movement(SALE)
    ↓
SOLD
```

Jika terjadi refund yang memenuhi business rules:

```text
SOLD
    ↓
REFUND
    ↓
Inventory Movement(RETURN)
    ↓
AVAILABLE
```

Setiap unit HP bekas dapat dilacak sampai transaksi penjualannya.

---

# 17. Payment

Payment adalah pembayaran yang diterima atau diproses oleh GANK SERVICE.

## 17.1 Payment Type

```text
SERVICE
PRODUCT
DEPOSIT
REFUND
```

`PRODUCT` digunakan untuk pembayaran penjualan HP bekas.

## 17.2 Payment Status

```text
PENDING
PAID
FAILED
REFUNDED
```

## 17.3 Data Utama

- ID
- Type
- Service Order (opsional)
- Sale (opsional)
- Amount
- Method
- Status
- Paid At
- Reference
- Created At
- Updated At

## 17.4 Multiple Payments

Satu Service Order dapat memiliki banyak Payment.

Contoh:

```text
Service Order
│
├── Payment #1 — DP       Rp500.000
├── Payment #2 — Transfer Rp300.000
└── Payment #3 — QRIS     Rp200.000
```

---

# 18. Expense

Expense mencatat pengeluaran bisnis.

Contoh:

- Pembelian sparepart
- Listrik
- Internet
- Operasional
- Peralatan

### Data Utama

- ID
- Category
- Description
- Amount
- Date
- Notes
- Created At
- Updated At

---

# 19. Financial Model

Sistem harus dapat memisahkan:

```text
REVENUE
├── Service Revenue
├── Parts Revenue
└── Used Phone Sales Revenue

COST
├── Service Cost
├── Parts Cost
└── Used Phone Product Cost

GROSS PROFIT
├── Service Profit
├── Parts Profit
└── Used Phone Sales Profit

OPERATING EXPENSE
└── Expense

NET PROFIT
```

## 19.1 Service Profit

```text
Service Revenue
-
Service Cost
=
Service Profit
```

## 19.2 Parts Profit

```text
Parts Revenue
-
Parts Cost
=
Parts Profit
```

## 19.3 Used Phone Profit

```text
Sales Revenue
-
Product Cost
=
Used Phone Gross Profit
```

## 19.4 Business Profit

Secara konseptual:

```text
Total Revenue
-
Total COGS
=
Gross Profit

Gross Profit
-
Operating Expense
=
Net Profit
```

---

# 20. User

Internal users:

```text
OWNER
ADMIN
TECHNICIAN
```

User memiliki permission berdasarkan role.

Authorization menggunakan model:

```text
Role
+
Permission
+
Scope
```

Permission menggunakan format:

```text
resource.action
```

Custom scope dapat menggunakan kombinasi:

```text
AND
OR
Grouping
```

OWNER memiliki kewenangan tertinggi dalam pengelolaan permission dan custom scope sesuai authorization rules sistem.

---

# 21. Audit

Audit digunakan untuk melacak perubahan penting pada transaksi dan resource.

Audit Log secara konseptual menyimpan:

- ID
- Actor/User
- Action
- Resource Type
- Resource ID
- Old Value
- New Value
- Timestamp

Contoh:

```text
ADMIN
UPDATE_PAYMENT
Payment #123
PENDING → PAID
2026-08-15 10:32
```

atau:

```text
OWNER
ADJUST_INVENTORY
UsedPhone #001
AVAILABLE → SOLD
```

---

# 22. Status History vs Audit Log

Keduanya merupakan konsep berbeda.

## Service Status History

Digunakan untuk lifecycle Service Order.

```text
RECEIVED → CHECKING
```

## Audit Log

Digunakan untuk perubahan penting pada data.

```text
estimatedTotal
Rp500.000
→
Rp750.000
```

Maka:

```text
ServiceStatusHistory
        ≠
AuditLog
```

Keduanya wajib dipertahankan.

---

# 23. Core Relationships

```text
Customer 1 ─── N Device

Customer 1 ─── N ServiceOrder

Device 1 ─── N ServiceOrder

ServiceOrder 1 ─── N ServiceItem

ServiceOrder 1 ─── N ServicePartUsage

ServiceOrder 1 ─── N ServiceStatusHistory

ServiceOrder 1 ─── N ServiceApproval

ServiceOrder 1 ─── N Payment

Sparepart 1 ─── N ServicePartUsage

Sparepart 1 ─── N InventoryMovement

Customer 1 ─── N Sale

Sale 1 ─── N SaleItem

Sale 1 ─── N Payment

UsedPhone 1 ─── N SaleItem

UsedPhone 1 ─── N InventoryMovement
```

---

# 24. Core Business Invariants

## Customer

- Customer dapat memiliki banyak Device.
- Customer dapat memiliki banyak Service Order.

## Device

- Device harus memiliki satu Customer.
- Device dapat memiliki banyak Service Order.
- Password/PIN perangkat tidak disimpan.

## Service Order

- Setiap Service Order memiliki Ticket Number unik.
- Service Order memiliki tepat satu Customer.
- Service Order memiliki tepat satu Device.
- Service Order dapat memiliki banyak Service Item.
- Service Order dapat memiliki banyak Sparepart Usage.
- Service Order dapat memiliki banyak Payment.
- Service Order dapat memiliki banyak Status History.
- Service Order dapat memiliki Customer Approval.

## Service Status

- Setiap perubahan status harus tercatat.
- Workflow tidak harus selalu mengikuti seluruh tahap.
- Transition tidak boleh menghilangkan audit lifecycle.

## Customer Approval

- Approval berasal dari Customer.
- Approval harus memiliki bukti/history.
- Service yang membutuhkan approval tidak boleh dianggap approved tanpa approval customer.

## Inventory

- Stock tidak boleh berubah tanpa Inventory Movement.
- Inventory Movement harus memiliki reference yang dapat dilacak.
- Current Stock adalah projection, bukan pengganti ledger.

## Sparepart

- Service Part Usage harus menghasilkan Inventory Movement `SERVICE_USAGE`.
- Cost dan Selling Price harus disimpan untuk perhitungan profit.

## Used Phone

- Setiap HP bekas adalah inventory individual.
- HP bekas yang terjual harus memiliki Sale Item.
- Penjualan HP bekas menghasilkan Inventory Movement `SALE`.

## Financial

- Revenue dan Expense harus dapat dilacak terpisah.
- Service Cost dan Parts Cost harus dapat dihitung terpisah.
- Used Phone Product Cost harus dapat dihitung.
- Profit harus dapat dihitung berdasarkan sumber pendapatan.

## Audit

- Perubahan penting pada transaksi harus dapat dilacak berdasarkan user dan waktu.
- Status History tidak menggantikan Audit Log.

---

# 25. Domain Modules

Struktur domain konseptual:

```text
GANK SERVICE
│
├── CUSTOMER
│   ├── Customer
│   └── Device
│
├── SERVICE
│   ├── ServiceOrder
│   ├── ServiceItem
│   ├── ServiceStatusHistory
│   └── ServiceApproval
│
├── SPAREPART INVENTORY
│   ├── Sparepart
│   ├── ServicePartUsage
│   └── InventoryMovement
│
├── USED PHONE SALES
│   ├── UsedPhone
│   ├── Sale
│   └── SaleItem
│
├── FINANCE
│   ├── Payment
│   └── Expense
│
├── IDENTITY
│   └── User
│
└── AUDIT
    └── AuditLog
```

---

# 26. Main Service Flow

```text
Customer
   ↓
Device
   ↓
Service Order
   ↓
CHECKING
   ↓
Diagnosis
   ↓
Estimated Cost
   ↓
WAITING_APPROVAL
   ↓
Customer Approval
   │
   ├── REJECTED
   │
   └── APPROVED
          ↓
       REPAIRING
          ↓
    Sparepart Usage
          ↓
    CHECKLIST_AFTER_SERVICE
          ↓
        TESTING
          ↓
         READY
          ↓
       COMPLETED
```

---

# 27. Used Phone Sales Flow

```text
Used Phone Acquisition
        ↓
Used Phone Inventory
        ↓
AVAILABLE
        ↓
Sale
        ↓
Payment
        ↓
Inventory Movement(SALE)
        ↓
SOLD
```

---

# 28. Financial Flow

```text
SERVICE
│
├── Service Revenue
├── Parts Revenue
├── Service Cost
└── Parts Cost

USED PHONE
│
├── Sales Revenue
└── Product Cost

BUSINESS
│
├── Gross Profit
├── Operating Expense
└── Net Profit
```

---

# 29. Decisions Locked in v1.1

The following decisions have been explicitly confirmed:

1. Customer approval berasal dari customer.
2. Customer approval wajib memiliki bukti/history.
3. Customer approval dilakukan melalui WhatsApp yang telah diinformasikan Admin kepada customer.
4. Device Password/PIN tidak disimpan.
5. GANK SERVICE menjual HP bekas.
6. HP bekas dapat diperoleh dari customer, supplier, trade-in customer, atau kombinasi.
7. HP bekas memiliki proses inspection.
8. Inventory `SALE` digunakan untuk penjualan HP bekas.
9. Satu transaksi sale dapat memiliki lebih dari satu Sale Item.
10. Jika penjualan HP bekas direfund sesuai business rules, unit kembali ke inventory.
11. Inventory menggunakan movement ledger + current stock projection.
12. Service Cost dan Parts Cost dipisahkan untuk perhitungan profit.
13. HP bekas diperlakukan sebagai inventory individual.
14. Service workflow bersifat fleksibel dan tidak selalu linear.
15. Status history wajib mencatat perubahan status.
16. Audit log berbeda dari status history.
17. Revenue dan Expense dilacak secara terpisah.

---

# 30. Open Business Decisions

Setelah keputusan v1.1, beberapa detail bisnis masih dapat diperinci sebelum technical architecture.

## 30.1 Customer Approval Evidence

Channel sudah dikunci ke WhatsApp.

Yang masih perlu diperinci secara teknis/bisnis:

- format evidence yang disimpan
- message reference
- apakah screenshot perlu disimpan
- bagaimana validasi approval
- siapa yang mencatat approval jika approval dilakukan di luar sistem

## 30.2 Used Phone Inspection Detail

Inspection sudah diwajibkan.

Yang masih perlu diperinci:

- daftar checklist final
- aturan grading
- siapa yang berwenang melakukan inspection
- apakah inspection wajib selesai sebelum harga jual ditetapkan
- apakah unit yang gagal inspection boleh masuk inventory

## 30.3 Refund Rules Detail

Refund HP bekas sudah dikonfirmasi dapat mengembalikan unit ke inventory.

Yang masih perlu diperinci:

- kondisi refund
- siapa yang menyetujui refund
- apakah unit wajib di-inspection ulang
- apakah selling price dapat berubah setelah return
- apakah ada status khusus setelah return

---

# 31. Non-Goals

Business Domain Specification ini belum menentukan:

- database engine implementation
- table schema final
- API endpoint
- frontend architecture
- backend framework
- UI implementation
- exact permission matrix
- deployment infrastructure
- CI/CD implementation
- exact approval evidence implementation
- exact refund workflow

Hal tersebut akan ditentukan setelah Business Domain Specification disetujui.

---

# 32. Approval Gate

Dokumen ini harus dianggap sebagai **Business Domain baseline**.

Sebelum implementation:

```text
Business Domain
      ↓
USER APPROVAL
      ↓
Technical Architecture
      ↓
Database Schema
      ↓
API Contract
      ↓
UI/UX
      ↓
Implementation
```

AI coding agent **tidak boleh mengubah business rule secara otomatis**.

Jika implementasi teknis membutuhkan perubahan terhadap business rule:

```text
STOP
↓
REPORT CONFLICT
↓
REQUEST USER APPROVAL
↓
UPDATE SPECIFICATION
↓
CONTINUE
```

---

# 33. Change Control

Setiap perubahan business rule harus:

1. Dijelaskan.
2. Memiliki alasan bisnis.
3. Menjelaskan impact.
4. Mendapat approval Owner.
5. Memperbarui versi dokumen.

Contoh:

```text
v1.1
↓
Business rule changed
↓
v1.2
```

Tidak boleh ada perubahan domain secara diam-diam di dalam implementation.

---

# 34. Change Log

## v1.1

Confirmed by Owner:

- Customer approval channel: WhatsApp yang telah diinformasikan Admin.
- Approval evidence/history is mandatory.
- Used phone acquisition supports customer purchase, supplier, trade-in, or combination.
- Used phone inspection is required.
- Sale supports multiple Sale Items.
- Refund of a used phone returns the unit to inventory.
- Returned used phone produces an appropriate inventory movement and becomes available again according to the approved return flow.

# 35. Final Domain Principle

GANK SERVICE internal system harus dibangun berdasarkan prinsip:

```text
Business Truth
      ↓
Explicit Domain Rules
      ↓
Traceable Transactions
      ↓
Auditable Operations
      ↓
Reliable Financial Data
      ↓
Predictable Software
```

Prioritas utama sistem:

1. Akurasi transaksi
2. Traceability
3. Inventory integrity
4. Financial integrity
5. Authorization & security
6. Auditability
7. Operational usability
8. Performance
9. Visual polish

**Business rules take precedence over implementation convenience.**
l
