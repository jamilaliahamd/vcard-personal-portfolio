from pathlib import Path
import re

p = Path('assets/js/script.js')
s = p.read_text()

# Remove generateQuotationDraft + ensureQuotationBrand helper pair and keep dashboard date function only
s = re.sub(r"function generateQuotationDraft\(\).*?function ensureQuotationBrand\(\)\{.*?\}\nconst updateDashboardDate", "const updateDashboardDate", s, flags=re.S)

# Remove printQuotationsReport function block that would print a full report
s = re.sub(r"function printQuotationsReport\(\).*?function printWorkerSlip", "function printWorkerSlip", s, flags=re.S)

# Remove ai-quotation form definition from forms map
s = re.sub(r"\n  'ai-quotation':\{.*?\[\['customer','Customer','text',true\],\['building','Building name','text',true\],\['roomNumber','Room number','text',true\],\['rooms','Number of rooms','number',true\],\['project','Project name','text',true\],\['buildingPlan','Upload building plan','file',false\],\['labourRate','Labour rate per room','number',true\],\['materialBudget','Material budget','number',true\],\['valid','Valid until','text',true\],\['status','Status','select',true,\['Draft','Sent','Approved'\]\]\]\},", "", s)

p.write_text(s)
print('quote artifacts cleaned')