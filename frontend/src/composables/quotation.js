import { useDoctypeModal } from '@/composables/doctypeModal'
import { call } from 'frappe-ui'
import { ref } from 'vue'

// bumped on every save so an open Quotations tab refreshes without a realtime event
export const quotationSaved = ref(0)

const API = 'crm.fcrm.doctype.erpnext_crm_settings.erpnext_crm_settings.'

function openQuotationModal(options) {
  useDoctypeModal().showModal({
    doctype: 'Quotation',
    title: 'Quotation',
    callbacks: {
      afterInsert: () => quotationSaved.value++,
      afterUpdate: () => quotationSaved.value++,
    },
    ...options,
  })
}

export function editQuotation(name) {
  openQuotationModal({ name })
}

// ERPNext on another site has no local Quotation doctype: open its Desk form instead
export async function createQuotation(crmDeal, organization) {
  const defaults = await call(API + 'get_quotation_defaults', {
    crm_deal: crmDeal,
  })
  if (defaults) return openQuotationModal({ defaults })
  const url = await call(API + 'get_quotation_url', {
    crm_deal: crmDeal,
    organization,
  })
  window.open(url, '_blank')
}
