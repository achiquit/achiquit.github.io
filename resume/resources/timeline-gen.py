import plotly.express as px
import pandas as pd
from datetime import datetime
from dateutil.relativedelta import relativedelta
import plotly.io as pio

website_loc = ""
bg_black = '#030712'
emerald = '#00d492'
dark_emerald = '#007a55'
today = datetime.today()
today_str = today.strftime('%Y-%m-%d')
start_date = today - relativedelta(years=5)

jobs = [
    dict(Organization="The University of Denver", Position="Graduate Student", Start='2026-09-01', Finish=today_str, Type="Education"),
    dict(Organization="Emily Griffith Technical College", Start='2026-10-01', Position="Intern", Finish=today_str, Type="Volunteer"),
    dict(Organization="Seneca Rocks Mountain Gudies", Position="Climbing Guide", Start='2024-03-01', Finish='2026-08-01', Type="Work"),
    dict(Organization="NRocks Outdoor Adventures", Position="Adventure Guide", Start='2024-03-01', Finish='2026-08-01', Type="Work"),
    dict(Organization="Triangle Rock Club", Position="Assistant Coach", Start='2026-02-01', Finish='2026-05-01', Type="Work"),
    dict(Organization="Qamaria Yemeni Coffee", Position="Barista", Start='2025-12-01', Finish='2026-04-01', Type="Work"),
    dict(Organization="Center for Information, Technology, and Public Life", Position="Communications Assistant", Start='2022-11-01', Finish='2024-06-01', Type="Work"),
    dict(Organization="Apogee Adventures", Position="Northeast Support Staff", Start='2023-06-01', Finish='2023-08-01', Type="Work"),
    dict(Organization="Deepest Beliefs Lab", Position="Research Assistant", Start='2021-07-01', Finish='2023-06-01', Type="Work"),
    dict(Organization="The University of North Carolina at Chapel Hill, ITS", Position="Technology Support Technician", Start='2018-07-01', Finish='2021-07-01', Type="Work"),
    dict(Organization="The Computer Cellar", Position="Repair Technician", Start='2015-10-01', Finish='2018-07-01', Type="Work"),
    dict(Organization="The University of North Carolina at Chapel Hill", Position="Undergraduate Student", Start='2020-08-01', Finish='2024-05-11', Type="Education"),
    dict(Organization="Durham Technical Community College", Position="Undergraduate Student", Start='2017-08-01', Finish='2020-07-01', Type="Education")
]

for job in jobs:
    duration = round(((int((datetime.strptime(job["Finish"], '%Y-%m-%d') - datetime.strptime(job["Start"], '%Y-%m-%d')).total_seconds())) / 31556952), 2)
    job.update({"Duration": f"{duration} Years"})

df = pd.DataFrame(jobs)

fig = px.timeline(
    df,
    x_start="Start",
    x_end="Finish",
    y="Organization",
    color="Type",
    hover_data=dict(
        Organization=True,
        Position=True,
        Duration=True,
        Start=False,
        Finish=False,
        Type=True
    )
)

fig.update_layout(
    plot_bgcolor=bg_black,
    paper_bgcolor=bg_black,
    margin=dict(l=40, r=40, t=40, b=40),
    legend=dict(
        orientation="h",
        yanchor="bottom",
        y=1.02,
        xanchor="right",
        x=.1,
        entrywidth=70,
        title=dict(
            text=""
        )
    )
)
fig.update_yaxes(
    title=None,
    gridcolor=dark_emerald,
    tickfont=dict(family='Arial', color='white', size=12),
    ticklabelstandoff=6
)
fig.update_xaxes(
    title=None,
    gridcolor=dark_emerald,
    ticklabelstandoff=6,
    tickfont=dict(
        family='Arial',
        color='white',
        size=12),
    range=[start_date, today],
    rangeslider=dict(
        visible=True,
        bgcolor=bg_black)
)

config = {'displayModeBar': False}
pio.write_html(fig, f'resume/resources/timeline-gantt.html', include_plotlyjs='cdn', config=config)