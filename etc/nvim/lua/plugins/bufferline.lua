return {
  "akinsho/bufferline.nvim",
  opts = function()
    local ayu = require("lualine.themes.ayu")

    return {
      options = {
        always_show_bufferline = false,
      },
      highlights = {
        fill = { bg = "#262626" },
        background = { bg = "#262626", fg = "#808080" },
        buffer_selected = { bg = ayu.normal.a.bg, fg = "#000000" },
        buffer_visible = { bg = "#262626", fg = "#b0b0b0" },
        tab = { bg = "#262626", fg = "#808080" },
        tab_selected = { bg = ayu.normal.a.bg, fg = "#000000" },
        tab_close = { bg = "#262626", fg = "#808080" },
        close_button = { bg = "#262626", fg = "#808080" },
        close_button_visible = { bg = "#262626", fg = "#b0b0b0" },
        close_button_selected = { bg = ayu.normal.a.bg, fg = "#000000" },
        indicator_selected = { fg = ayu.normal.a.bg, bg = ayu.normal.a.bg },
        modified = { bg = "#262626", fg = "#b0b0b0" },
        modified_visible = { bg = "#262626", fg = "#b0b0b0" },
        modified_selected = { bg = ayu.normal.a.bg, fg = "#000000" },
        separator = { fg = "#262626", bg = "#262626" },
        separator_visible = { fg = "#262626", bg = "#262626" },
        separator_selected = { fg = ayu.normal.a.bg, bg = ayu.normal.a.bg },
      },
    }
  end,
}
