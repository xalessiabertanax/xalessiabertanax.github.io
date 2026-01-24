import pandas as pd
from datetime import datetime

# Data for the "Action Plan (Deadlines)" sheet
data_deadlines = [
    {
        "Deadline (2026)": "2026-01-15",
        "Opportunity": "ITU Young Professionals / Associates",
        "Company/Org": "ITU (UN Agency)",
        "Location": "Geneva (CH) / Remote",
        "Type": "Job / Rotation",
        "Pay / Stipend": "High (Tax-Free)",
        "Travel Paid?": "Yes (Relocation)",
        "Action / Summary": "URGENT. Apply immediately for 'Young Researcher' or Associate roles. Focus on AI Policy/Digital Standards."
    },
    {
        "Deadline (2026)": "2026-01-21",
        "Opportunity": "Rijks I-Traineeship (Webinar)",
        "Company/Org": "Rijksoverheid",
        "Location": "Netherlands",
        "Type": "Traineeship",
        "Pay / Stipend": "€3,000 - €3,500/mo",
        "Travel Paid?": "N/A (Local)",
        "Action / Summary": "Register for the webinar. This is the best 'safe' option in NL. 30% time for personal development."
    },
    {
        "Deadline (2026)": "2026-01-26",
        "Opportunity": "CERN Summer Student Programme",
        "Company/Org": "CERN",
        "Location": "Geneva (CH)",
        "Type": "Summer School",
        "Pay / Stipend": "~90 CHF/day (Subsistence)",
        "Travel Paid?": "Yes",
        "Action / Summary": "Apply even if you are a grad. Work on UI/Viz for the LHC. prestigious."
    },
    {
        "Deadline (2026)": "2026-01-27",
        "Opportunity": "Jan van Eyck Academie Residency",
        "Company/Org": "Jan van Eyck",
        "Location": "Maastricht (NL)",
        "Type": "Residency",
        "Pay / Stipend": "€1,900/mo + Studio",
        "Travel Paid?": "Yes (Budget)",
        "Action / Summary": "Write a 1-page proposal on 'Digital/AI Ethics'. Prestigious and close to home."
    },
    {
        "Deadline (2026)": "2026-01-30",
        "Opportunity": "Mozilla Fellowship",
        "Company/Org": "Mozilla Foundation",
        "Location": "Remote / Global",
        "Type": "Fellowship",
        "Pay / Stipend": "$75k - $100k USD",
        "Travel Paid?": "Yes (Summits)",
        "Action / Summary": "High effort, high reward. Track: 'Democratising Data' or 'Open Infrastructure'."
    },
    {
        "Deadline (2026)": "2026-01-31",
        "Opportunity": "Culture Moves Europe (Individual)",
        "Company/Org": "European Union",
        "Location": "Any EU Country",
        "Type": "Grant",
        "Pay / Stipend": "€75/day + Travel",
        "Travel Paid?": "Yes",
        "Action / Summary": "Find a host (studio/lab) abroad and ask them to invite you. EU pays for your trip. Rolling deadline."
    },
    {
        "Deadline (2026)": "2026-02-01",
        "Opportunity": "ESA Young Graduate Trainee (YGT)",
        "Company/Org": "European Space Agency",
        "Location": "NL / DE / FR / IT",
        "Type": "Job (1yr)",
        "Pay / Stipend": "€2,700 - €3,500 (Tax-Free)",
        "Travel Paid?": "Yes",
        "Action / Summary": "Check 'ESA Careers' on Feb 1. Look for 'HCI', 'Human Machine Interface' or 'Ground Segment'."
    },
    {
        "Deadline (2026)": "2026-02-01",
        "Opportunity": "St. Gallen Symposium Essay Comp",
        "Company/Org": "St. Gallen Symposium",
        "Location": "Switzerland",
        "Type": "Competition",
        "Pay / Stipend": "Trip Covered",
        "Travel Paid?": "Yes (All Expenses)",
        "Action / Summary": "Write an essay on 'Disruption'. Top 100 get flown to the summit to meet global leaders."
    },
    {
        "Deadline (2026)": "2026-02-03",
        "Opportunity": "CERN Origin (Early Career)",
        "Company/Org": "CERN",
        "Location": "Geneva (CH)",
        "Type": "Job (2-3yr)",
        "Pay / Stipend": "~5,000 CHF/mo (Tax-Free)",
        "Travel Paid?": "Yes (+ Install Grant)",
        "Action / Summary": "PRIORITY 1. Apply for 'Junior UX' or 'Front-end'. No project needed. Huge salary savings."
    },
    {
        "Deadline (2026)": "2026-02-10",
        "Opportunity": "Talent Development Grant",
        "Company/Org": "Stimuleringsfonds NL",
        "Location": "Netherlands / World",
        "Type": "Grant",
        "Pay / Stipend": "€25,000 Lump Sum",
        "Travel Paid?": "Use grant money",
        "Action / Summary": "PRIORITY 2. Create a plan to develop your skills for 1 year. Freedom to do what you want."
    },
    {
        "Deadline (2026)": "2026-02-15",
        "Opportunity": "Canon Foundation Fellowship",
        "Company/Org": "Canon Foundation",
        "Location": "Japan",
        "Type": "Research Grant",
        "Pay / Stipend": "€22.5k - €27.5k / year",
        "Travel Paid?": "Yes",
        "Action / Summary": "Requires finding a host in Japan. Good for 3-12 months research."
    },
    {
        "Deadline (2026)": "2026-02-16",
        "Opportunity": "EU Blue Book Traineeship",
        "Company/Org": "European Commission",
        "Location": "Brussels / Lux",
        "Type": "Traineeship",
        "Pay / Stipend": "~€1,370/mo",
        "Travel Paid?": "Yes (Reimbursed)",
        "Action / Summary": "Apply to DG DIGIT or DG CONNECT. Work on EU digital infrastructure."
    },
    {
        "Deadline (2026)": "2026-02-26",
        "Opportunity": "Mondriaan Fund Residency",
        "Company/Org": "Mondriaan Fonds",
        "Location": "Global (Various)",
        "Type": "Residency",
        "Pay / Stipend": "Stipend + Housing",
        "Travel Paid?": "Yes",
        "Action / Summary": "Check for 'Residency' calls. Focus on critical research/digital culture."
    },
    {
        "Deadline (2026)": "2026-02-28",
        "Opportunity": "AIIB Global Internship",
        "Company/Org": "Asian Infrastructure Inv. Bank",
        "Location": "Beijing (China)",
        "Type": "Internship",
        "Pay / Stipend": "~$90 USD/day",
        "Travel Paid?": "Often self-funded",
        "Action / Summary": "Huge adventure. Apply for 'Digital Transformation' or 'Graphics' intern."
    },
    {
        "Deadline (2026)": "2026-03-01",
        "Opportunity": "Airbus Global Graduate Programme",
        "Company/Org": "Airbus",
        "Location": "EU (FR/DE/ES)",
        "Type": "Job (Rotation)",
        "Pay / Stipend": "Competitive (~€40k+)",
        "Travel Paid?": "Relocation",
        "Action / Summary": "Corporate career track. Look for 'Cockpit Design' or 'UX' roles."
    },
    {
        "Deadline (2026)": "2026-03-14",
        "Opportunity": "L'Oréal Brandstorm",
        "Company/Org": "L'Oréal",
        "Location": "Paris (Finals)",
        "Type": "Competition",
        "Pay / Stipend": "Paid Mission (Prize)",
        "Travel Paid?": "To Finals",
        "Action / Summary": "Innovation competition. Theme usually tech/sustainability related."
    }
]

