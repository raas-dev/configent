-- Autocmds are automatically loaded on the VeryLazy event
-- Default autocmds that are always set: https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/config/autocmds.lua
-- Add any additional autocmds here

vim.api.nvim_create_autocmd("TextYankPost", {
  desc = "OSC 52 copy on yank",
  callback = function()
    -- Only copy if it was a 'yank' operation (not a delete)
    if vim.v.event.operator == "y" then
      require('vim.ui.clipboard.osc52').copy('+')(vim.v.event.regcontents)
    end
  end,
})
