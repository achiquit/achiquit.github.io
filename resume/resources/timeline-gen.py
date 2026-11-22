import plotly.express as px
import pandas as pd
from datetime import datetime
from dateutil.relativedelta import relativedelta
import plotly.io as pio

website_loc = ""
bg_black = '#030712'
emerald = '#00d492'
dark_emerald = '#007a55'
dark_blue = '#26007A'
dark_yellow = '#7A1A00'
today = datetime.today()
today_str = today.strftime('%Y-%m-%d')
graph_start = today - relativedelta(years=5)

jobs = [
    dict(Organization="TRC", Position="Assistant Coach", Start='2026-02-01', Finish='2026-05-01', Type="Work"),
    dict(Organization="Qamaria", Position="Barista", Start='2025-12-01', Finish='2026-04-01', Type="Work"),
    dict(Organization="NRocks", Position="Adventure Guide", Start='2024-03-01', Finish='2026-08-01', Type="Work"),
    dict(Organization="SRMG", Position="Climbing Guide", Start='2024-03-01', Finish='2026-08-01', Type="Work"),
    dict(Organization="Apogee", Position="Northeast Support Staff", Start='2023-06-01', Finish='2023-08-01', Type="Work"),
    dict(Organization="CITAP", Position="Communications Assistant", Start='2022-11-01', Finish='2024-06-01', Type="Work"),
    dict(Organization="Deepest Beliefs Lab", Position="Research Assistant", Start='2021-07-01', Finish='2023-06-01', Type="Work"),
    dict(Organization="UNC - ITS", Position="Technology Support Technician", Start='2018-07-01', Finish='2021-07-01', Type="Work"),
    dict(Organization="Computer Cellar", Position="Repair Technician", Start='2015-10-01', Finish='2018-07-01', Type="Work"),
    dict(Organization="Emily Griffith", Start='2026-10-01', Position="Intern", Finish=today_str, Type="Volunteer"),
    dict(Organization="University of Denver", Position="Graduate Student", Start='2026-09-01', Finish=today_str, Type="Education"),
    dict(Organization="UNC-CH", Position="Undergraduate Student", Start='2020-08-01', Finish='2024-05-11', Type="Education"),
    dict(Organization="Durham Tech", Position="Undergraduate Student", Start='2017-08-01', Finish='2020-07-01', Type="Education"),
]
annots = []
count = 0

for job in jobs:
    duration = round(((int((datetime.strptime(job["Finish"], '%Y-%m-%d') - datetime.strptime(job["Start"], '%Y-%m-%d')).total_seconds())) / 31556952), 2)
    job.update({"Duration": f"{duration} Years"})

    midpoint = datetime.strptime(job["Start"], '%Y-%m-%d') + (datetime.strptime(job["Finish"], '%Y-%m-%d') - datetime.strptime(job["Start"], '%Y-%m-%d'))/2
    job.update({"Midpoint": midpoint})

    annots.append(dict(x=job["Midpoint"], y=(count - .2), text=job["Organization"], showarrow=False))

    count += 1

df = pd.DataFrame(jobs)

fig = px.timeline(
    df,
    x_start="Start",
    x_end="Finish",
    y="Organization",
    color="Type",
    color_discrete_map=dict(
        Education=dark_blue,
        Work=dark_emerald,
        Volunteer=dark_yellow
    ),
    hover_data=dict(
        Organization=True,
        Position=True,
        Duration=True,
        Start=False,
        Finish=False,
        Type=True,
        Midpoint=False
    )
)

fig.update_layout(
    plot_bgcolor=bg_black,
    paper_bgcolor=bg_black,
    margin=dict(l=40, r=40, t=40, b=40),
    legend=dict(
        orientation="h",
        yanchor="bottom",
        y=1.3,
        xanchor="right",
        x=.1,
        entrywidth=70,
        title=dict(
            text=""
        )
    )
)
fig.update_traces(marker_line_width=0)
fig.update_yaxes(
    title=None,
    gridcolor=dark_emerald,
    tickfont=dict(family='Arial', color='white', size=12),
    ticklabelstandoff=6,
    # tickangle=300
)
fig.update_xaxes(
    title=None,
    gridcolor=dark_emerald,
    ticklabelstandoff=6,
    tickfont=dict(
        family='Arial',
        color='white',
        size=12),
    range=[graph_start, today],
    rangeslider=dict(
        visible=True,
        bgcolor=bg_black)
)

for note in annots:
    if note["text"] == "Apogee":
        size = 9
    else:
        size = 12
    fig.add_annotation(
        x=note["x"],
        y=note["y"],
        text=note["text"],
        showarrow=False,
        font=dict(
            color='white',
            size=size,
            weight='bold'
        )
    )

config = {'displayModeBar': False}
pio.write_html(fig, f'resume/resources/timeline-gantt.html', include_plotlyjs='cdn', config=config)