# Data for the "High Pay & Career" sheet
data_high_pay = [
    {
        "Tier": "Tier 1 (Tax-Free Wealth)",
        "Company": "CERN",
        "Location": "Geneva (CH)",
        "Est. Net Income": "~€72,000 (Net)",
        "Role Type": "Origin Programme (Early Career)",
        "Why": "Tax-free salary. Equivalent to ~€110k in NL. Best savings potential.",
        "Action": "Apply by Feb 3."
    },
    {
        "Tier": "Tier 1 (Tax-Free Wealth)",
        "Company": "IAEA (United Nations)",
        "Location": "Vienna (AT)",
        "Est. Net Income": "~€60k - €70k (Net)",
        "Role Type": "P-1 / P-2 Officer",
        "Why": "Tax-free. Vienna has high quality of life. Secure UN job.",
        "Action": "Monitor UN Talent for 'Information Systems' roles."
    },
    {
        "Tier": "Tier 2 (High Frequency Trading)",
        "Company": "Quantlane",
        "Location": "Prague (CZ)",
        "Est. Net Income": "€60k - €90k (Gross)",
        "Role Type": "UI / Frontend Engineer",
        "Why": "Western salary in a cheap city. Massive savings potential. HFT bonus structure.",
        "Action": "Apply ASAP. Hidden gem."
    },
    {
        "Tier": "Tier 2 (High Frequency Trading)",
        "Company": "Optiver / Flow Traders",
        "Location": "Amsterdam (NL)",
        "Est. Net Income": "€80k - €100k (Gross)",
        "Role Type": "Graduate UX / Product",
        "Why": "Highest absolute starting salary in NL. Very competitive.",
        "Action": "Apply for Graduate roles."
    },
    {
        "Tier": "Tier 3 (Big Tech)",
        "Company": "Uber / Booking.com",
        "Location": "Amsterdam (NL)",
        "Est. Net Income": "€60k - €85k (Gross)",
        "Role Type": "Junior Product Designer",
        "Why": "Stock options (RSUs) + High base salary.",
        "Action": "Check careers pages regularly."
    },
    {
        "Tier": "Tier 3 (Big Tech)",
        "Company": "JetBrains",
        "Location": "Prague (CZ)",
        "Est. Net Income": "€50k - €65k (Gross)",
        "Role Type": "UX / UI Designer",
        "Why": "Profitable private company. High bonuses. Good location.",
        "Action": "Apply for IDE design roles."
    }
]

