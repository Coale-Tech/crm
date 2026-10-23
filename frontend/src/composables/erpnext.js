import { createResource } from 'frappe-ui'
import { ref } from 'vue'

// whoever can read ERPNext Quotations sees the deal Quotations tab
export const canViewQuotations = ref(false)
export const canCreateQuotations = ref(false)

createResource({
  url: 'crm.fcrm.doctype.erpnext_crm_settings.erpnext_crm_settings.can_view_quotations',
  cache: 'Can View Quotations',
  auto: true,
  onSuccess: (data) => {
    canViewQuotations.value = Boolean(data)
  },
})

createResource({
  url: 'crm.fcrm.doctype.erpnext_crm_settings.erpnext_crm_settings.can_create_quotations',
  cache: 'Can Create Quotations',
  auto: true,
  onSuccess: (data) => {
    canCreateQuotations.value = Boolean(data)
  },
})
