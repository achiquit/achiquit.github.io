import plotly.express as px
import plotly.io as pio
import geopandas as gpd

pio.templates.default = "plotly_dark"

emerald = '#00d492'
dark_emerald = '#007a55'
bg_black = '#030712'
emerald_scale = ["#E6FFF7", "#B8FFE8", "#8AFFDA", "#5CFFCB", "#2EFFBD", "#00FFAE", "#00D492", "#00A370", "#007550", "#004731", "#001A11"]

# trad_color = '#9810fa'
trad_color = "#af58ff"
sport_color = emerald

website_loc = "../achiquit.github.io/photography/milk"

def heatmap() -> None:
    geo_df = gpd.read_file("/resources/milk-locs.csv")

    fig = px.density_map(geo_df,
        lat='Latitude',
        lon='Longitude',
        radius=8,
        center=dict(lat=33, lon=320), zoom=1.4,
        map_style="carto-darkmatter",
        hover_data=dict(
            Latitude=False,
            Longitude=False,
            Climb=True,
            Difficulty=True,
            Type=True,
            Height=True,
            Area=True
        ),
        color_continuous_scale=["#ff2b6d", "#9810fa", emerald],
        range_color=[0,20000]
    )

    hover_data=dict(
            Latitude=False,
            Longitude=False,
            Climb=True,
            Difficulty=True,
            Type=True
        ),

    fig.update_layout(
        plot_bgcolor=bg_black,
        paper_bgcolor=bg_black,
        margin=dict(l=0, r=0, t=0, b=0)
    )

    config = {
        'scrollZoom': True,
        'displaylogo': False,
        'displayModeBar': True,
        'modeBarButtonsToRemove': ['select', 'lasso', 'pan', 'toImage']
    }

    pio.write_html(fig, f'{website_loc}milk-locs.html', include_plotlyjs='cdn')

heatmap()