# Create DataFrames
df_deadlines = pd.DataFrame(data_deadlines)
df_high_pay = pd.DataFrame(data_high_pay)

# Create Excel writer object
file_path = 'Jouw_2026_Masterplan.xlsx'
with pd.ExcelWriter(file_path, engine='xlsxwriter') as writer:
    # Write Deadlines sheet
    df_deadlines.to_excel(writer, sheet_name='Actieplan (Deadlines)', index=False)
    
    # Write High Pay sheet
    df_high_pay.to_excel(writer, sheet_name='High Pay & Career', index=False)
    
    # Get workbook and worksheet objects for formatting
    workbook = writer.book
    worksheet1 = writer.sheets['Actieplan (Deadlines)']
    worksheet2 = writer.sheets['High Pay & Career']
    
    # Add a format for headers
    header_format = workbook.add_format({
        'bold': True,
        'text_wrap': True,
        'valign': 'top',
        'fg_color': '#D7E4BC',
        'border': 1
    })
    
    # Apply formatting to headers
    for col_num, value in enumerate(df_deadlines.columns.values):
        worksheet1.write(0, col_num, value, header_format)
        worksheet1.set_column(col_num, col_num, 20) # Set column width
        
    for col_num, value in enumerate(df_high_pay.columns.values):
        worksheet2.write(0, col_num, value, header_format)
        worksheet2.set_column(col_num, col_num, 20)

    # Adjust specific column widths for better readability
    worksheet1.set_column('H:H', 50) # Action/Summary column
    worksheet2.set_column('F:F', 40) # Why column
    worksheet2.set_column('G:G', 30) # Action column

print(f"File generated: {file_path}")