'use server'
// app/actions/shipmentActions.js
// Server Actions — berjalan di server, aman memanggil Supabase langsung
// Dipanggil dari Client Component via form action atau manual call

import { revalidatePath } from 'next/cache'
import { supabase } from '../../lib/supabase'

// ─────────────────────────────────────────────────────────────
// HELPER: Validasi input form
// ─────────────────────────────────────────────────────────────
function validateShipmentInput({ nama_kapal, asal, tujuan, status, muatan }) {
  const errors = {}

  if (!nama_kapal || nama_kapal.trim().length < 2) {
    errors.nama_kapal = 'Nama kapal minimal 2 karakter'
  }
  if (!asal || asal.trim().length < 2) {
    errors.asal = 'Kota asal wajib diisi'
  }
  if (!tujuan || tujuan.trim().length < 2) {
    errors.tujuan = 'Kota tujuan wajib diisi'
  }
  if (asal && tujuan && asal.trim().toLowerCase() === tujuan.trim().toLowerCase()) {
    errors.tujuan = 'Kota tujuan harus berbeda dari kota asal'
  }
  if (!status || !['menunggu', 'berlayar', 'tiba', 'selesai'].includes(status)) {
    errors.status = 'Pilih status pengiriman yang valid'
  }
  if (muatan && isNaN(Number(muatan))) {
    errors.muatan = 'Muatan harus berupa angka'
  }
  if (muatan && Number(muatan) < 0) {
    errors.muatan = 'Muatan tidak boleh negatif'
  }

  return errors
}

// ─────────────────────────────────────────────────────────────
// ACTION 1: Tambah shipment baru
// ─────────────────────────────────────────────────────────────
export async function createShipment(prevState, formData) {
  // Ambil data dari FormData
  const raw = {
    nama_kapal: formData.get('nama_kapal')?.toString().trim() ?? '',
    asal:       formData.get('asal')?.toString().trim() ?? '',
    tujuan:     formData.get('tujuan')?.toString().trim() ?? '',
    status:     formData.get('status')?.toString() ?? '',
    muatan:     formData.get('muatan')?.toString().trim() ?? '',
    keterangan: formData.get('keterangan')?.toString().trim() ?? '',
  }

  // Validasi
  const errors = validateShipmentInput(raw)
  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
      message: 'Harap perbaiki kesalahan pada form.',
      data: null,
    }
  }

  // Siapkan payload untuk Supabase
  const payload = {
    nama_kapal: raw.nama_kapal,
    asal:       raw.asal,
    tujuan:     raw.tujuan,
    status:     raw.status,
    muatan_ton: raw.muatan ? Number(raw.muatan) : null,
    keterangan: raw.keterangan || null,
  }

  // Insert ke Supabase
  const { data, error } = await supabase
    .from('shipments')
    .insert([payload])
    .select()
    .single()

  if (error) {
    console.error('[Supabase Insert Error]', error)
    return {
      success: false,
      errors: {},
      message: `Gagal menyimpan data: ${error.message}`,
      data: null,
    }
  }

  // Revalidate halaman dashboard agar data terbaru langsung muncul
  revalidatePath('/dashboard')

  return {
    success: true,
    errors: {},
    message: `✅ Shipment "${raw.nama_kapal}" berhasil ditambahkan!`,
    data,
  }
}

// ─────────────────────────────────────────────────────────────
// ACTION 2: Ambil semua shipments (untuk Server Component)
// ─────────────────────────────────────────────────────────────
export async function getShipments() {
  const { data, error } = await supabase
    .from('shipments')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[Supabase Fetch Error]', error)
    return []
  }

  return data ?? []
}

// ─────────────────────────────────────────────────────────────
// ACTION 3: Update status shipment
// ─────────────────────────────────────────────────────────────
export async function updateShipmentStatus(prevState, formData) {
  const id     = formData.get('id')?.toString()
  const status = formData.get('status')?.toString()

  if (!id || !status) {
    return { success: false, message: 'Data tidak lengkap.' }
  }

  const validStatuses = ['menunggu', 'berlayar', 'tiba', 'selesai']
  if (!validStatuses.includes(status)) {
    return { success: false, message: 'Status tidak valid.' }
  }

  const { error } = await supabase
    .from('shipments')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) {
    return { success: false, message: `Gagal update: ${error.message}` }
  }

  revalidatePath('/dashboard')
  return { success: true, message: 'Status berhasil diperbarui.' }
}

// ─────────────────────────────────────────────────────────────
// ACTION 4: Hapus shipment
// ─────────────────────────────────────────────────────────────
export async function deleteShipment(prevState, formData) {
  const id = formData.get('id')?.toString()

  if (!id) {
    return { success: false, message: 'ID tidak ditemukan.' }
  }

  const { error } = await supabase
    .from('shipments')
    .delete()
    .eq('id', id)

  if (error) {
    return { success: false, message: `Gagal menghapus: ${error.message}` }
  }

  revalidatePath('/dashboard')
  return { success: true, message: 'Shipment berhasil dihapus.' }
}