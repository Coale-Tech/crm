from crm.fcrm.doctype.erpnext_crm_settings.erpnext_crm_settings import ensure_quotation_layouts
from crm.patches.v1_0.reset_erpnext_form_script import reset_erpnext_form_script


def execute():
	ensure_quotation_layouts()
	reset_erpnext_form_script()
