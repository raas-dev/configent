return {
  "nvim-lualine/lualine.nvim",
  opts = function()
    local ayu = require('lualine.themes.ayu')

    -- Change dark backgrounds to match tmux-power (#262626), keep colored sections (a) unchanged
    for _, mode in ipairs({ 'normal', 'insert', 'visual', 'replace' }) do
      if ayu[mode] then
        ayu[mode].b.bg = '#262626'
        if ayu[mode].c then ayu[mode].c.bg = '#262626' end
      end
    end
    if ayu.inactive then
      ayu.inactive.a.bg = '#262626'
      ayu.inactive.b.bg = '#262626'
      if ayu.inactive.c then ayu.inactive.c.bg = '#262626' end
    end

    return {
      options = {
        theme = ayu,
      },
      sections = {
        lualine_z = {'encoding', 'fileformat'},
      },
    }
  end,
}
