return {
  "nvim-lualine/lualine.nvim",
  opts = function()
    local ayu = require("lualine.themes.ayu")

    -- Change dark backgrounds to match tmux-power (#262626), keep colored sections (a) unchanged
    for _, mode in ipairs({ "normal", "insert", "visual", "replace" }) do
      ayu[mode].b.bg = "#262626"
      ayu[mode].b.fg = "#b0b0b0"
      if ayu[mode].c then
        ayu[mode].c.bg = "#262626"
        ayu[mode].c.fg = "#b0b0b0"
      end
    end
    ayu.inactive.a.bg = "#262626"
    ayu.inactive.a.fg = "#808080"
    ayu.inactive.b.bg = "#262626"
    ayu.inactive.b.fg = "#808080"
    if ayu.inactive.c then
      ayu.inactive.c.bg = "#262626"
      ayu.inactive.c.fg = "#808080"
    end

    return {
      options = {
        theme = ayu,
      },
    }
  end,
}
