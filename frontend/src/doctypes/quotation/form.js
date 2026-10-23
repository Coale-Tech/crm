import { quotationSaved } from '@/composables/quotation'

// Controller for the Quotation form opened from a deal (Quotations tab)
const API = 'crm.fcrm.doctype.erpnext_crm_settings.erpnext_crm_settings.'

export class Quotation {
  onRender() {
    if (!this.doc.name || this.doc.docstatus !== 0) return
    this.actions = [
      {
        name: 'Submit Quotation',
        label: __('Submit'),
        onClick: async (close) => {
          await this.call(API + 'submit_quotation', { name: this.doc.name })
          this.toast.success(__('Quotation submitted'))
          quotationSaved.value++
          close?.()
        },
      },
    ]
  }

  items_add() {
    this.value.qty = 1
  }

  async taxes_and_charges() {
    this.doc.taxes = this.value
      ? await this.call(
          'erpnext.controllers.accounts_controller.get_taxes_and_charges',
          {
            master_doctype: 'Sales Taxes and Charges Template',
            master_name: this.value,
          },
        )
      : []
  }
}

export class QuotationItem {
  get row() {
    return this.doc.items.find((r) => r.idx === this.currentRowIdx)
  }

  async item_code() {
    const row = this.row
    if (!row?.item_code) return
    row.qty = row.qty || 1
    // a blank item_name/uom is sent as "" and fails ERPNext's mandatory check
    const item = await this.call('frappe.client.get_value', {
      doctype: 'Item',
      filters: row.item_code,
      fieldname: ['item_name', 'stock_uom', 'description'],
    })
    row.item_name = item.item_name
    row.uom = item.stock_uom
    row.description = item.description
    // only the selling price list rate here, ERPNext fills the rest (uom, description, taxes) on save
    const [price] = await this.call('frappe.client.get_list', {
      doctype: 'Item Price',
      filters: {
        item_code: row.item_code,
        price_list: this.doc.selling_price_list,
        selling: 1,
      },
      fields: ['price_list_rate'],
      order_by: 'valid_from desc',
      limit_page_length: 1,
    })
    if (price) row.rate = row.price_list_rate = price.price_list_rate
    row.amount = row.qty * (row.rate || 0)
  }

  qty() {
    this.row.amount = (this.value || 0) * (this.row.rate || 0)
  }

  rate() {
    this.row.amount = (this.row.qty || 0) * (this.value || 0)
  }
}
