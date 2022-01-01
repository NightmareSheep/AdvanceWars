var filters: any = {};
$(document).ready(function () {
    if (!document.getElementById("game"))
        return;

    filters.OrangeTeam = new PIXI.filters.MultiColorReplaceFilter(
        [
            [0xf8b878, 0xf8b878],
            [0xf89868, 0xf89868],
            [0xf85800, 0xf85800],
            [0xf00008, 0xf00008],
            [0xc00000, 0xc00000],
            [0x800010, 0x800010]
        ],
        0.001
    );

    var basicColors = [0xf8b878, 0xf89868, 0xf85800, 0xf00008, 0xc00000, 0x800010];

    var colors = JSON.parse($("#teamColors").attr("data"));
    for (var i = 0; i < colors.length; i++) {
        var color = colors[i];
        var colorValues = [];
        var subColors = color.colors.split(',');
        for (var j = 0; j < subColors.length; j++) {
            colorValues.push([basicColors[j], parseInt(subColors[j], 16)]);
        }

        filters[color.name + "Team"] = new PIXI.filters.MultiColorReplaceFilter(
            colorValues,
            0.001
        );
    }

    filters.YellowTeam = new PIXI.filters.MultiColorReplaceFilter(
        [
            [0xf8b878, 0xf8f898],
            [0xf89868, 0xf8f840],
            [0xf85800, 0xf8c000],
            [0xf00008, 0xd08000],
            [0xc00000, 0xb88000]
        ],
        0.001
    );

    filters.Neutral = new PIXI.filters.MultiColorReplaceFilter(
        [
            [0xf8b878, 0xf8f898],
            [0xf89868, 0xdedede],
            [0xf85800, 0xf8c000],
            [0xf00008, 0xa5a5a5],
            [0xc00000, 0xb88000]
        ],
        0.001
    );

    filters.Inactive = new PIXI.filters.AdjustmentFilter();
    filters.Inactive.saturation = 0.1;

});

