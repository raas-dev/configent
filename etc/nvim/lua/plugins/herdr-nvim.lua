-- Issue: herdr-nvim's setup() is NOT idempotent.
--   init.lua:11-13 — each `map()` checks vim.fn.maparg(); if a map already
--   exists, it logs WARN "not overriding existing map <leader>a*" and skips.
--   The herdr CLI injects a second setup() every time you `ctrl+o` open a file
--   from the herdr TUI, so after the first open the next startup (or reload)
--   sees its own prior bindings and spams 4 warnings on every nvim launch.
-- Fix: opts.keymaps=false skips herdr's auto-bind; we then bind manually with
--   keymap.del + keymap.set, which is idempotent regardless of call order.
local function bind(mode, lhs, rhs, desc)
  pcall(vim.keymap.del, mode, lhs)
  vim.keymap.set(mode, lhs, rhs, { desc = desc })
end

return {
  {
    "ChmaraX/herdr-nvim",
    opts = { keymaps = false },
    config = function(_, opts)
      require("herdr-nvim").setup(opts)
      local M = require("herdr-nvim")
      local p = M.config.prefix
      bind("x", p .. "c", function() M.comment_selection() end, "herdr-nvim: comment selection")
      bind("n", p .. "c", function() M.comment_line() end, "herdr-nvim: comment line")
      bind("n", p .. "l", function() M.list_comments() end, "herdr-nvim: list comments")
      bind("n", p .. "s", function() M.send_all({ submit = false }) end, "herdr-nvim: paste comments to agent")
      bind("n", p .. "S", function() M.send_all({ submit = true }) end, "herdr-nvim: send comments to agent")
    end,
  },
}
